/* ===================================================================
   POLSKI B1 — APP ENGINE
   =================================================================== */

// URL Cloudflare Worker, который проксирует запросы к Claude API
// (ключ хранится в секретах Worker'а, не на фронтенде).
// ЗАМЕНИ на свой реальный адрес после деплоя Worker'а в Cloudflare.
const WORKER_API_URL = "https://polski-b1-worker.alena-trofimenko-ss.workers.dev/";

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
  if(scr.screen === "grammar-test-bank") return renderTestBank(main, scr.topicId);
  if(scr.screen === "grammar-test-bank-quiz") return renderTestBankQuiz(main, scr.topicId, scr.testNumber);
  if(scr.screen === "skill-placeholder") return renderSkillPlaceholder(main, scr.skillId);
  if(scr.screen === "skill-test-bank") return renderSkillTestBank(main, scr.skillId);
  if(scr.screen === "czytanie-quiz") return renderCzytanieQuiz(main, scr.testNumber);
  if(scr.screen === "sluchanie-quiz") return renderSluchanieQuiz(main, scr.testNumber);
  if(scr.screen === "pisanie-task") return renderPisanieTask(main, scr.taskId);
  if(scr.screen === "mowienie-task") return renderMowienieTask(main, scr.taskId);
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
    let pillText = "wkrótce";
    if(ready){
      if(s.id==="czytanie" || s.id==="sluchanie"){
        const prog = PROGRESS.skills && PROGRESS.skills[s.id] ? Object.keys(PROGRESS.skills[s.id]).length : 0;
        pillText = `${prog}/${SKILLS[s.id].testCount}`;
      } else {
        const doneCount = SKILLS[s.id].tasks.filter(t => PROGRESS.skills && PROGRESS.skills[s.id+"_"+t.id]).length;
        pillText = `${doneCount}/${SKILLS[s.id].tasks.length}`;
      }
    }
    const card = el(`
      <div class="menu-card ${ready?'':'disabled'}">
        <div class="icon-badge">${s.icon}</div>
        <div class="body">
          <p class="t">${s.t}</p>
          <p class="s">${s.s}</p>
        </div>
        <div class="progress-pill">${pillText}</div>
      </div>
    `);
    if(ready){
      card.onclick = () => {
        if(s.id==="czytanie" || s.id==="sluchanie") navTo({ screen:"skill-test-bank", skillId:s.id });
        else navTo({ screen:"skill-placeholder", skillId:s.id }); // pisanie/mowienie -> список тем
      };
    }
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
    const prog = PROGRESS.grammar[g.id];
    const bankDone = prog && prog.bankResults ? Object.keys(prog.bankResults).length : 0;
    const done = prog && prog.completed;
    const testWord = bankDone===1 ? "test wykonany" : (bankDone>=2 && bankDone<=4 ? "testy wykonane" : "testów wykonanych");
    const row = el(`
      <div class="topic-row">
        <div class="num">${i+1}</div>
        <div class="t">
          <div class="tt">${g.title}</div>
          <div class="ts">${g.subtitle}${bankDone>0 ? ` · ${bankDone} ${testWord}` : ""}</div>
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
  if(topic.testBankGenerator){
    const btn = el(`<button class="btn">Wybierz test (${topic.testBankCount}×10 zadań)</button>`);
    btn.onclick = () => navTo({ screen:"grammar-test-bank", topicId: topic.id });
    ctaRow.appendChild(btn);
  } else {
    const btn = el(`<button class="btn">Przejdź do testu (${topic.exercises.length} zadań)</button>`);
    btn.onclick = () => navTo({ screen:"grammar-quiz", topicId: topic.id });
    ctaRow.appendChild(btn);
  }
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
// GRAMMAR — TEST BANK (100 тестов × 10 вопросов, генерируются лениво)
// ===================================================================
function getTopicTestProgress(topicId){
  PROGRESS.grammar[topicId] = PROGRESS.grammar[topicId] || {};
  PROGRESS.grammar[topicId].bankResults = PROGRESS.grammar[topicId].bankResults || {}; // { "1": {correct,total} }
  return PROGRESS.grammar[topicId];
}

function renderTestBank(main, topicId){
  const topic = GRAMMAR.find(g=>g.id===topicId);
  setTopbar(topic.title, `Bank testów · ${topic.testBankCount} testów`, "Gr");

  const tp = getTopicTestProgress(topicId);
  const doneCount = Object.keys(tp.bankResults).length;

  main.appendChild(el(`
    <div class="lesson-intro" style="margin-bottom:16px;">
      Każdy test to <b>10 nowych zadań</b>. Możesz przejść tyle testów, ile chcesz —
      nie trzeba robić wszystkich, aby przejść do następnego tematu.
      <br><br>Wykonano: <b>${doneCount} z ${topic.testBankCount}</b>
    </div>
  `));

  const list = el(`<div class="topic-list"></div>`);
  for(let i=1;i<=topic.testBankCount;i++){
    const res = tp.bankResults[String(i)];
    const row = el(`
      <div class="topic-row">
        <div class="num">${i}</div>
        <div class="t">
          <div class="tt">Test ${i}</div>
          <div class="ts">${res ? `Wynik: ${res.correct}/${res.total}` : "10 zadań · nie rozpoczęto"}</div>
        </div>
        <div class="mark ${res?'done':''}">${res ? '✓' : ''}</div>
      </div>
    `);
    row.onclick = () => navTo({ screen:"grammar-test-bank-quiz", topicId, testNumber:i });
    list.appendChild(row);
  }
  main.appendChild(list);
}

function renderTestBankQuiz(main, topicId, testNumber){
  const topic = GRAMMAR.find(g=>g.id===topicId);
  const exercises = topic.testBankGenerator(testNumber - 1); // testIndex 0-based

  setTopbar(topic.title, `Test ${testNumber} z ${topic.testBankCount}`, "Gr");

  let state = {
    idx: 0,
    answers: new Array(exercises.length).fill(null),
    revealed: new Array(exercises.length).fill(false)
  };

  function draw(){
    main.innerHTML = "";
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
      const nextBtn = el(`<button class="btn">Dalej →</button>`);
      if(!state.revealed[state.idx]) nextBtn.style.opacity = "0.4";
      nextBtn.onclick = () => { if(state.revealed[state.idx]){ state.idx++; draw(); window.scrollTo(0,0);} };
      nav.appendChild(nextBtn);
    } else {
      const finishBtn = el(`<button class="btn">Zakończ test</button>`);
      if(!state.revealed[state.idx]) finishBtn.style.opacity = "0.4";
      finishBtn.onclick = () => {
        if(!state.revealed[state.idx]) return;
        const correct = state.answers.filter((a,i)=>a===exercises[i].answer).length;
        const tp = getTopicTestProgress(topicId);
        tp.bankResults[String(testNumber)] = { correct, total: exercises.length };
        tp.completed = true; // отметка, что темой начали заниматься
        saveProgress(PROGRESS);
        renderTestBankResult(main, topic, testNumber, correct, exercises.length);
      };
      nav.appendChild(finishBtn);
    }
    main.appendChild(nav);
  }
  draw();
}

function renderTestBankResult(main, topic, testNumber, correct, total){
  main.innerHTML = "";
  setTopbar(topic.title, `Wynik testu ${testNumber}`, "Gr");
  const pct = Math.round((correct/total)*100);
  main.appendChild(el(`
    <div style="text-align:center;padding-top:10px;">
      <div class="result-seal"><div class="inner"><div class="pct">${pct}%</div><div class="lbl">WYNIK</div></div></div>
      <h2 style="font-size:18px;margin:0 0 6px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;">${correct} z ${total} poprawnie</h2>
      <p style="color:var(--ink-soft);font-size:14px;margin:0 0 26px;">
        ${pct>=80? 'Świetnie! Możesz przejść dalej albo spróbować kolejnego testu.' : pct>=50? 'Dobry wynik — warto przejść jeszcze jeden test.' : 'Warto wrócić do materiału i spróbować ponownie.'}
      </p>
    </div>
  `));

  const row = el(`<div></div>`);

  const isLast = testNumber >= topic.testBankCount;
  if(!isLast){
    const nextTestBtn = el(`<button class="btn" style="margin-bottom:10px;">Następny test (${testNumber+1}/${topic.testBankCount}) →</button>`);
    nextTestBtn.onclick = () => navTo({ screen:"grammar-test-bank-quiz", topicId: topic.id, testNumber: testNumber+1 });
    row.appendChild(nextTestBtn);
  }

  const moreTestsBtn = el(`<button class="btn secondary" style="margin-bottom:10px;">Wybierz inny test z banku</button>`);
  moreTestsBtn.onclick = () => { NAV = [{screen:"home"},{screen:"grammar-list"},{screen:"grammar-test-bank", topicId: topic.id}]; render(); };
  row.appendChild(moreTestsBtn);

  const idx = GRAMMAR.findIndex(g=>g.id===topic.id);
  const nextTopic = GRAMMAR[idx+1];
  if(nextTopic){
    const nextTopicBtn = el(`<button class="btn ghost">Przejdź do następnego tematu: ${nextTopic.title} →</button>`);
    nextTopicBtn.onclick = () => { NAV = [{screen:"home"},{screen:"grammar-list"},{screen:"grammar-lesson", topicId: nextTopic.id}]; render(); };
    row.appendChild(nextTopicBtn);
  } else {
    const listBtn = el(`<button class="btn ghost">Wróć do listy tematów</button>`);
    listBtn.onclick = () => { NAV = [{screen:"home"},{screen:"grammar-list"}]; render(); };
    row.appendChild(listBtn);
  }

  main.appendChild(row);
}

// ===================================================================
// PLACEHOLDERS (skills / exams — будут заменены полным контентом)
// ===================================================================
// ===================================================================
// SKILLS: Pisanie / Mówienie — список тем (открытые задания)
// ===================================================================
function renderSkillPlaceholder(main, skillId){
  const s = SKILLS[skillId];
  setTopbar(s.title, s.subtitle, "B1");

  main.appendChild(el(`
    <div class="lesson-intro" style="margin-bottom:16px;">
      Wybierz temat. Twoja odpowiedź zostanie sprawdzona przez AI, która oceni gramatykę,
      słownictwo i zgodność z tematem — tak jak egzaminator.
      <br><br><b>Uwaga:</b> ta część wymaga połączenia z internetem (sprawdzanie odpowiedzi przez AI).
    </div>
  `));

  const list = el(`<div class="topic-list"></div>`);
  s.tasks.forEach((t,i)=>{
    const key = skillId+"_"+t.id;
    const done = PROGRESS.skills && PROGRESS.skills[key];
    const row = el(`
      <div class="topic-row">
        <div class="num">${i+1}</div>
        <div class="t">
          <div class="tt">${t.title}</div>
          <div class="ts">${t.type ? (t.type==="formalny"?"List formalny":"List nieformalny") : "Temat do mówienia"}</div>
        </div>
        <div class="mark ${done?'done':''}">${done? '✓' : ''}</div>
      </div>
    `);
    row.onclick = () => navTo({ screen: skillId==="pisanie" ? "pisanie-task" : "mowienie-task", taskId: t.id });
    list.appendChild(row);
  });
  main.appendChild(list);
}

// ===================================================================
// SKILLS: Czytanie / Słuchanie — банк тестов (текст + вопросы)
// ===================================================================
function getSkillProgress(skillId){
  PROGRESS.skills = PROGRESS.skills || {};
  PROGRESS.skills[skillId] = PROGRESS.skills[skillId] || {};
  return PROGRESS.skills[skillId];
}

function renderSkillTestBank(main, skillId){
  const s = SKILLS[skillId];
  setTopbar(s.title, `${s.testCount} tekstów`, "B1");

  const prog = getSkillProgress(skillId);
  const doneCount = Object.keys(prog).length;

  main.appendChild(el(`
    <div class="lesson-intro" style="margin-bottom:16px;">
      ${skillId==="sluchanie" ? "Odsłuchaj nagranie (możesz odtworzyć je kilka razy), a potem odpowiedz na pytania." : "Przeczytaj tekst, a potem odpowiedz na pytania dotyczące jego treści."}
      <br><br>Wykonano: <b>${doneCount} z ${s.testCount}</b>
    </div>
  `));

  const list = el(`<div class="topic-list"></div>`);
  for(let i=1;i<=s.testCount;i++){
    const res = prog[String(i)];
    // покажем заголовок текста, не генерируя весь тест (дёшево — только подсмотрим title)
    const preview = skillId==="czytanie" ? generateCzytanieTest(i-1) : generateSluchanieTest(i-1);
    const row = el(`
      <div class="topic-row">
        <div class="num">${i}</div>
        <div class="t">
          <div class="tt">${preview.title}</div>
          <div class="ts">${res ? `Wynik: ${res.correct}/${res.total}` : `${preview.exercises.length} pytań`}</div>
        </div>
        <div class="mark ${res?'done':''}">${res ? '✓' : ''}</div>
      </div>
    `);
    row.onclick = () => navTo({ screen: skillId==="czytanie" ? "czytanie-quiz" : "sluchanie-quiz", testNumber:i });
    list.appendChild(row);
  }
  main.appendChild(list);
}

function renderTextQuizCommon(main, skillId, testNumber, testData){
  setTopbar(SKILLS[skillId].title, testData.title, "B1");

  // text/audio card
  if(skillId==="sluchanie"){
    main.appendChild(el(`
      <div class="audio-player">
        <button class="play-btn" id="playBtn">▶</button>
        <div class="info"><b>${testData.title}</b>Naciśnij, aby odsłuchać nagranie (możesz powtórzyć)</div>
      </div>
    `));
  } else {
    main.appendChild(el(`
      <div class="reading-card">
        <div class="rtitle">${testData.title}</div>
        <div class="rtext">${testData.text}</div>
      </div>
    `));
  }

  let state = {
    idx: 0,
    answers: new Array(testData.exercises.length).fill(null),
    revealed: new Array(testData.exercises.length).fill(false)
  };

  const quizContainer = el(`<div></div>`);
  main.appendChild(quizContainer);

  function draw(){
    quizContainer.innerHTML = "";
    const exercises = testData.exercises;

    const prog = el(`<div class="quiz-progress"></div>`);
    exercises.forEach((_,i)=>{
      const dot = el(`<div class="dot"></div>`);
      if(i < state.idx) dot.classList.add("done");
      else if(i === state.idx) dot.classList.add("current");
      prog.appendChild(dot);
    });
    quizContainer.appendChild(prog);

    const q = exercises[state.idx];
    const qBox = el(`
      <div class="quiz-q">
        <div class="qnum">Pytanie ${state.idx+1} z ${exercises.length}</div>
        <div class="qtext">${q.q}</div>
      </div>
    `);
    const optList = el(`<div class="opt-list"></div>`);
    const letters = ["A","B","C","D"];
    q.options.forEach((opt,i)=>{
      const optEl = el(`<div class="opt"><div class="letter">${letters[i]}</div><div>${opt}</div></div>`);
      if(state.revealed[state.idx]){
        optEl.classList.add("disabled");
        if(i===q.answer) optEl.classList.add("correct");
        else if(i===state.answers[state.idx]) optEl.classList.add("incorrect");
      } else if(state.answers[state.idx]===i){
        optEl.classList.add("selected");
      }
      optEl.onclick = () => {
        if(state.revealed[state.idx]) return;
        state.answers[state.idx]=i; state.revealed[state.idx]=true; draw();
      };
      optList.appendChild(optEl);
    });
    qBox.appendChild(optList);
    if(state.revealed[state.idx]){
      qBox.appendChild(el(`<div class="explain-box"><b>Objaśnienie:</b> ${q.explain}</div>`));
    }
    quizContainer.appendChild(qBox);

    const nav = el(`<div class="quiz-nav"></div>`);
    if(state.idx < exercises.length-1){
      const nextBtn = el(`<button class="btn">Dalej →</button>`);
      if(!state.revealed[state.idx]) nextBtn.style.opacity="0.4";
      nextBtn.onclick = () => { if(state.revealed[state.idx]){ state.idx++; draw(); window.scrollTo(0,0); } };
      nav.appendChild(nextBtn);
    } else {
      const finishBtn = el(`<button class="btn">Zakończ</button>`);
      if(!state.revealed[state.idx]) finishBtn.style.opacity="0.4";
      finishBtn.onclick = () => {
        if(!state.revealed[state.idx]) return;
        const correct = state.answers.filter((a,i)=>a===exercises[i].answer).length;
        const prog2 = getSkillProgress(skillId);
        prog2[String(testNumber)] = { correct, total: exercises.length };
        saveProgress(PROGRESS);
        renderTextQuizResult(main, skillId, testNumber, correct, exercises.length);
      };
      nav.appendChild(finishBtn);
    }
    quizContainer.appendChild(nav);
  }
  draw();

  if(skillId==="sluchanie"){
    const playBtn = document.getElementById("playBtn");
    let speaking = false;
    playBtn.onclick = () => {
      if(speaking) return;
      if(!('speechSynthesis' in window)){
        alert("Twoja przeglądarka nie wspiera syntezatora mowy.");
        return;
      }
      const utter = new SpeechSynthesisUtterance(testData.text);
      utter.lang = "pl-PL";
      utter.rate = 0.95;
      speaking = true;
      playBtn.textContent = "⏸";
      utter.onend = () => { speaking = false; playBtn.textContent = "▶"; };
      utter.onerror = () => { speaking = false; playBtn.textContent = "▶"; };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    };
  }
}

function renderCzytanieQuiz(main, testNumber){
  const testData = generateCzytanieTest(testNumber-1);
  renderTextQuizCommon(main, "czytanie", testNumber, testData);
}
function renderSluchanieQuiz(main, testNumber){
  const testData = generateSluchanieTest(testNumber-1);
  renderTextQuizCommon(main, "sluchanie", testNumber, testData);
}

function renderTextQuizResult(main, skillId, testNumber, correct, total){
  main.innerHTML = "";
  const s = SKILLS[skillId];
  setTopbar(s.title, `Wynik`, "B1");
  const pct = Math.round((correct/total)*100);
  main.appendChild(el(`
    <div style="text-align:center;padding-top:10px;">
      <div class="result-seal"><div class="inner"><div class="pct">${pct}%</div><div class="lbl">WYNIK</div></div></div>
      <h2 style="font-size:18px;margin:0 0 6px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;">${correct} z ${total} poprawnie</h2>
    </div>
  `));
  const row = el(`<div></div>`);
  const isLast = testNumber >= s.testCount;
  if(!isLast){
    const nextBtn = el(`<button class="btn" style="margin-bottom:10px;">Następny tekst (${testNumber+1}/${s.testCount}) →</button>`);
    nextBtn.onclick = () => navTo({ screen: skillId==="czytanie"?"czytanie-quiz":"sluchanie-quiz", testNumber: testNumber+1 });
    row.appendChild(nextBtn);
  }
  const listBtn = el(`<button class="btn secondary">Wybierz inny tekst</button>`);
  listBtn.onclick = () => { NAV=[{screen:"home"},{screen:"skill-test-bank", skillId}]; render(); };
  row.appendChild(listBtn);
  main.appendChild(row);
}

// ===================================================================
// PISANIE — открытое задание + проверка через Claude API
// ===================================================================
function renderPisanieTask(main, taskId){
  const task = WRITING_TASKS.find(t=>t.id===taskId);
  setTopbar("Pisanie", task.title, "Pi");

  main.appendChild(el(`
    <div class="task-card">
      <div class="ttype">${task.type==="formalny"?"List formalny":"List nieformalny"}</div>
      <div class="ttitle">${task.title}</div>
      <div class="tprompt">${task.prompt}</div>
    </div>
  `));

  const textarea = el(`<textarea class="answer-box" placeholder="Napisz tutaj swoją odpowiedź..."></textarea>`);
  main.appendChild(textarea);
  const wc = el(`<div class="word-count">0 słów</div>`);
  main.appendChild(wc);
  textarea.addEventListener("input", ()=>{
    const words = textarea.value.trim().split(/\s+/).filter(Boolean).length;
    wc.textContent = `${words} słów`;
  });

  const resultContainer = el(`<div></div>`);
  main.appendChild(resultContainer);

  const ctaRow = el(`<div class="cta-row"></div>`);
  const submitBtn = el(`<button class="btn">Sprawdź odpowiedź (AI)</button>`);
  submitBtn.onclick = async () => {
    const text = textarea.value.trim();
    if(text.length < 20){ alert("Napisz dłuższą odpowiedź przed sprawdzeniem."); return; }
    resultContainer.innerHTML = "";
    resultContainer.appendChild(el(`<div class="loading-dots"><span></span><span></span><span></span></div>`));
    submitBtn.disabled = true; submitBtn.style.opacity = "0.5";
    try{
      const feedback = await evaluateWriting(task, text);
      resultContainer.innerHTML = "";
      resultContainer.appendChild(renderFeedbackCard(feedback));
      PROGRESS.skills = PROGRESS.skills || {};
      PROGRESS.skills["pisanie_"+task.id] = true;
      saveProgress(PROGRESS);
    }catch(e){
      resultContainer.innerHTML = "";
      resultContainer.appendChild(el(`<div class="exceptions-box"><div class="lbl">⚠ Błąd (diagnostyka)</div><div style="font-size:13.5px;">${(e && e.message) ? e.message : String(e)}</div></div>`));
    }
    submitBtn.disabled = false; submitBtn.style.opacity = "1";
  };
  ctaRow.appendChild(submitBtn);
  main.appendChild(ctaRow);
}

async function evaluateWriting(task, userText){
  const systemPrompt = `Jesteś egzaminatorem języka polskiego jako obcego na poziomie B1. Oceniasz pisemną pracę ucznia.
Kryteria oceny: ${WRITING_EVALUATION_CRITERIA.join("; ")}.
Temat zadania: "${task.title}". Treść zadania: "${task.prompt}".
Odpowiedz WYŁĄCZNIE w formacie JSON, bez markdown, bez code fences, w następującej strukturze:
{"score": <liczba 1-10>, "summary": "<krótkie podsumowanie ogólne, 1-2 zdania, w języku rosyjskim>", "strengths": "<co jest dobre w tekście, w języku rosyjskim>", "errors": "<konkretne błędy gramatyczne/leksykalne z cytatami z tekstu ucznia i poprawkami, w języku rosyjskim>", "suggestions": "<jak poprawić tekst, w języku rosyjskim>"}`;

  const response = await fetch(WORKER_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role:"user", content: `Tekst ucznia:\n\n${userText}` }]
    })
  });
  const rawText = await response.text();
  if(!response.ok){
    throw new Error(`HTTP ${response.status}: ${rawText.slice(0,300)}`);
  }
  let data;
  try{ data = JSON.parse(rawText); }
  catch(e){ throw new Error(`Niepoprawny JSON od serwera: ${rawText.slice(0,300)}`); }
  const textBlock = data.content && data.content.find(c=>c.type==="text");
  if(!textBlock){ throw new Error(`Brak tekstu w odpowiedzi: ${JSON.stringify(data).slice(0,300)}`); }
  let clean = textBlock.text.replace(/```json|```/g,"").trim();
  return JSON.parse(clean);
}

function renderFeedbackCard(fb){
  return el(`
    <div class="feedback-card">
      <div class="fb-header">
        <div class="fb-score">${fb.score}/10</div>
        <div class="fb-title">Ocena AI</div>
      </div>
      <div class="fb-section"><div class="fb-label">Podsumowanie</div><div class="fb-text">${fb.summary}</div></div>
      <div class="fb-section"><div class="fb-label">Co jest dobre</div><div class="fb-text">${fb.strengths}</div></div>
      <div class="fb-section"><div class="fb-label">Błędy</div><div class="fb-text">${fb.errors}</div></div>
      <div class="fb-section"><div class="fb-label">Jak poprawić</div><div class="fb-text">${fb.suggestions}</div></div>
    </div>
  `);
}

// ===================================================================
// MÓWIENIE — запись речи (SpeechRecognition) + проверка через Claude API
// ===================================================================
function renderMowienieTask(main, taskId){
  const task = SPEAKING_TASKS.find(t=>t.id===taskId);
  setTopbar("Mówienie", task.title, "Mó");

  main.appendChild(el(`
    <div class="task-card">
      <div class="ttype">Temat do mówienia</div>
      <div class="ttitle">${task.title}</div>
      <div class="tprompt">${task.prompt}</div>
    </div>
  `));

  const recordArea = el(`
    <div class="record-area">
      <button class="record-btn" id="recBtn">●</button>
      <div class="record-status" id="recStatus">Naciśnij, aby zacząć mówić po polsku</div>
      <div class="transcript-box" id="transcriptBox" style="display:none;"></div>
    </div>
  `);
  main.appendChild(recordArea);

  const resultContainer = el(`<div></div>`);
  main.appendChild(resultContainer);

  const ctaRow = el(`<div class="cta-row"></div>`);
  const submitBtn = el(`<button class="btn" style="display:none;">Sprawdź odpowiedź (AI)</button>`);
  ctaRow.appendChild(submitBtn);
  main.appendChild(ctaRow);

  let finalTranscript = "";
  const recBtn = document.getElementById("recBtn");
  const recStatus = document.getElementById("recStatus");
  const transcriptBox = document.getElementById("transcriptBox");

  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

  function showManualFallback(reasonText){
    recordArea.innerHTML = "";
    recordArea.appendChild(el(`<div class="record-status">${reasonText} Możesz wpisać swoją odpowiedź tekstowo — przeczytaj pytanie, odpowiedz na głos do siebie, a potem zapisz, co powiedziałeś/aś.</div>`));
    const manualBox = el(`<textarea class="answer-box" placeholder="Napisz tutaj to, co powiedziałeś/aś..." style="margin-top:10px;"></textarea>`);
    recordArea.appendChild(manualBox);
    manualBox.addEventListener("input", ()=>{
      finalTranscript = manualBox.value;
      submitBtn.style.display = finalTranscript.trim().length>5 ? "block" : "none";
    });
  }

  if(!SpeechRecognitionAPI){
    showManualFallback("Twoja przeglądarka nie wspiera rozpoznawania mowy.");
  } else {
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "pl-PL";
    recognition.continuous = true;
    recognition.interimResults = true;

    let listening = false;

    recognition.onresult = (event) => {
      let interim = "";
      for(let i=event.resultIndex;i<event.results.length;i++){
        const transcript = event.results[i][0].transcript;
        if(event.results[i].isFinal) finalTranscript += transcript + " ";
        else interim += transcript;
      }
      transcriptBox.style.display = "block";
      transcriptBox.innerHTML = finalTranscript + `<span style="color:var(--ink-soft);">${interim}</span>`;
    };
    recognition.onerror = (e) => {
      listening = false;
      recBtn.classList.remove("recording");
      recBtn.textContent = "●";
      if(e.error === "not-allowed" || e.error === "service-not-allowed" || e.error === "audio-capture"){
        showManualFallback("Nie udało się uzyskać dostępu do mikrofonu lub usługi rozpoznawania mowy.");
      } else {
        recStatus.textContent = "Błąd rozpoznawania mowy: " + e.error + ". Spróbuj ponownie.";
      }
    };
    recognition.onend = () => {
      listening = false;
      recBtn.classList.remove("recording");
      recBtn.textContent = "●";
      if(finalTranscript.trim().length > 5){
        recStatus.textContent = "Nagrywanie zakończone. Możesz sprawdzić odpowiedź albo nagrać ponownie.";
        submitBtn.style.display = "block";
      }
    };

    recBtn.onclick = () => {
      if(listening){
        recognition.stop();
        return;
      }
      finalTranscript = "";
      transcriptBox.innerHTML = "";
      transcriptBox.style.display = "none";
      submitBtn.style.display = "none";
      resultContainer.innerHTML = "";
      try{
        recognition.start();
        listening = true;
        recBtn.classList.add("recording");
        recBtn.textContent = "■";
        recStatus.textContent = "Słucham... Naciśnij ponownie, aby zakończyć.";
      }catch(e){
        recStatus.textContent = "Nie udało się uruchomić mikrofonu. Sprawdź uprawnienia.";
      }
    };
  }

  submitBtn.onclick = async () => {
    const text = finalTranscript.trim();
    if(text.length < 5){ alert("Nagranie jest za krótkie."); return; }
    resultContainer.innerHTML = "";
    resultContainer.appendChild(el(`<div class="loading-dots"><span></span><span></span><span></span></div>`));
    submitBtn.disabled = true; submitBtn.style.opacity = "0.5";
    try{
      const feedback = await evaluateSpeaking(task, text);
      resultContainer.innerHTML = "";
      resultContainer.appendChild(renderFeedbackCard(feedback));
      PROGRESS.skills = PROGRESS.skills || {};
      PROGRESS.skills["mowienie_"+task.id] = true;
      saveProgress(PROGRESS);
    }catch(e){
      resultContainer.innerHTML = "";
      resultContainer.appendChild(el(`<div class="exceptions-box"><div class="lbl">⚠ Błąd (diagnostyka)</div><div style="font-size:13.5px;">${(e && e.message) ? e.message : String(e)}</div></div>`));
    }
    submitBtn.disabled = false; submitBtn.style.opacity = "1";
  };
}

async function evaluateSpeaking(task, transcript){
  const systemPrompt = `Jesteś egzaminatorem języka polskiego jako obcego na poziomie B1. Oceniasz transkrypcję wypowiedzi ustnej ucznia (rozpoznaną automatycznie, więc literówki mogą być wynikiem błędu rozpoznawania mowy, nie ucznia — bądź na to wyczulony).
Kryteria oceny: ${SPEAKING_EVALUATION_CRITERIA.join("; ")}.
Temat: "${task.title}". Treść zadania: "${task.prompt}".
Odpowiedz WYŁĄCZNIE w formacie JSON, bez markdown, bez code fences:
{"score": <liczba 1-10>, "summary": "<krótkie podsumowanie, w języku rosyjskim>", "strengths": "<co jest dobre, w języku rosyjskim>", "errors": "<konkretne błędy gramatyczne/leksykalne z cytatami i poprawkami, w języku rosyjskim>", "suggestions": "<jak poprawić, w języku rosyjskim>"}`;

  const response = await fetch(WORKER_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role:"user", content: `Transkrypcja wypowiedzi ucznia:\n\n${transcript}` }]
    })
  });
  const rawText = await response.text();
  if(!response.ok){
    throw new Error(`HTTP ${response.status}: ${rawText.slice(0,300)}`);
  }
  let data;
  try{ data = JSON.parse(rawText); }
  catch(e){ throw new Error(`Niepoprawny JSON od serwera: ${rawText.slice(0,300)}`); }
  const textBlock = data.content && data.content.find(c=>c.type==="text");
  if(!textBlock){ throw new Error(`Brak tekstu w odpowiedzi: ${JSON.stringify(data).slice(0,300)}`); }
  let clean = textBlock.text.replace(/```json|```/g,"").trim();
  return JSON.parse(clean);
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
