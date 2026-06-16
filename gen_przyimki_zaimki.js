/* ===================================================================
   GENERATOR: PRZYIMKI I ZAIMKI — предлог + падеж существительного/местоимения
   Паттерны привязаны к семантическим тегам NOUN_BANK (см. gen_przypadki.js),
   чтобы избежать абсурдных сочетаний типа "rozmawiam z ulicą" или
   "mieszkam bez mostu". Для местоимений используются только паттерны,
   которые естественно звучат с личными местоимениями (о ком-то, с кем-то,
   для кого-то, к кому-то) — не "jestem w niej" в нейтральном смысле.
   =================================================================== */

const PREP_PATTERNS_NOUN = [
  { frame:"Idę do {X}.", caseIdx:1, tags:["place","building","person"], rule:"Предлог <i>do</i> требует Dopełniacza." },
  { frame:"To jest prezent dla {X}.", caseIdx:1, tags:["person"], rule:"Предлог <i>dla</i> требует Dopełniacza." },
  { frame:"Wracam bez {X}.", caseIdx:1, tags:["object","abstract","person"], rule:"Предлог <i>bez</i> требует Dopełniacza." },
  { frame:"Stoję koło {X}.", caseIdx:1, tags:["place","building","object","person"], rule:"Предлог <i>koło</i> требует Dopełniacza." },
  { frame:"Idę na {X}.", caseIdx:3, tags:["open_place"], rule:"Предлог <i>na</i> при движении требует Biernika." },
  { frame:"Czekam na {X}.", caseIdx:3, tags:["transport","person"], rule:"<i>Czekać na</i> требует Biernika." },
  { frame:"Rozmawiam z {X}.", caseIdx:4, tags:["person"], rule:"Предлог <i>z</i> (совместность) требует Narzędnika." },
  { frame:"Idę z {X}.", caseIdx:4, tags:["person"], rule:"Предлог <i>z</i> (совместность) требует Narzędnika." },
  { frame:"Mówię o {X}.", caseIdx:5, tags:["abstract","topic","person"], rule:"Предлог <i>o</i> (тема) требует Miejscownika." },
  { frame:"Jestem w {X}.", caseIdx:5, tags:["place","building"], rule:"Предлог <i>w</i> без движения требует Miejscownika." },
  { frame:"Siedzę przy {X}.", caseIdx:5, tags:["object","place","building","person"], rule:"Предлог <i>przy</i> требует Miejscownika." }
];

// Для местоимений — только те паттерны, где личное местоимение естественно
// звучит в данной синтаксической позиции (о ком-то / с кем-то / для кого-то / к кому-то)
const PREP_PATTERNS_PRONOUN = [
  { frame:"To jest prezent dla {X}.", caseIdx:1, rule:"Предлог <i>dla</i> требует Dopełniacza." },
  { frame:"Czekam na {X}.", caseIdx:3, rule:"<i>Czekać na</i> требует Biernika." },
  { frame:"Rozmawiam z {X}.", caseIdx:4, rule:"Предлог <i>z</i> (совместность) требует Narzędnika." },
  { frame:"Idę z {X}.", caseIdx:4, rule:"Предлог <i>z</i> (совместность) требует Narzędnika." },
  { frame:"Mówię o {X}.", caseIdx:5, rule:"Предлог <i>o</i> (тема) требует Miejscownika." },
  { frame:"Myślę o {X}.", caseIdx:5, rule:"Глагол <i>myśleć o</i> требует формы Miejscownika." },
  { frame:"Idę do {X}.", caseIdx:1, rule:"Предлог <i>do</i> требует Dopełniacza." },
  { frame:"Pomagam {X}.", caseIdx:2, rule:"Глагол <i>pomagać</i> требует формы Celownika." },
  { frame:"Dziękuję {X}.", caseIdx:2, rule:"Глагол <i>dziękować</i> требует формы Celownika." },
  { frame:"Widzę {X}.", caseIdx:3, rule:"Прямое дополнение переходного глагола — Biernik." }
];

// Личные местоимения по падежам [M,D,C,B,N,L]
const PRONOUN_BANK = [
  { word:"ja", forms:["ja","mnie","mi","mnie","mną","mnie"] },
  { word:"ty", forms:["ty","ciebie","ci","cię","tobą","tobie"] },
  { word:"on", forms:["on","jego","mu","go","nim","nim"] },
  { word:"ona", forms:["ona","jej","jej","ją","nią","niej"] },
  { word:"my", forms:["my","nas","nam","nas","nami","nas"] },
  { word:"wy", forms:["wy","was","wam","was","wami","was"] }
];

function seededRandomPZ(seed){
  let s=seed%2147483647; if(s<=0) s+=2147483646;
  return function(){ s=(s*16807)%2147483647; return (s-1)/2147483646; };
}
function shufflePZ(arr, rng){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function nounMatchesPattern(noun, pattern){
  return noun.tags.some(t => pattern.tags.includes(t));
}

function buildPrepNounQuestion(pattern, noun, rng){
  const correctForm = noun.forms[pattern.caseIdx];
  const otherForms = noun.forms.filter((f,i)=>i!==pattern.caseIdx && f!==correctForm);
  const wrongs = shufflePZ(Array.from(new Set(otherForms)), rng).slice(0,3);
  const options = shufflePZ([correctForm, ...wrongs], rng);
  return {
    type:"choice",
    q: pattern.frame.replace("{X}", `___ (${noun.forms[0]})`),
    options,
    answer: options.indexOf(correctForm),
    explain: `${pattern.rule} Правильная форма: <b>${correctForm}</b>.`
  };
}

function buildPronounQuestion(pattern, pronoun, rng){
  const correctForm = pronoun.forms[pattern.caseIdx];
  const otherForms = pronoun.forms.filter((f,i)=>i!==pattern.caseIdx && f!==correctForm);
  const otherPronoun = PRONOUN_BANK.find(p=>p!==pronoun) || PRONOUN_BANK[0];
  const extra = otherPronoun.forms[pattern.caseIdx];
  const wrongs = Array.from(new Set([...otherForms, extra])).slice(0,3);
  const options = shufflePZ([correctForm, ...wrongs], rng);
  return {
    type:"choice",
    q: pattern.frame.replace("{X}", `___ (${pronoun.word})`),
    options,
    answer: options.indexOf(correctForm),
    explain: `${pattern.rule} Местоимение «${pronoun.word}» в этом падеже: <b>${correctForm}</b>.`
  };
}

function generatePrzyimkiZaimkiTest(testIndex){
  const tasks = [];
  PREP_PATTERNS_NOUN.forEach(p=>{
    NOUN_BANK.forEach(n => { if(nounMatchesPattern(n,p)) tasks.push({kind:"noun", pattern:p, item:n}); });
  });
  PREP_PATTERNS_PRONOUN.forEach(p=>{
    PRONOUN_BANK.forEach(pr => tasks.push({kind:"pronoun", pattern:p, item:pr}));
  });

  const shuffled = shufflePZ(tasks, seededRandomPZ(15500+testIndex*73));
  const chosen = shuffled.slice(0,10);

  return chosen.map((t,i)=>{
    const localRng = seededRandomPZ(16000+testIndex*37+i);
    if(t.kind==="noun") return buildPrepNounQuestion(t.pattern, t.item, localRng);
    return buildPronounQuestion(t.pattern, t.item, localRng);
  });
}
