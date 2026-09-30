/* Exercise engine: renders items, checks answers, gives explanatory feedback. */
(function () {
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) el.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat()) if (kid != null) el.append(kid.nodeType ? kid : document.createTextNode(kid));
    return el;
  }

  /* Normalise for comparison: case, spacing, punctuation and contractions. */
  function norm(s) {
    return String(s).toLowerCase().replace(/[’‘]/g, "'").trim()
      .replace(/\bwon't\b/g, 'will not').replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not')
      .replace(/n't\b/g, ' not').replace(/'ll\b/g, ' will').replace(/'re\b/g, ' are')
      .replace(/'ve\b/g, ' have').replace(/'m\b/g, ' am')
      .replace(/[.,;:!?"]/g, '').replace(/\s+/g, ' ').trim();
  }
  const matches = (given, answers) => { const g = norm(given); return g !== '' && answers.some((a) => norm(a) === g); };

  function feedback(ok, expected, why) {
    const exp = ok ? '' : `<b>Answer:</b> ${expected.join(' / ')}. `;
    return h('div', { class: 'fb' + (ok ? ' good' : ''), html: (ok ? '<b>Correct.</b> ' : exp) + (why || '') });
  }

  /* Each renderer returns { el, check() -> [{ok}] }. */
  const R = {
    mcq(item, n) {
      const name = 'q' + Math.random().toString(36).slice(2);
      const opts = item.options.map((o, i) =>
        h('label', { class: 'opt' }, h('input', { type: 'radio', name, value: i }), h('span', { html: o })));
      const box = h('div', { class: 'opts' }, opts);
      const el = h('div', { class: 'item' }, h('p', { class: 'q' }, h('span', { class: 'num' }, n + '.'), h('span', { html: item.q })), box);
      return {
        el, check() {
          const sel = box.querySelector('input:checked');
          const ok = !!sel && +sel.value === item.answer;
          opts.forEach((o, i) => {
            o.classList.toggle('right', i === item.answer);
            o.classList.toggle('wrong', !!sel && +sel.value === i && i !== item.answer);
          });
          el.querySelector('.fb')?.remove();
          el.append(feedback(ok, [item.options[item.answer]], item.why));
          return [{ ok }];
        }
      };
    },
    gap(item, n) {
      const input = h('input', { type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
      const parts = item.q.split('___');
      const q = h('p', { class: 'q' }, h('span', { class: 'num' }, n + '.'), h('span', { html: parts[0] }), input, h('span', { html: parts[1] || '' }));
      const el = h('div', { class: 'item' }, q);
      return {
        el, check() {
          const ok = matches(input.value, item.answers);
          input.classList.toggle('right', ok); input.classList.toggle('wrong', !ok);
          el.querySelector('.fb')?.remove();
          el.append(feedback(ok, item.answers.slice(0, 2), item.why));
          return [{ ok }];
        }
      };
    },
    kwt(item, n) {
      const input = h('input', { type: 'text', class: 'wide', autocomplete: 'off', spellcheck: 'false' });
      const [a, b] = item.second.split('___');
      const el = h('div', { class: 'item' },
        h('p', { class: 'q' }, h('span', { class: 'num' }, n + '.'), h('span', { html: item.first })),
        h('p', {}, h('span', { class: 'keyword' }, item.key.toUpperCase())),
        h('p', {}, h('span', { html: a }), input, h('span', { html: b || '' })),
        h('p', { class: 'muted' }, 'Use between two and five words, including the key word. Do not change it.'));
      return {
        el, check() {
          const ok = matches(input.value, item.answers);
          input.classList.toggle('right', ok); input.classList.toggle('wrong', !ok);
          el.querySelector('.fb')?.remove();
          el.append(feedback(ok, item.answers.slice(0, 2), item.why));
          return [{ ok }];
        }
      };
    },
    text(item) {
      const el = h('div', { class: 'card readtext' }, item.title ? h('h3', { style: 'margin-top:0' }, item.title) : null,
        item.paras.map((p, i) => h('p', { html: (item.numbered === false ? '' : `<span class="pnum">${i + 1}</span>`) + p })));
      return { el, check: () => [] };
    },
    passage(item, n) {
      const mode = item.mode; // cloze | wf | mcq
      const ctrls = item.gaps.map((g) => {
        if (mode === 'mcq') {
          const sel = h('select', {}, h('option', { value: '' }, '–'), g.options.map((o, i) => h('option', { value: i }, o)));
          return { node: sel, get: () => sel.value };
        }
        const inp = h('input', { type: 'text', autocomplete: 'off', spellcheck: 'false', style: 'min-width:120px' });
        return { node: inp, get: () => inp.value };
      });
      const passage = h('div', { class: 'passage' });
      item.text.split(/(\{\d+\})/).forEach((seg) => {
        const m = seg.match(/^\{(\d+)\}$/);
        if (!m) { passage.append(h('span', { html: seg })); return; }
        const i = +m[1] - 1;
        passage.append(h('span', { class: 'gapnum' }, m[1]), ctrls[i].node);
        if (mode === 'wf') passage.append(h('span', { class: 'muted' }, ' (' + item.gaps[i].base.toUpperCase() + ') '));
      });
      const list = h('div');
      const el = h('div', { class: 'item' }, h('h3', {}, item.title), item.intro ? h('p', { class: 'muted', html: item.intro }) : null, passage, list);
      return {
        el, check() {
          list.innerHTML = '';
          return item.gaps.map((g, i) => {
            const v = ctrls[i].get();
            const ok = mode === 'mcq' ? v !== '' && +v === g.answer : matches(v, g.answers);
            ctrls[i].node.classList.toggle('right', ok); ctrls[i].node.classList.toggle('wrong', !ok);
            const shown = mode === 'mcq' ? [g.options[g.answer]] : g.answers.slice(0, 2);
            const fb = feedback(ok, shown, g.why);
            fb.prepend(h('b', {}, (i + 1) + '. '));
            list.append(fb);
            return { ok };
          });
        }
      };
    }
  };

  /* Renders a set of items with a "Check answers" button; reports the score once per attempt. */
  function quiz(items, opts) {
    opts = opts || {};
    const wrap = h('div');
    const rendered = [];
    let n = 0;
    items.forEach((it) => {
      let r;
      if (it.type === 'text') r = R.text(it);
      else { r = R[it.type](it, ++n); if (it.type === 'passage') n += it.gaps.length - 1; }
      rendered.push(r); wrap.append(r.el);
    });
    const result = h('div', { class: 'card', style: 'display:none' });
    const btn = h('button', { class: 'btn', onclick: check }, 'Check answers');
    const again = h('button', { class: 'btn ghost', onclick: () => opts.onRetry && opts.onRetry() }, 'Try again');
    let done = false;
    function check() {
      const res = rendered.flatMap((r) => r.check());
      const correct = res.filter((x) => x.ok).length;
      if (!done) { done = true; opts.onScore && opts.onScore(correct, res.length, res); }
      const pct = Math.round((100 * correct) / res.length);
      result.style.display = '';
      result.innerHTML = '';
      result.append(h('div', { class: 'score' }, `${correct} / ${res.length}  (${pct}%)`),
        h('p', { class: 'muted' }, pct >= 80 ? 'Strong. Read any explanation you missed, then move on.' :
          pct >= 50 ? 'Good progress. Read the explanations: they tell you why, not just what.' :
            'This topic needs another look. Re-read the lesson idea, then try again.'),
        h('div', { class: 'row' }, again));
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    wrap.append(h('div', { class: 'row', style: 'margin-top:14px' }, btn), result);
    return wrap;
  }

  window.Engine = { h, quiz, norm, matches };
})();
