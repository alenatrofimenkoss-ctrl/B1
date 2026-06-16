/* ===================================================================
   GENERATOR: CZASOWNIK — aspekt (sov/несов) + czasy + chodzić/iść
   =================================================================== */

// Глаголы niedokonany/dokonany пары — с контекстами, подобранными по смыслу для каждого глагола
const ASPECT_PAIRS = [
  { niedok:"pisać", dok:"napisać", forms_niedok:"pisał", forms_dok:"napisał",
    ctx_niedok:["Codziennie {X} list do rodziny.","Wczoraj cały wieczór {X} ten raport (proces, bez wyniku)."],
    ctx_dok:["Jutro {X} ten list i wyślę go.","Wreszcie {X} ten raport i mogę odpocząć."] },
  { niedok:"czytać", dok:"przeczytać", forms_niedok:"czytał", forms_dok:"przeczytał",
    ctx_niedok:["Codziennie {X} książkę przed snem.","Wczoraj cały dzień {X} tę powieść."],
    ctx_dok:["Wreszcie {X} tę książkę do końca.","Jutro {X} ten artykuł."] },
  { niedok:"robić", dok:"zrobić", forms_niedok:"robił", forms_dok:"zrobił",
    ctx_niedok:["Codziennie {X} zadania domowe.","Cały dzień {X} porządki w domu."],
    ctx_dok:["Już {X} wszystkie zadania.","Wreszcie {X} ten projekt i mógł odpocząć."] },
  { niedok:"gotować", dok:"ugotować", forms_niedok:"gotował", forms_dok:"ugotował",
    ctx_niedok:["Zwykle {X} obiad o 14.","Codziennie {X} śniadanie dla rodziny."],
    ctx_dok:["Już {X} obiad, możemy jeść.","Wczoraj {X} pierogi na kolację (i są gotowe)."] },
  { niedok:"oglądać", dok:"obejrzeć", forms_niedok:"oglądał", forms_dok:"obejrzał",
    ctx_niedok:["Codziennie {X} wiadomości wieczorem.","Cały wieczór {X} ten serial."],
    ctx_dok:["Wreszcie {X} ten film do końca.","Wczoraj {X} cały sezon serialu (i skończył)."] },
  { niedok:"kupować", dok:"kupić", forms_niedok:"kupował", forms_dok:"kupił",
    ctx_niedok:["Zwykle {X} warzywa na targu.","Co tydzień {X} świeży chleb."],
    ctx_dok:["Wczoraj {X} nowy telefon.","Już {X} bilety na koncert."] },
  { niedok:"mówić", dok:"powiedzieć", forms_niedok:"mówił", forms_dok:"powiedział",
    ctx_niedok:["Zawsze {X} prawdę.","Długo {X} o swoich planach."],
    ctx_dok:["Wreszcie {X} mu prawdę.","Już {X} jej o wszystkim."] },
  { niedok:"brać", dok:"wziąć", forms_niedok:"brał", forms_dok:"wziął",
    ctx_niedok:["Codziennie {X} prysznic rano.","Zwykle {X} parasol, gdy pada."],
    ctx_dok:["Wczoraj {X} parasol i wyszedł.","Już {X} wszystkie potrzebne dokumenty."] },
  { niedok:"sprzedawać", dok:"sprzedać", forms_niedok:"sprzedawał", forms_dok:"sprzedał",
    ctx_niedok:["Ten sklep zawsze {X} świeże owoce.","Codziennie {X} pieczywo do wieczora."],
    ctx_dok:["Wreszcie {X} stary samochód.","Już {X} wszystkie bilety na mecz."] },
  { niedok:"zamykać", dok:"zamknąć", forms_niedok:"zamykał", forms_dok:"zamknął",
    ctx_niedok:["Codziennie {X} sklep o 20.","Zawsze {X} okno na noc."],
    ctx_dok:["Już {X} wszystkie okna przed burzą.","Wczoraj {X} sklep wcześniej."] }
];

// chodzić/iść, jeździć/jechać
const MOTION_BANK = [
  { single:"idę", multi:"chodzę", inf_single:"iść", inf_multi:"chodzić", meaning:"идти/ходить" },
  { single:"jadę", multi:"jeżdżę", inf_single:"jechać", inf_multi:"jeździć", meaning:"ехать/ездить" }
];
const MOTION_CONTEXT_SINGLE = ["Teraz {X} do sklepu, czekaj na mnie.", "W tej chwili {X} do pracy."];
const MOTION_CONTEXT_MULTI = ["Codziennie {X} do pracy autobusem.", "Co tydzień {X} do rodziców."];

function seededRandomCZ(seed){
  let s=seed%2147483647; if(s<=0) s+=2147483646;
  return function(){ s=(s*16807)%2147483647; return (s-1)/2147483646; };
}
function shuffleCZ(arr, rng){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function buildAspectQuestion(pair, useDok, contextTemplate, rng){
  const correctForm = useDok ? pair.forms_dok : pair.forms_niedok;
  const wrongForm = useDok ? pair.forms_niedok : pair.forms_dok;
  const otherPairs = shuffleCZ(ASPECT_PAIRS.filter(p=>p!==pair), rng).slice(0,2);
  const extraWrongs = otherPairs.map(p => useDok ? p.forms_dok : p.forms_niedok);
  const options = shuffleCZ([correctForm, wrongForm, ...extraWrongs], rng);
  const qText = contextTemplate.replace("{X}", "___");
  return {
    type:"choice",
    q: qText,
    options,
    answer: options.indexOf(correctForm),
    explain: useDok
      ? `Действие однократное / с результатом → dokonany: <b>${correctForm}</b>.`
      : `Действие повторяющееся / процесс без указания результата → niedokonany: <b>${correctForm}</b>.`
  };
}

function buildMotionQuestion(item, useSingle, contextTemplate, rng){
  const correctForm = useSingle ? item.single : item.multi;
  const wrongForm = useSingle ? item.multi : item.single;
  const other = MOTION_BANK.find(m=>m!==item) || MOTION_BANK[0];
  const extraWrongs = [other.single, other.multi];
  const options = shuffleCZ([correctForm, wrongForm, ...shuffleCZ(extraWrongs, rng).slice(0,2)], rng);
  const qText = contextTemplate.replace("{X}", "___");
  return {
    type:"choice",
    q: qText,
    options,
    answer: options.indexOf(correctForm),
    explain: useSingle
      ? `Однократное движение в конкретном направлении прямо сейчас → <b>${correctForm}</b>.`
      : `Повторяющееся / привычное движение → <b>${correctForm}</b>.`
  };
}

function generateCzasownikTest(testIndex){
  const rng = seededRandomCZ(11000+testIndex*47);
  const tasks = [];

  ASPECT_PAIRS.forEach(p=>{
    p.ctx_niedok.forEach(c => tasks.push({kind:"aspect", pair:p, useDok:false, ctx:c}));
    p.ctx_dok.forEach(c => tasks.push({kind:"aspect", pair:p, useDok:true, ctx:c}));
  });
  MOTION_BANK.forEach(m=>{
    MOTION_CONTEXT_SINGLE.forEach(c => tasks.push({kind:"motion", item:m, useSingle:true, ctx:c}));
    MOTION_CONTEXT_MULTI.forEach(c => tasks.push({kind:"motion", item:m, useSingle:false, ctx:c}));
  });

  const shuffled = shuffleCZ(tasks, seededRandomCZ(11500+testIndex*67));
  const chosen = shuffled.slice(0,10);

  return chosen.map((t,i)=>{
    const localRng = seededRandomCZ(12000+testIndex*29+i);
    if(t.kind==="aspect") return buildAspectQuestion(t.pair, t.useDok, t.ctx, localRng);
    return buildMotionQuestion(t.item, t.useSingle, t.ctx, localRng);
  });
}
