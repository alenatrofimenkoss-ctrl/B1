/* ===================================================================
   GENERATOR: PRZYPADKI — банк слов + шаблоны → сотни уникальных вопросов
   Логика: каждый "паттерн" описывает грамматическую ситуацию (предлог/глагол
   + падеж), а "банк" даёт десятки существительных с их формами по падежам.
   Комбинаторика паттерн×слово даёт большой пул честных грамматических
   вопросов (не случайный шум — каждый проверяет конкретное правило).
   =================================================================== */

// ---- Банк существительных с формами по падежам ----
// [Mianownik, Dopełniacz, Celownik, Biernik, Narzędnik, Miejscownik]
const NOUN_BANK = [
  // мужской неживой
  { gender:"m.nz", forms:["dom","domu","domowi","dom","domem","domu"] },
  { gender:"m.nz", forms:["stół","stołu","stołowi","stół","stołem","stole"] },
  { gender:"m.nz", forms:["sklep","sklepu","sklepowi","sklep","sklepem","sklepie"] },
  { gender:"m.nz", forms:["park","parku","parkowi","park","parkiem","parku"] },
  { gender:"m.nz", forms:["teatr","teatru","teatrowi","teatr","teatrem","teatrze"] },
  { gender:"m.nz", forms:["szpital","szpitala","szpitalowi","szpital","szpitalem","szpitalu"] },
  { gender:"m.nz", forms:["pociąg","pociągu","pociągowi","pociąg","pociągiem","pociągu"] },
  { gender:"m.nz", forms:["autobus","autobusu","autobusowi","autobus","autobusem","autobusie"] },
  { gender:"m.nz", forms:["hotel","hotelu","hotelowi","hotel","hotelem","hotelu"] },
  { gender:"m.nz", forms:["most","mostu","mostowi","most","mostem","moście"] },
  // мужской живой / лица
  { gender:"m.os", forms:["lekarz","lekarza","lekarzowi","lekarza","lekarzem","lekarzu"] },
  { gender:"m.os", forms:["nauczyciel","nauczyciela","nauczycielowi","nauczyciela","nauczycielem","nauczycielu"] },
  { gender:"m.os", forms:["kolega","kolegi","koledze","kolegę","kolegą","koledze"] },
  { gender:"m.os", forms:["brat","brata","bratu","brata","bratem","bracie"] },
  { gender:"m.os", forms:["sąsiad","sąsiada","sąsiadowi","sąsiada","sąsiadem","sąsiedzie"] },
  { gender:"m.os", forms:["student","studenta","studentowi","studenta","studentem","studencie"] },
  { gender:"m.os", forms:["dyrektor","dyrektora","dyrektorowi","dyrektora","dyrektorem","dyrektorze"] },
  { gender:"m.zw", forms:["pies","psa","psu","psa","psem","psie"] },
  { gender:"m.zw", forms:["kot","kota","kotu","kota","kotem","kocie"] },
  // женский
  { gender:"f", forms:["kobieta","kobiety","kobiecie","kobietę","kobietą","kobiecie"] },
  { gender:"f", forms:["siostra","siostry","siostrze","siostrę","siostrą","siostrze"] },
  { gender:"f", forms:["szkoła","szkoły","szkole","szkołę","szkołą","szkole"] },
  { gender:"f", forms:["praca","pracy","pracy","pracę","pracą","pracy"] },
  { gender:"f", forms:["córka","córki","córce","córkę","córką","córce"] },
  { gender:"f", forms:["mama","mamy","mamie","mamę","mamą","mamie"] },
  { gender:"f", forms:["lekarka","lekarki","lekarce","lekarkę","lekarką","lekarce"] },
  { gender:"f", forms:["książka","książki","książce","książkę","książką","książce"] },
  { gender:"f", forms:["ulica","ulicy","ulicy","ulicę","ulicą","ulicy"] },
  { gender:"f", forms:["restauracja","restauracji","restauracji","restaurację","restauracją","restauracji"] },
  { gender:"f", forms:["apteka","apteki","aptece","aptekę","apteką","aptece"] },
  // средний
  { gender:"n", forms:["okno","okna","oknu","okno","oknem","oknie"] },
  { gender:"n", forms:["mieszkanie","mieszkania","mieszkaniu","mieszkanie","mieszkaniem","mieszkaniu"] },
  { gender:"n", forms:["miasto","miasta","miastu","miasto","miastem","mieście"] },
  { gender:"n", forms:["biuro","biura","biuru","biuro","biurem","biurze"] },
  { gender:"n", forms:["lotnisko","lotniska","lotnisku","lotnisko","lotniskiem","lotnisku"] }
];

const CASE_IDX = { M:0, D:1, C:2, B:3, N:4, L:5 };
const CASE_NAMES = { M:"Mianownik", D:"Dopełniacz", C:"Celownik", B:"Biernik", N:"Narzędnik", L:"Miejscownik" };

// ---- Паттерны: каждый описывает фразу-рамку с дыркой под существительное ----
// frame: "{X}" заменяется на нужную форму существительного
// targetCase: какой падеж правильный
// distractorCases: из каких падежей брать неправильные варианты (для вариантов ответа)
const PATTERNS = [
  { frame:"Idę do {X}.", targetCase:"D", rule:"После предлога <i>do</i> всегда употребляется Dopełniacz.", distractorCases:["M","C","N"] },
  { frame:"Nie mam {X}.", targetCase:"D", rule:"После отрицания <i>nie mam / nie ma</i> употребляется Dopełniacz.", distractorCases:["M","B","N"] },
  { frame:"To jest dom {X}.", targetCase:"D", rule:"Принадлежность («чей?») выражается формой Dopełniacza.", distractorCases:["M","C","B"] },
  { frame:"Czekam na {X}.", targetCase:"B", rule:"Глагол <i>czekać na</i> требует формы Biernika.", distractorCases:["M","D","N"] },
  { frame:"Widzę {X}.", targetCase:"B", rule:"Прямое дополнение переходного глагола — Biernik.", distractorCases:["M","D","C"] },
  { frame:"Pomagam {X}.", targetCase:"C", rule:"Глагол <i>pomagać</i> требует формы Celownika (а не Biernika!).", distractorCases:["M","B","N"] },
  { frame:"Dziękuję {X}.", targetCase:"C", rule:"Глагол <i>dziękować</i> требует формы Celownika.", distractorCases:["M","D","B"] },
  { frame:"Rozmawiam z {X}.", targetCase:"N", rule:"Предлог <i>z</i> в значении совместности требует Narzędnika.", distractorCases:["M","D","B"] },
  { frame:"Interesuję się {X}.", targetCase:"N", rule:"Глагол <i>interesować się</i> требует формы Narzędnika.", distractorCases:["M","D","C"] },
  { frame:"Jestem zadowolony z {X}.", targetCase:"D", rule:"Конструкция <i>zadowolony z</i> требует Dopełniacza.", distractorCases:["M","B","N"] },
  { frame:"Mówimy o {X}.", targetCase:"L", rule:"Предлог <i>o</i> в значении темы разговора требует Miejscownika.", distractorCases:["M","D","B"] },
  { frame:"Myślę o {X}.", targetCase:"L", rule:"Глагол <i>myśleć o</i> требует формы Miejscownika.", distractorCases:["M","B","N"] },
  { frame:"Mieszkam obok {X}.", targetCase:"D", rule:"Предлог <i>obok</i> требует Dopełniacza.", distractorCases:["M","C","L"] },
  { frame:"Stoję przy {X}.", targetCase:"L", rule:"Предлог <i>przy</i> требует Miejscownika.", distractorCases:["M","D","B"] },
  { frame:"To prezent dla {X}.", targetCase:"D", rule:"Предлог <i>dla</i> требует Dopełniacza.", distractorCases:["M","C","B"] }
];

// ---- Простой детерминированный псевдослучайный генератор (по seed) ----
function seededRandom(seed){
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function(){
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
function shuffleWithRng(arr, rng){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(rng()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

// Генерация одного вопроса по конкретному паттерну+слову, с заданным rng для порядка вариантов
function buildQuestion(pattern, noun, rng){
  const correctForm = noun.forms[CASE_IDX[pattern.targetCase]];
  const questionText = pattern.frame.replace("{X}", `___ (${noun.forms[0]})`);

  // варианты: правильный + 3 формы из distractorCases (с тем же существительным)
  let optionForms = [correctForm];
  pattern.distractorCases.forEach(c=>{
    const f = noun.forms[CASE_IDX[c]];
    if(!optionForms.includes(f)) optionForms.push(f);
  });
  // если меньше 4 вариантов (совпали формы), добираем из других падежей
  const allCases = ["M","D","C","B","N","L"];
  let i=0;
  while(optionForms.length<4 && i<allCases.length){
    const f = noun.forms[CASE_IDX[allCases[i]]];
    if(!optionForms.includes(f)) optionForms.push(f);
    i++;
  }
  optionForms = optionForms.slice(0,4);

  const shuffled = shuffleWithRng(optionForms, rng);
  const answerIdx = shuffled.indexOf(correctForm);

  return {
    type:"choice",
    q: questionText,
    options: shuffled,
    answer: answerIdx,
    explain: `${pattern.rule} Правильная форма: <b>${correctForm}</b> (${CASE_NAMES[pattern.targetCase]}).`
  };
}

// Генерация ОДНОГО теста (10 вопросов) по индексу testIndex (0..99) — детерминированно
function generatePrzypadkiTest(testIndex){
  const rng = seededRandom(1000 + testIndex*37);
  const combos = [];
  PATTERNS.forEach(p=>{
    NOUN_BANK.forEach(n=>{
      combos.push({p,n});
    });
  });
  const shuffledCombos = shuffleWithRng(combos, seededRandom(2000 + testIndex*53));
  const chosen = shuffledCombos.slice(0, 10);
  return chosen.map(c => buildQuestion(c.p, c.n, seededRandom(3000 + testIndex*13 + chosen.indexOf(c))));
}

// Генерация списка из 100 тестов (вызывается лениво, не сразу при загрузке)
function generatePrzypadkiTestBank(count){
  const tests = [];
  for(let i=0;i<count;i++){
    tests.push({ index:i+1, exercises: generatePrzypadkiTest(i) });
  }
  return tests;
}
