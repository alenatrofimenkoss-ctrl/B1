/* ===================================================================
   GENERATOR: PRZYPADKI — банк слов + шаблоны → сотни уникальных вопросов
   Логика: каждое существительное помечено семантическими тегами
   (place, person, animal, object, abstract, transport, building),
   и каждый паттерн явно указывает, какие теги ему подходят —
   так комбинаторика не выходит за пределы здравого смысла
   ("czekam na autobus" — да, "mieszkam bez mostu" — никогда).
   =================================================================== */

// ---- Банк существительных с формами по падежам + семантические теги ----
// [Mianownik, Dopełniacz, Celownik, Biernik, Narzędnik, Miejscownik]
const NOUN_BANK = [
  // мужской неживой — здания/места
  { gender:"m.nz", tags:["place","building"], forms:["dom","domu","domowi","dom","domem","domu"] },
  { gender:"m.nz", tags:["object"], forms:["stół","stołu","stołowi","stół","stołem","stole"] },
  { gender:"m.nz", tags:["place","building"], forms:["sklep","sklepu","sklepowi","sklep","sklepem","sklepie"] },
  { gender:"m.nz", tags:["place"], forms:["park","parku","parkowi","park","parkiem","parku"] },
  { gender:"m.nz", tags:["place","building"], forms:["teatr","teatru","teatrowi","teatr","teatrem","teatrze"] },
  { gender:"m.nz", tags:["place","building"], forms:["szpital","szpitala","szpitalowi","szpital","szpitalem","szpitalu"] },
  { gender:"m.nz", tags:["transport"], forms:["pociąg","pociągu","pociągowi","pociąg","pociągiem","pociągu"] },
  { gender:"m.nz", tags:["transport"], forms:["autobus","autobusu","autobusowi","autobus","autobusem","autobusie"] },
  { gender:"m.nz", tags:["place","building"], forms:["hotel","hotelu","hotelowi","hotel","hotelem","hotelu"] },
  { gender:"m.nz", tags:["place"], forms:["most","mostu","mostowi","most","mostem","moście"] },
  { gender:"m.nz", tags:["open_place"], forms:["stadion","stadionu","stadionowi","stadion","stadionem","stadionie"] },
  { gender:"m.nz", tags:["open_place"], forms:["plac","placu","placowi","plac","placem","placu"] },
  // мужской живой / лица
  { gender:"m.os", tags:["person"], forms:["lekarz","lekarza","lekarzowi","lekarza","lekarzem","lekarzu"] },
  { gender:"m.os", tags:["person"], forms:["nauczyciel","nauczyciela","nauczycielowi","nauczyciela","nauczycielem","nauczycielu"] },
  { gender:"m.os", tags:["person"], forms:["kolega","kolegi","koledze","kolegę","kolegą","koledze"] },
  { gender:"m.os", tags:["person"], forms:["brat","brata","bratu","brata","bratem","bracie"] },
  { gender:"m.os", tags:["person"], forms:["sąsiad","sąsiada","sąsiadowi","sąsiada","sąsiadem","sąsiedzie"] },
  { gender:"m.os", tags:["person"], forms:["student","studenta","studentowi","studenta","studentem","studencie"] },
  { gender:"m.os", tags:["person"], forms:["dyrektor","dyrektora","dyrektorowi","dyrektora","dyrektorem","dyrektorze"] },
  { gender:"m.zw", tags:["animal"], forms:["pies","psa","psu","psa","psem","psie"] },
  { gender:"m.zw", tags:["animal"], forms:["kot","kota","kotu","kota","kotem","kocie"] },
  // женский
  { gender:"f", tags:["person"], forms:["kobieta","kobiety","kobiecie","kobietę","kobietą","kobiecie"] },
  { gender:"f", tags:["person"], forms:["siostra","siostry","siostrze","siostrę","siostrą","siostrze"] },
  { gender:"f", tags:["place","building"], forms:["szkoła","szkoły","szkole","szkołę","szkołą","szkole"] },
  { gender:"f", tags:["abstract"], forms:["praca","pracy","pracy","pracę","pracą","pracy"] },
  { gender:"f", tags:["person"], forms:["córka","córki","córce","córkę","córką","córce"] },
  { gender:"f", tags:["person"], forms:["mama","mamy","mamie","mamę","mamą","mamie"] },
  { gender:"f", tags:["person"], forms:["lekarka","lekarki","lekarce","lekarkę","lekarką","lekarce"] },
  { gender:"f", tags:["object"], forms:["książka","książki","książce","książkę","książką","książce"] },
  { gender:"f", tags:["place","open_place"], forms:["ulica","ulicy","ulicy","ulicę","ulicą","ulicy"] },
  { gender:"f", tags:["place","building"], forms:["restauracja","restauracji","restauracji","restaurację","restauracją","restauracji"] },
  { gender:"f", tags:["place","building"], forms:["apteka","apteki","aptece","aptekę","apteką","aptece"] },
  { gender:"f", tags:["place","building","open_place"], forms:["poczta","poczty","poczcie","pocztę","pocztą","poczcie"] },
  // средний
  { gender:"n", tags:["object"], forms:["okno","okna","oknu","okno","oknem","oknie"] },
  { gender:"n", tags:["place","building"], forms:["mieszkanie","mieszkania","mieszkaniu","mieszkanie","mieszkaniem","mieszkaniu"] },
  { gender:"n", tags:["place"], forms:["miasto","miasta","miastu","miasto","miastem","mieście"] },
  { gender:"n", tags:["place","building"], forms:["biuro","biura","biuru","biuro","biurem","biurze"] },
  { gender:"n", tags:["place","building","open_place"], forms:["lotnisko","lotniska","lotnisku","lotnisko","lotniskiem","lotnisku"] },
  // дополнительные абстрактные/бытовые слова для семантически чувствительных паттернов
  { gender:"f", tags:["abstract"], forms:["pieniądze","pieniędzy","pieniądzom","pieniądze","pieniędzmi","pieniądzach"] },
  { gender:"m.nz", tags:["abstract"], forms:["czas","czasu","czasowi","czas","czasem","czasie"] },
  { gender:"f", tags:["abstract","topic"], forms:["muzyka","muzyki","muzyce","muzykę","muzyką","muzyce"] },
  { gender:"f", tags:["abstract","topic"], forms:["historia","historii","historii","historię","historią","historii"] },
  { gender:"m.nz", tags:["abstract","topic"], forms:["sport","sportu","sportowi","sport","sportem","sporcie"] },
  { gender:"f", tags:["abstract","topic"], forms:["polityka","polityki","polityce","politykę","polityką","polityce"] },
  { gender:"f", tags:["abstract","topic"], forms:["podróż","podróży","podróży","podróż","podróżą","podróży"] }
];

const CASE_IDX = { M:0, D:1, C:2, B:3, N:4, L:5 };
const CASE_NAMES = { M:"Mianownik", D:"Dopełniacz", C:"Celownik", B:"Biernik", N:"Narzędnik", L:"Miejscownik" };

// ---- Паттерны: каждый указывает, какие семантические теги существительных ему подходят ----
const PATTERNS = [
  { frame:"Idę do {X}.", targetCase:"D", tags:["place","building","person"], rule:"После предлога <i>do</i> всегда употребляется Dopełniacz.", distractorCases:["M","C","N"] },
  { frame:"Nie mam {X}.", targetCase:"D", tags:["abstract","object"], rule:"После отрицания <i>nie mam / nie ma</i> употребляется Dopełniacz.", distractorCases:["M","B","N"] },
  { frame:"To jest dom {X}.", targetCase:"D", tags:["person"], rule:"Принадлежность («чей?») выражается формой Dopełniacza.", distractorCases:["M","C","B"] },
  { frame:"Czekam na {X}.", targetCase:"B", tags:["transport","person"], rule:"Глагол <i>czekać na</i> требует формы Biernika.", distractorCases:["M","D","N"] },
  { frame:"Widzę {X}.", targetCase:"B", tags:["person","animal","object","place","building"], rule:"Прямое дополнение переходного глагола — Biernik.", distractorCases:["M","D","C"] },
  { frame:"Pomagam {X}.", targetCase:"C", tags:["person"], rule:"Глагол <i>pomagać</i> требует формы Celownika (а не Biernika!).", distractorCases:["M","B","N"] },
  { frame:"Dziękuję {X}.", targetCase:"C", tags:["person"], rule:"Глагол <i>dziękować</i> требует формы Celownika.", distractorCases:["M","D","B"] },
  { frame:"Rozmawiam z {X}.", targetCase:"N", tags:["person"], rule:"Предлог <i>z</i> в значении совместности требует Narzędnika.", distractorCases:["M","D","B"] },
  { frame:"Interesuję się {X}.", targetCase:"N", tags:["abstract","topic"], rule:"Глагол <i>interesować się</i> требует формы Narzędnika.", distractorCases:["M","D","C"] },
  { frame:"Jestem zadowolony z {X}.", targetCase:"D", tags:["abstract","person"], rule:"Конструкция <i>zadowolony z</i> требует Dopełniacza.", distractorCases:["M","B","N"] },
  { frame:"Mówimy o {X}.", targetCase:"L", tags:["abstract","topic","person"], rule:"Предлог <i>o</i> в значении темы разговора требует Miejscownika.", distractorCases:["M","D","B"] },
  { frame:"Myślę o {X}.", targetCase:"L", tags:["abstract","topic","person"], rule:"Глагол <i>myśleć o</i> требует формы Miejscownika.", distractorCases:["M","B","N"] },
  { frame:"Mieszkam obok {X}.", targetCase:"D", tags:["place","building"], rule:"Предлог <i>obok</i> требует Dopełniacza.", distractorCases:["M","C","L"] },
  { frame:"Stoję przy {X}.", targetCase:"L", tags:["object","place","building","person"], rule:"Предлог <i>przy</i> требует Miejscownika.", distractorCases:["M","D","B"] },
  { frame:"To prezent dla {X}.", targetCase:"D", tags:["person"], rule:"Предлог <i>dla</i> требует Dopełniacza.", distractorCases:["M","C","B"] }
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

function nounMatchesPattern(noun, pattern){
  return noun.tags.some(t => pattern.tags.includes(t));
}

// Генерация одного вопроса по конкретному паттерну+слову, с заданным rng для порядка вариантов
function buildQuestion(pattern, noun, rng){
  const correctForm = noun.forms[CASE_IDX[pattern.targetCase]];
  const questionText = pattern.frame.replace("{X}", `___ (${noun.forms[0]})`);

  let optionForms = [correctForm];
  pattern.distractorCases.forEach(c=>{
    const f = noun.forms[CASE_IDX[c]];
    if(!optionForms.includes(f)) optionForms.push(f);
  });
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
  const combos = [];
  PATTERNS.forEach(p=>{
    NOUN_BANK.forEach(n=>{
      if(nounMatchesPattern(n, p)) combos.push({p,n});
    });
  });
  const shuffledCombos = shuffleWithRng(combos, seededRandom(2000 + testIndex*53));
  const chosen = shuffledCombos.slice(0, 10);
  return chosen.map((c,idx) => buildQuestion(c.p, c.n, seededRandom(3000 + testIndex*13 + idx)));
}

// Генерация списка из 100 тестов (вызывается лениво, не сразу при загрузке)
function generatePrzypadkiTestBank(count){
  const tests = [];
  for(let i=0;i<count;i++){
    tests.push({ index:i+1, exercises: generatePrzypadkiTest(i) });
  }
  return tests;
}
