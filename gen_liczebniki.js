/* ===================================================================
   GENERATOR: LICZEBNIKI — числительные 1/2-4/5+ + падеж существительного
   =================================================================== */

// существительное: [sg Mianownik, форма после 2-4 (=Mianownik мн.ч. для не-osobowych), Dopełniacz мн.ч. (после 5+)]
const NUM_NOUN_BANK = [
  { sg:"stół", form234:"stoły", form5plus:"stołów", gender:"m.nz" },
  { sg:"dom", form234:"domy", form5plus:"domów", gender:"m.nz" },
  { sg:"okno", form234:"okna", form5plus:"okien", gender:"n" },
  { sg:"krzesło", form234:"krzesła", form5plus:"krzeseł", gender:"n" },
  { sg:"kobieta", form234:"kobiety", form5plus:"kobiet", gender:"f" },
  { sg:"książka", form234:"książki", form5plus:"książek", gender:"f" },
  { sg:"godzina", form234:"godziny", form5plus:"godzin", gender:"f" },
  { sg:"minuta", form234:"minuty", form5plus:"minut", gender:"f" },
  { sg:"samochód", form234:"samochody", form5plus:"samochodów", gender:"m.nz" },
  { sg:"miasto", form234:"miasta", form5plus:"miast", gender:"n" },
  { sg:"brat", form234:"bracia", form5plus:"braci", gender:"m.os" },
  { sg:"student", form234:"studenci", form5plus:"studentów", gender:"m.os" }
];

const NUMBERS_234 = [2,3,4];
const NUMBERS_5PLUS = [5,6,7,8,9,10,12,15,20];
const NUMBERS_22_24 = [22,23,24]; // ведут себя как 2-4
const NUMBERS_21 = [21,31,41]; // ведут себя как "1"

function seededRandomLB(seed){
  let s=seed%2147483647; if(s<=0) s+=2147483646;
  return function(){ s=(s*16807)%2147483647; return (s-1)/2147483646; };
}
function shuffleLB(arr, rng){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function buildNumberQuestion(noun, number, rng){
  let correctForm, rule;
  if(number===1 || NUMBERS_21.includes(number)){
    correctForm = noun.sg;
    rule = `После числительного, заканчивающегося на «1» (кроме 11), существительное стоит в Mianowniku ед.ч.: <b>${correctForm}</b>.`;
  } else if(NUMBERS_234.includes(number) || NUMBERS_22_24.includes(number)){
    correctForm = noun.form234;
    rule = `После 2,3,4 (а также 22,23,24) существительное имеет особую форму (как Mianownik мн.ч.): <b>${correctForm}</b>.`;
  } else {
    correctForm = noun.form5plus;
    rule = `После 5 и больше существительное стоит в Dopełniaczu мн.ч.: <b>${correctForm}</b>.`;
  }

  const wrongOptions = Array.from(new Set([noun.sg, noun.form234, noun.form5plus])).filter(f=>f!==correctForm);
  const options = shuffleLB([correctForm, ...wrongOptions], rng).slice(0,Math.min(4, wrongOptions.length+1));
  while(options.length<3) options.push(correctForm+"y");

  return {
    type:"choice",
    q: `${number} ___ (${noun.sg}).`,
    options,
    answer: options.indexOf(correctForm),
    explain: rule
  };
}

function generateLiczebnikiTest(testIndex){
  const rng = seededRandomLB(13000+testIndex*49);
  const allNumbers = [1, ...NUMBERS_234, ...NUMBERS_5PLUS, ...NUMBERS_21, ...NUMBERS_22_24];
  const combos = [];
  NUM_NOUN_BANK.forEach(n => allNumbers.forEach(num => combos.push({n,num})));

  const shuffled = shuffleLB(combos, seededRandomLB(13500+testIndex*71));
  const chosen = shuffled.slice(0,10);

  return chosen.map((c,i)=>{
    const localRng = seededRandomLB(14000+testIndex*31+i);
    return buildNumberQuestion(c.n, c.num, localRng);
  });
}
