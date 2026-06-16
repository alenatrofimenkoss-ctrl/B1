/* ===================================================================
   GENERATOR: RODZAJ I LICZBA — род существительных + мн.ч.
   Два типа заданий: (1) определить род по слову, (2) выбрать верную
   форму множественного числа.
   =================================================================== */

const GENDER_BANK = [
  { word:"stół", gender:"m", plural:"stoły" },
  { word:"dom", gender:"m", plural:"domy" },
  { word:"telefon", gender:"m", plural:"telefony" },
  { word:"samochód", gender:"m", plural:"samochody" },
  { word:"komputer", gender:"m", plural:"komputery" },
  { word:"kobieta", gender:"f", plural:"kobiety" },
  { word:"szkoła", gender:"f", plural:"szkoły" },
  { word:"książka", gender:"f", plural:"książki" },
  { word:"praca", gender:"f", plural:"prace" },
  { word:"ulica", gender:"f", plural:"ulice" },
  { word:"siostra", gender:"f", plural:"siostry" },
  { word:"okno", gender:"n", plural:"okna" },
  { word:"mieszkanie", gender:"n", plural:"mieszkania" },
  { word:"miasto", gender:"n", plural:"miasta" },
  { word:"krzesło", gender:"n", plural:"krzesła" },
  { word:"zdanie", gender:"n", plural:"zdania" },
  { word:"imię", gender:"n", plural:"imiona" },
  { word:"pani", gender:"f", plural:"panie" },
  { word:"noc", gender:"f", plural:"noce" }
];

const PLURAL_MOS_BANK = [
  { sg:"student", pl:"studenci" },
  { sg:"Polak", pl:"Polacy" },
  { sg:"chłopak", pl:"chłopcy" },
  { sg:"nauczyciel", pl:"nauczyciele" },
  { sg:"lekarz", pl:"lekarze" },
  { sg:"Niemiec", pl:"Niemcy" },
  { sg:"Anglik", pl:"Anglicy" },
  { sg:"kolega", pl:"koledzy" },
  { sg:"profesor", pl:"profesorowie" },
  { sg:"aktor", pl:"aktorzy" },
  { sg:"przyjaciel", pl:"przyjaciele" },
  { sg:"brat", pl:"bracia" }
];

const GENDER_DISTRACTORS = {
  m: ["żeński (-a)","żeński (-i)","neutralny (-o/-e)"],
  f: ["męski","neutralny (-o/-e)","męskoosobowy"],
  n: ["męski","żeński (-a)","żeński (bez końcówki)"]
};
const GENDER_LABEL = { m:"męski", f:"żeński", n:"neutralny" };

function seededRandomRL(seed){
  let s = seed % 2147483647; if (s<=0) s+=2147483646;
  return function(){ s=(s*16807)%2147483647; return (s-1)/2147483646; };
}
function shuffleRL(arr, rng){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function buildGenderQuestion(item, rng){
  const correct = GENDER_LABEL[item.gender];
  const options = shuffleRL([correct, ...GENDER_DISTRACTORS[item.gender]], rng);
  return {
    type:"choice",
    q: `Jaki rodzaj ma słowo «${item.word}»?`,
    options,
    answer: options.indexOf(correct),
    explain: `Słowo «${item.word}» ma rodzaj <b>${correct}</b>.`
  };
}

function buildPluralQuestion(item, allWrongPlurals, rng){
  const wrongs = shuffleRL(allWrongPlurals.filter(p=>p!==item.plural), rng).slice(0,3);
  const options = shuffleRL([item.plural, ...wrongs], rng);
  return {
    type:"choice",
    q: `Wybierz poprawną liczbę mnogą słowa «${item.sg || item.word}».`,
    options,
    answer: options.indexOf(item.plural),
    explain: `Liczba mnoga: <b>${item.plural}</b>.`
  };
}

function generateRodzajLiczbaTest(testIndex){
  const rng = seededRandomRL(5000 + testIndex*41);
  const allItems = [];
  GENDER_BANK.forEach(g => allItems.push({kind:"gender", data:g}));
  PLURAL_MOS_BANK.forEach(g => allItems.push({kind:"plural-mos", data:g}));
  GENDER_BANK.forEach(g => allItems.push({kind:"plural-other", data:g}));

  const shuffled = shuffleRL(allItems, seededRandomRL(6000+testIndex*59));
  const chosen = shuffled.slice(0,10);

  const allPluralsMos = PLURAL_MOS_BANK.map(x=>x.pl);
  const allPluralsOther = GENDER_BANK.map(x=>x.plural);

  return chosen.map((c,i)=>{
    const localRng = seededRandomRL(7000+testIndex*17+i);
    if(c.kind==="gender") return buildGenderQuestion(c.data, localRng);
    if(c.kind==="plural-mos") return buildPluralQuestion({sg:c.data.sg, plural:c.data.pl}, allPluralsMos, localRng);
    return buildPluralQuestion(c.data, allPluralsOther, localRng);
  });
}
