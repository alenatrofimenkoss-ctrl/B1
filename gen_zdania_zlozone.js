/* ===================================================================
   GENERATOR: ZDANIA ZŁOŻONE — союзы по функции (причина/условие/etc)
   =================================================================== */

const CONJUNCTION_TASKS = [
  { frame:"Nie zdałem egzaminu, ___ się nie uczyłem.", correct:"ponieważ", wrongs:["więc","żeby","mimo że"], rule:"Причина → <b>ponieważ</b>." },
  { frame:"Było zimno, ___ wzięłam kurtkę.", correct:"więc", wrongs:["ponieważ","żeby","chociaż"], rule:"Следствие → <b>więc</b>." },
  { frame:"___ będzie ładna pogoda, pójdziemy na plażę.", correct:"Jeśli", wrongs:["Mimo że","Ponieważ","Żeby"], rule:"Реальное условие → <b>Jeśli</b> + индикатив." },
  { frame:"___ miał więcej czasu, nauczyłby się lepiej.", correct:"Gdyby", wrongs:["Jeśli","Ponieważ","Dlatego że"], rule:"Гипотетическое условие → <b>Gdyby</b> + условное наклонение." },
  { frame:"Chciałem przyjść, ___ nie miałem czasu.", correct:"ale", wrongs:["więc","żeby","jeśli"], rule:"Противопоставление → <b>ale</b>." },
  { frame:"Uczę się polskiego, ___ zdać egzamin.", correct:"żeby", wrongs:["bo","więc","jeśli"], rule:"Цель → <b>żeby</b>." },
  { frame:"___ wyjdziesz, zamknij okno.", correct:"Zanim", wrongs:["Odkąd","Dopóki","Mimo że"], rule:"Время (до того как) → <b>Zanim</b>." },
  { frame:"___ było zimno, poszliśmy na spacer.", correct:"Mimo że", wrongs:["Gdyby","Żeby","Dlatego"], rule:"Противопоставление реальному факту → <b>Mimo że</b> + индикатив (не условное наклонение!)." },
  { frame:"Chcę, ___ przyszedł na czas.", correct:"żebyś", wrongs:["że","więc","jeśli"], rule:"Разные подлежащие + желание → <b>żebyś</b> + условное наклонение." },
  { frame:"Zostanę w domu, ___ pada deszcz.", correct:"ponieważ", wrongs:["żeby","mimo że","gdyby"], rule:"Причина → <b>ponieważ</b>." },
  { frame:"___ nie zadzwonisz, będę się martwić.", correct:"Jeśli", wrongs:["Mimo że","Żeby","Ponieważ"], rule:"Реальное условие → <b>Jeśli</b>." },
  { frame:"Pracuję dużo, ___ zarobić na wakacje.", correct:"żeby", wrongs:["bo","więc","chociaż"], rule:"Цель → <b>żeby</b>." },
  { frame:"On się uczy, ___ ja odpoczywam.", correct:"natomiast", wrongs:["więc","żeby","ponieważ"], rule:"Противопоставление → <b>natomiast</b>." },
  { frame:"___ nie miałam pieniędzy, kupiłabym ten dom.", correct:"Gdybym", wrongs:["Jeśli","Ponieważ","Żebym"], rule:"Гипотетическое условие, 1-е лицо → <b>Gdybym</b>." },
  { frame:"Czekam tutaj, ___ on wróci.", correct:"dopóki", wrongs:["zanim","odkąd","mimo że"], rule:"Время (до тех пор как) → <b>dopóki</b>." }
];

function seededRandomZD(seed){
  let s=seed%2147483647; if(s<=0) s+=2147483646;
  return function(){ s=(s*16807)%2147483647; return (s-1)/2147483646; };
}
function shuffleZD(arr, rng){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function buildConjunctionQuestion(task, rng){
  const options = shuffleZD([task.correct, ...task.wrongs], rng);
  return {
    type:"choice",
    q: task.frame,
    options,
    answer: options.indexOf(task.correct),
    explain: task.rule
  };
}

// Так как банк меньше 100 уникальных заданий, варьируем порядок вариантов ответа
// и порядок заданий внутри теста, чтобы тесты не выглядели одинаково при повторении.
function generateZdaniaZlozoneTest(testIndex){
  const rng = seededRandomZD(17000+testIndex*43);
  const shuffledTasks = shuffleZD(CONJUNCTION_TASKS, seededRandomZD(17500+testIndex*61));
  // Если заданий меньше 10 — дополняем повтором с другим порядком вариантов
  let pool = shuffledTasks.slice();
  while(pool.length < 10){ pool = pool.concat(shuffleZD(CONJUNCTION_TASKS, seededRandomZD(18000+testIndex*11+pool.length))); }
  const chosen = pool.slice(0,10);

  return chosen.map((t,i)=>{
    const localRng = seededRandomZD(18500+testIndex*19+i);
    return buildConjunctionQuestion(t, localRng);
  });
}
