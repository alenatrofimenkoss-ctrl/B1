/* ===================================================================
   POLSKI B1 — APP ENGINE
   =================================================================== */

const STORAGE_KEY = "polski_b1_progress_v1";

function loadProgress(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { grammar:{}, exams:{} };
  }catch(e){ return { grammar:{}, exams:{} }; }
}
function saveProgress(p){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }catch(e){}
}
let PROGRESS = loadProgress();

// ---- Navigation stack ----
let NAV = [{ screen:"home" }];

function navTo(screenObj){
  NAV.push(screenObj);
  render();
  window.scrollTo(0,0);
}
function navBack(){
  if(NAV.length>1){ NAV.pop(); render(); window.scrollTo(0,0); }
}
function navHome(){
  NAV = [{ screen:"home" }];
  render(); window.scrollTo(0,0);
}

function current(){ return NAV[NAV.length-1]; }

// ---- Helpers ----
function el(html){
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstChild;
}
function escapeAttr(s){ return String(s).replace(/"/g,'&quot;'); }

function setTopbar(title, subtitle, sealText){
  document.getElementById("topTitle").innerHTML = `${title}${subtitle ? `<small>${subtitle}</small>` : ""}`;
  document.getElementById("topSeal").textContent = sealText || "B1";
  document.getElementById("backBtn").classList.toggle("hidden", NAV.length<=1);
}

function grammarDoneCount(){
  return GRAMMAR.filter(g => PROGRESS.grammar[g.id] && PROGRESS.grammar[g.id].completed).length;
}

// ===================================================================
// RENDER ROUTER
// ===================================================================
function render(){
  const scr = current();
  const main = document.getElementById("main");
  main.innerHTML = "";

  if(scr.screen === "home") return renderHome(main);
  if(scr.screen === "grammar-list") return renderGrammarList(main);
  if(scr.screen === "grammar-lesson") return renderGrammarLesson(main, scr.topicId);
  if(scr.screen === "grammar-quiz") return renderQuiz(main, { mode:"grammar", topicId: scr.topicId });
  if(scr.screen === "skill-placeholder") return renderSkillPlaceholder(main, scr.skillId);
  if(scr.screen === "exam-list") return renderExamList(main);
  if(scr.screen === "exam-placeholder") return renderExamPlaceholder(main);
}

// ===================================================================
// HOME
// ===================================================================
function renderHome(main){
  setTopbar("Polski B1", "Przygotowanie do egzaminu", "B1");

  const doneG = grammarDoneCount();
  const totalG = GRAMMAR.length;

  main.appendChild(el(`
    <div class="hero">
      <div class="ring-big"><div class="inner"><b>B1</b><span>POLSKI</span></div></div>
      <h1>Przygotowanie do egzaminu</h1>
      <p>Gramatyka, cztery sprawności i symulacje egzaminu —<br>wszystko w jednym miejscu, offline.</p>
    </div>
  `));

  main.appendChild(el(`<div class="section-label">Materiały</div>`));

  const grid = el(`<div class="menu-grid"></div>`);

  const grammarCard = el(`
    <div class="menu-card" id="card-grammar">
      <div class="icon-badge">Gr</div>
      <div class="body">
        <p class="t">Gramatyka</p>
        <p class="s">Przypadki, czasy, liczebniki i więcej</p>
      </div>
      <div class="progress-pill">${doneG}/${totalG}</div>
    </div>
  `);
  grammarCard.onclick = () => navTo({ screen:"grammar-list" });
  grid.appendChild(grammarCard);

  const skillsMeta = [
    { id:"czytanie", icon:"Cz", t:"Czytanie", s:"Понимание текста при чтении" },
    { id:"sluchanie", icon:"Sł", t:"Słuchanie", s:"Понимание на слух" },
    { id:"pisanie", icon:"Pi", t:"Pisanie", s:"Формальное и неформальное письмо" },
    { id:"mowienie", icon:"Mó", t:"Mówienie", s:"Устная часть экзамена" }
  ];
  skillsMeta.forEach(s=>{
    const ready = SKILLS[s.id] && SKILLS[s.id].ready;
    const card = el(`
      <div class="menu-card ${ready?'':'disabled'}">
        <div class="icon-badge">${s.icon}</div>
        <div class="body">
          <p class="t">${s.t}</p>
          <p class="s">${s.s}</p>
        </div>
        <div class="progress-pill">${ready? '' : 'wkrótce'}</div>
      </div>
    `);
    if(ready) card.onclick = () => navTo({ screen:"skill-placeholder", skillId:s.id });
    grid.appendChild(card);
  });

  main.appendChild(grid);

  main.appendChild(el(`<div class="section-label">Egzamin</div>`));
  const examGrid = el(`<div class="menu-grid"></div>`);
  const examReady = EXAM_VERSIONS.length;
  const examCard = el(`
    <div class="menu-card ${examReady? '' : 'disabled'}">
      <div class="icon-badge">15×</div>
      <div class="body">
        <p class="t">Wersje egzaminacyjne</p>
        <p class="s">Pełne symulacje egzaminu B1</p>
      </div>
      <div class="progress-pill">${examReady ? examReady+'/15' : 'wkrótce'}</div>
    </div>
  `);
  if(examReady) examCard.onclick = () => navTo({ screen:"exam-list" });
  examGrid.appendChild(examCard);
  main.appendChild(examGrid);

  main.appendChild(el(`
    <div class="install-hint" id="installHint">
      <b>Подсказка:</b> чтобы пользоваться приложением как обычным — открой меню «Поделиться» в Safari и выбери «На экран Домой». Дальше всё работает офлайн.
    </div>
  `));
  // показываем подсказку только если не в standalone режиме
  if(!window.matchMedia('(display-mode: standalone)').matches){
    document.getElementById("installHint").classList.add("show");
  }
}

// ===================================================================
// GRAMMAR — LIST
// ===================================================================
function renderGrammarList(main){
  setTopbar("Gramatyka", "Wybierz temat", "Gr");

  const list = el(`<div class="topic-list"></div>`);
  GRAMMAR.forEach((g, i)=>{
    const done = PROGRESS.grammar[g.id] && PROGRESS.grammar[g.id].completed;
    const row = el(`
      <div class="topic-row">
        <div class="num">${i+1}</div>
        <div class="t">
          <div class="tt">${g.title}</div>
          <div class="ts">${g.subtitle}</div>
        </div>
        <div class="mark ${done?'done':''}">${done? '✓' : ''}</div>
      </div>
    `);
    row.onclick = () => navTo({ screen:"grammar-lesson", topicId:g.id });
    list.appendChild(row);
  });
  main.appendChild(list);
}

// ===================================================================
// GRAMMAR — LESSON (объяснения)
// ===================================================================
function renderBlock(block){
  if(block.type === "text"){
    return el(`<div class="lesson-intro">${block.html}</div>`);
  }
  if(block.type === "cases"){
    const wrap = el(`<div></div>`);
    block.items.forEach(c=>{
      wrap.appendChild(el(`
        <div class="case-card">
          <div class="head"><span class="name">${c.name}</span><span class="q">${c.q}</span></div>
          <div class="use">${c.use}</div>
          <div class="ex">${c.ex}</div>
        </div>
      `));
    });
    return wrap;
  }
  if(block.type === "table"){
    let thead = `<tr>${block.head.map(h=>`<th>${h}</th>`).join("")}</tr>`;
    let rows = block.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("");
    return el(`
      <table class="data-table">
        ${block.caption? `<caption>${block.caption}</caption>` : ""}
        <thead>${thead}</thead>
        <tbody>${rows}</tbody>
      </table>
    `);
  }
  if(block.type === "exceptions"){
    return el(`
      <div class="exceptions-box">
        <div class="lbl">⚠ Исключения и тонкости</div>
        <ul>${block.items.map(i=>`<li>${i}</li>`).join("")}</ul>
      </div>
    `);
  }
  return el(`<div></div>`);
}

function renderGrammarLesson(main, topicId){
  const topic = GRAMMAR.find(g=>g.id===topicId);
  if(!topic){ main.appendChild(el(`<div class="empty-state"><p>Temat nie znaleziony.</p></div>`)); return; }

  setTopbar(topic.title, topic.subtitle, "Gr");

  topic.blocks.forEach(b => main.appendChild(renderBlock(b)));

  const ctaRow = el(`<div class="cta-row"></div>`);
  const btn = el(`<button class="btn">Przejdź do testu (${topic.exercises.length} zadań)</button>`);
  btn.onclick = () => navTo({ screen:"grammar-quiz", topicId: topic.id });
  ctaRow.appendChild(btn);
  main.appendChild(ctaRow);
}

// ===================================================================
// QUIZ ENGINE (используется и для грамматики, и позже для экзаменов)
// ===================================================================
function renderQuiz(main, opts){
  const topic = GRAMMAR.find(g=>g.id===opts.topicId);
  if(!topic){ main.appendChild(el(`<div class="empty-state"><p>Brak danych.</p></div>`)); return; }
  const exercises = topic.exercises;

  let state = {
    idx: 0,
    answers: new Array(exercises.length).fill(null), // selected index per question
    revealed: new Array(exercises.length).fill(false)
  };

  setTopbar(topic.title, "Test", "Gr");

  function draw(){
    main.innerHTML = "";

    // progress dots
    const prog = el(`<div class="quiz-progress"></div>`);
    exercises.forEach((_,i)=>{
      const dot = el(`<div class="dot"></div>`);
      if(i < state.idx) dot.classList.add("done");
      else if(i === state.idx) dot.classList.add("current");
      prog.appendChild(dot);
    });
    main.appendChild(prog);

    const q = exercises[state.idx];
    const qBox = el(`
      <div class="quiz-q">
        <div class="qnum">Zadanie ${state.idx+1} z ${exercises.length}</div>
        <div class="qtext">${q.q}</div>
      </div>
    `);
    const optList = el(`<div class="opt-list"></div>`);
    const letters = ["A","B","C","D"];

    q.options.forEach((opt, i)=>{
      const optEl = el(`<div class="opt"><div class="letter">${letters[i]}</div><div>${opt}</div></div>`);
      if(state.revealed[state.idx]){
        optEl.classList.add("disabled");
        if(i === q.answer) optEl.classList.add("correct");
        else if(i === state.answers[state.idx]) optEl.classList.add("incorrect");
      } else if(state.answers[state.idx] === i){
        optEl.classList.add("selected");
      }
      optEl.onclick = () => {
        if(state.revealed[state.idx]) return;
        state.answers[state.idx] = i;
        state.revealed[state.idx] = true;
        draw();
      };
      optList.appendChild(optEl);
    });
    qBox.appendChild(optList);

    if(state.revealed[state.idx]){
      qBox.appendChild(el(`<div class="explain-box"><b>Objaśnienie:</b> ${q.explain}</div>`));
    }

    main.appendChild(qBox);

    const nav = el(`<div class="quiz-nav"></div>`);
    if(state.idx < exercises.length-1){
      const nextBtn = el(`<button class="btn ${state.revealed[state.idx]?'':'ghost'}">Dalej →</button>`);
      nextBtn.disabled = !state.revealed[state.idx];
      if(!state.revealed[state.idx]) nextBtn.style.opacity = "0.4";
      nextBtn.onclick = () => { if(state.revealed[state.idx]){ state.idx++; draw(); window.scrollTo(0,0);} };
      nav.appendChild(nextBtn);
    } else {
      const finishBtn = el(`<button class="btn">Zakończ test</button>`);
      finishBtn.disabled = !state.revealed[state.idx];
      if(!state.revealed[state.idx]) finishBtn.style.opacity = "0.4";
      finishBtn.onclick = () => {
        if(!state.revealed[state.idx]) return;
        const correct = state.answers.filter((a,i)=>a===exercises[i].answer).length;
        PROGRESS.grammar[topic.id] = PROGRESS.grammar[topic.id] || {};
        PROGRESS.grammar[topic.id].completed = true;
        PROGRESS.grammar[topic.id].lastScore = correct;
        PROGRESS.grammar[topic.id].total = exercises.length;
        saveProgress(PROGRESS);
        renderQuizResult(main, topic, correct, exercises.length);
      };
      nav.appendChild(finishBtn);
    }
    main.appendChild(nav);
  }

  draw();
}

function renderQuizResult(main, topic, correct, total){
  main.innerHTML = "";
  setTopbar(topic.title, "Wynik", "Gr");
  const pct = Math.round((correct/total)*100);
  main.appendChild(el(`
    <div style="text-align:center;padding-top:10px;">
      <div class="result-seal"><div class="inner"><div class="pct">${pct}%</div><div class="lbl">WYNIK</div></div></div>
      <h2 style="font-size:18px;margin:0 0 6px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;">${correct} z ${total} poprawnie</h2>
      <p style="color:var(--ink-soft);font-size:14px;margin:0 0 26px;">
        ${pct>=80? 'Świetnie! Ten temat masz opanowany.' : pct>=50? 'Dobry wynik, ale warto powtórzyć wyjątki.' : 'Wróć do materiału i przeczytaj wyjątki jeszcze raz.'}
      </p>
    </div>
  `));
  const row = el(`<div></div>`);
  const retryBtn = el(`<button class="btn secondary" style="margin-bottom:10px;">Powtórz test</button>`);
  retryBtn.onclick = () => navTo({ screen:"grammar-quiz", topicId: topic.id });
  const listBtn = el(`<button class="btn">Wróć do listy tematów</button>`);
  listBtn.onclick = () => { NAV = [{screen:"home"},{screen:"grammar-list"}]; render(); };
  row.appendChild(retryBtn);
  row.appendChild(listBtn);
  main.appendChild(row);
}

// ===================================================================
// PLACEHOLDERS (skills / exams — будут заменены полным контентом)
// ===================================================================
function renderSkillPlaceholder(main, skillId){
  const s = SKILLS[skillId];
  setTopbar(s.title, s.subtitle, "B1");
  main.appendChild(el(`
    <div class="empty-state">
      <div class="ic">…</div>
      <p>Ten dział jest w przygotowaniu i zostanie dodany w kolejnym kroku.</p>
    </div>
  `));
}
function renderExamList(main){
  setTopbar("Wersje egzaminacyjne", "15 symulacji", "15×");
  main.appendChild(el(`<div class="empty-state"><div class="ic">…</div><p>Warianty egzaminu będą dodane wkrótce.</p></div>`));
}
function renderExamPlaceholder(main){
  setTopbar("Egzamin", "", "15×");
  main.appendChild(el(`<div class="empty-state"><p>Wkrótce.</p></div>`));
}

// ===================================================================
// INIT
// ===================================================================
render();

// ---- Service worker registration (offline) ----
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
