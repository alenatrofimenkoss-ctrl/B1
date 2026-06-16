/* ===================================================================
   GENERATOR: PRZYMIOTNIK — согласование рода + степени сравнения
   =================================================================== */

const ADJ_AGREEMENT_BANK = [
  { noun:"student", gender:"m", forms:{m:"dobry",f:"dobra",n:"dobre"} },
  { noun:"kobieta", gender:"f", forms:{m:"młody",f:"młoda",n:"młode"} },
  { noun:"dziecko", gender:"n", forms:{m:"mały",f:"mała",n:"małe"} },
  { noun:"dom", gender:"m", forms:{m:"nowy",f:"nowa",n:"nowe"} },
  { noun:"szkoła", gender:"f", forms:{m:"wysoki",f:"wysoka",n:"wysokie"} },
  { noun:"okno", gender:"n", forms:{m:"duży",f:"duża",n:"duże"} },
  { noun:"miasto", gender:"n", forms:{m:"ciekawy",f:"ciekawa",n:"ciekawe"} },
  { noun:"książka", gender:"f", forms:{m:"interesujący",f:"interesująca",n:"interesujące"} },
  { noun:"chłopiec", gender:"m", forms:{m:"silny",f:"silna",n:"silne"} },
  { noun:"praca", gender:"f", forms:{m:"trudny",f:"trudna",n:"trudne"} }
];

const COMPARISON_BANK = [
  { base:"dobry", comp:"lepszy", sup:"najlepszy", regular:false },
  { base:"zły", comp:"gorszy", sup:"najgorszy", regular:false },
  { base:"duży", comp:"większy", sup:"największy", regular:false },
  { base:"mały", comp:"mniejszy", sup:"najmniejszy", regular:false },
  { base:"szybki", comp:"szybszy", sup:"najszybszy", regular:true },
  { base:"ciekawy", comp:"ciekawszy", sup:"najciekawszy", regular:true },
  { base:"ładny", comp:"ładniejszy", sup:"najładniejszy", regular:true },
  { base:"silny", comp:"silniejszy", sup:"najsilniejszy", regular:true },
  { base:"młody", comp:"młodszy", sup:"najmłodszy", regular:true },
  { base:"stary", comp:"starszy", sup:"najstarszy", regular:true },
  { base:"tani", comp:"tańszy", sup:"najtańszy", regular:true },
  { base:"drogi", comp:"droższy", sup:"najdroższy", regular:true }
];

function seededRandomPR(seed){
  let s = seed % 2147483647; if (s<=0) s+=2147483646;
  return function(){ s=(s*16807)%2147483647; return (s-1)/2147483646; };
}
function shufflePR(arr, rng){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function buildAgreementQuestion(item, rng){
  const correct = item.forms[item.gender];
  const options = shufflePR([item.forms.m, item.forms.f, item.forms.n, correct], rng).filter((v,i,a)=>a.indexOf(v)===i);
  while(options.length<3) options.push(correct+"_");
  const finalOptions = shufflePR(Array.from(new Set([correct, item.forms.m, item.forms.f, item.forms.n])), rng).slice(0,4);
  return {
    type:"choice",
    q: `To jest ___ (${item.forms.m}) ${item.noun}.`,
    options: finalOptions,
    answer: finalOptions.indexOf(correct),
    explain: `Przymiotnik zgadza się z rodzajem rzeczownika «${item.noun}» (rodzaj ${item.gender==='m'?'męski':item.gender==='f'?'żeński':'neutralny'}) → <b>${correct}</b>.`
  };
}

function buildComparisonQuestion(item, degree, rng){
  const correct = degree==="comp" ? item.comp : item.sup;
  const others = COMPARISON_BANK.filter(x=>x!==item);
  const distractorPool = shufflePR(others, rng).slice(0,3).map(x=> degree==="comp"?x.comp:x.sup);
  const options = shufflePR([correct, ...distractorPool], rng);
  const qLabel = degree==="comp" ? "Stopień wyższy" : "Stopień najwyższy";
  return {
    type:"choice",
    q: `${qLabel} od słowa «${item.base}»:`,
    options,
    answer: options.indexOf(correct),
    explain: item.regular
      ? `Regularna forma: ${item.base} → <b>${correct}</b>.`
      : `Nieregularna forma (do zapamiętania): ${item.base} → <b>${correct}</b>.`
  };
}

function generatePrzymiotnikTest(testIndex){
  const rng = seededRandomPR(9000+testIndex*43);
  const tasks = [];
  ADJ_AGREEMENT_BANK.forEach(a => tasks.push({kind:"agreement", data:a}));
  COMPARISON_BANK.forEach(c => { tasks.push({kind:"comp", data:c}); tasks.push({kind:"sup", data:c}); });

  const shuffled = shufflePR(tasks, seededRandomPR(9500+testIndex*61));
  const chosen = shuffled.slice(0,10);

  return chosen.map((t,i)=>{
    const localRng = seededRandomPR(9900+testIndex*23+i);
    if(t.kind==="agreement") return buildAgreementQuestion(t.data, localRng);
    return buildComparisonQuestion(t.data, t.kind, localRng);
  });
}
