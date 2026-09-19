const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// Exercise the actual project selector and case-study renderer without a browser.
class Element {
  constructor(tag = 'div') {
    this.tagName = tag; this.children = []; this.attrs = {}; this.dataset = {};
    this.handlers = {}; this.nodes = {}; this.textContent = '';
    this.classList = { toggle() {} };
  }
  setAttribute(k, v) { this.attrs[k] = v; }
  getAttribute(k) { return this.attrs[k] || null; }
  appendChild(el) {
    if (el.parent) el.remove();
    el.parent = this; this.children.push(el); return el;
  }
  append(...els) { els.forEach(el => this.appendChild(el)); }
  after(el) { this.parent.appendChild(el); }
  remove() { this.parent.children = this.parent.children.filter(el => el !== this); }
  querySelector(selector) { return this.nodes[selector]; }
  querySelectorAll(selector) {
    if (this.nodes[selector]) return this.nodes[selector];
    return this.children.flatMap(el => [
      ...(selector === '.' + el.className ? [el] : []), ...el.querySelectorAll(selector)
    ]);
  }
  addEventListener(event, fn) { this.handlers[event] = fn; }
  click() { this.handlers.click(); }
}

const html = fs.readFileSync('index.html', 'utf8');
const source = fs.readFileSync('js/script.js', 'utf8');
const slides = [...html.matchAll(/<article class="slide">([\s\S]*?)<\/article>/g)].map(match => {
  const slide = new Element();
  const panel = new Element();
  const button = new Element('button');
  const attrs = match[1].match(/<button[\s\S]*?<\/button>/)[0];
  for (const attr of attrs.matchAll(/([\w-]+)="([^"]*)"/g)) button.setAttribute(attr[1], attr[2]);
  for (const selector of ['h4', '.slide-cat', '.slide-desc']) panel.nodes[selector] = new Element();
  slide.nodes['.slide-panel'] = panel;
  slide.nodes['.lightbox-trigger'] = button;
  return slide;
});
const root = new Element();
root.nodes['.slide'] = slides;
const ids = {workCarousel:root, carDots:new Element(), carPrev:new Element(), carNext:new Element()};
const lightbox = new Element();
const scroll = new Element();
lightbox.appendChild(scroll);
const info = new Element();
scroll.appendChild(info);
const title = new Element('h3');
const desc = new Element('p');
info.append(title, desc);
const site = new Element('a');
lightbox.nodes['.web-lightbox-action'] = [site];
const context = vm.createContext({
  document:{getElementById:id => ids[id], createElement:tag => new Element(tag)},
  lightbox, lightboxScroll:scroll, lightboxTitle:title, lightboxDesc:desc
});
vm.runInContext(source.slice(source.indexOf('  // Project summaries'), source.indexOf('  // Project cards')), context);
assert.equal(slides.length, 5);
assert.equal(ids.carDots.children.length, 5);
assert.equal(slides.filter(s => !s.hidden).length, 1);
ids.carNext.click();
assert.equal(slides[1].hidden, false);
ids.carPrev.click();
ids.carPrev.click();
assert.equal(slides[4].hidden, false);
ids.carDots.children[2].click();
assert.equal(slides[2].hidden, false);
slides.forEach((slide, i) => {
  const button = slide.nodes['.lightbox-trigger'];
  assert.equal(button.textContent, '프로젝트 자세히 보기');
  assert.equal(button.dataset.storyIndex, String(i));
  const actions = slide.nodes['.slide-panel'].children.at(-1);
  if(i < 4) {
    assert.equal(actions.children[1].href, button.getAttribute('data-popup-project'));
    assert.equal(actions.children[1].target, '_blank');
  } else assert.equal(actions.children[1].textContent, '사이트 제작 중');
});
vm.runInContext(source.slice(source.indexOf('  function renderProjectStudy'), source.indexOf('  // Each project card')), context);
slides.forEach(slide => {
  context.renderProjectStudy(slide.nodes['.lightbox-trigger'], true);
  assert.equal(scroll.querySelectorAll('.case-study-body').length, 1);
  assert.equal(scroll.querySelectorAll('.case-study-body')[0].children.length, 5);
  assert.equal(lightbox.querySelectorAll('.case-study-role').length, 1);
});
context.renderProjectStudy(slides[0].nodes['.lightbox-trigger'], false);
assert.equal(scroll.querySelectorAll('.case-study-body').length, 0);
assert.equal(lightbox.querySelectorAll('.case-study-role').length, 0);
console.log('PASS: five projects, selection/wrapping, detail/site actions, case-study replacement and cleanup');
