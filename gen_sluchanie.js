/* ===================================================================
   GENERATOR: SŁUCHANIE — короткие тексты, воспроизводимые через TTS
   (Web Speech API) вместо чтения глазами — объявления, новости, диалоги.
   =================================================================== */

const LISTENING_TEXTS = [
  {
    title: "Ogłoszenie na lotnisku",
    text: `Uwaga, pasażerowie lotu do Warszawy. Z powodu silnego wiatru odlot samolotu
    został przesunięty o dwie godziny. Nowa godzina odlotu to siedemnasta trzydzieści.
    Prosimy o pozostanie w pobliżu wyjścia numer dwanaście. Za niedogodności przepraszamy.`,
    questions: [
      { q:"Dokąd leci samolot?", opts:["Do Krakowa","Do Warszawy","Do Gdańska","Do Wrocławia"], answer:1 },
      { q:"Dlaczego odlot jest przesunięty?", opts:["Z powodu awarii","Z powodu silnego wiatru","Z powodu strajku","Z powodu remontu"], answer:1 },
      { q:"O ile godzin przesunięto odlot?", opts:["O godzinę","O dwie godziny","O trzy godziny","O cztery godziny"], answer:1 }
    ]
  },
  {
    title: "Wiadomość na automatycznej sekretarce",
    text: `Dzień dobry, dzwonię z przychodni Zdrowie. Przypominamy o wizycie kontrolnej
    zaplanowanej na czwartek o dziesiątej rano. Prosimy o przybycie piętnaście minut wcześniej
    w celu wypełnienia dokumentów. W razie potrzeby zmiany terminu prosimy o kontakt telefoniczny.`,
    questions: [
      { q:"Skąd jest ta wiadomość?", opts:["Z banku","Z przychodni","Ze szkoły","Z urzędu"], answer:1 },
      { q:"Na kiedy zaplanowana jest wizyta?", opts:["Na środę","Na czwartek o dziesiątej","Na piątek wieczorem","Na poniedziałek"], answer:1 },
      { q:"O co proszą przed wizytą?", opts:["O przyniesienie dokumentów z domu","O przybycie piętnaście minut wcześniej","O zapłatę online","O telefon dzień wcześniej"], answer:1 }
    ]
  },
  {
    title: "Prognoza pogody",
    text: `A teraz prognoza pogody na najbliższe dni. W poniedziałek będzie słonecznie,
    temperatura do dwudziestu dwóch stopni. We wtorek możliwe są przelotne opady deszczu,
    a temperatura spadnie do siedemnastu stopni. Od środy ponownie zrobi się cieplej
    i słonecznie, idealnie na weekendowy wypoczynek na świeżym powietrzu.`,
    questions: [
      { q:"Jaka będzie pogoda w poniedziałek?", opts:["Deszczowa","Słoneczna","Śnieżna","Wietrzna"], answer:1 },
      { q:"Jaka jest prognozowana temperatura we wtorek?", opts:["22 stopnie","25 stopni","17 stopni","10 stopni"], answer:2 },
      { q:"Co się stanie od środy?", opts:["Będzie zimniej","Będzie cieplej i słonecznie","Będzie padać śnieg","Nic się nie zmieni"], answer:1 }
    ]
  },
  {
    title: "Ogłoszenie w sklepie",
    text: `Szanowni klienci, informujemy, że nasz sklep będzie zamknięty w najbliższą
    niedzielę z powodu inwentaryzacji. Zapraszamy ponownie od poniedziałku, kiedy czekają
    na Państwa nowe promocje na produkty spożywcze. Dziękujemy za zrozumienie.`,
    questions: [
      { q:"Kiedy sklep będzie zamknięty?", opts:["W sobotę","W niedzielę","W poniedziałek","Cały tydzień"], answer:1 },
      { q:"Dlaczego sklep będzie zamknięty?", opts:["Z powodu remontu","Z powodu inwentaryzacji","Z powodu święta","Z powodu strajku"], answer:1 },
      { q:"Co czeka na klientów od poniedziałku?", opts:["Wyższe ceny","Nowe promocje","Zamknięcie sklepu","Zmiana adresu"], answer:1 }
    ]
  },
  {
    title: "Rozmowa o planach na weekend",
    text: `Słuchaj, mam propozycję na sobotę. Słyszałam, że w centrum miasta organizują
    festiwal jedzenia ulicznego. Będzie dużo stoisk z różnych krajów i koncert na głównej
    scenie wieczorem. Możemy się spotkać o dwunastej i zostać tam do wieczora, co ty na to?`,
    questions: [
      { q:"Co jest organizowane w centrum miasta?", opts:["Targi książki","Festiwal jedzenia ulicznego","Maraton","Wystawa sztuki"], answer:1 },
      { q:"Co będzie wieczorem?", opts:["Pokaz filmowy","Koncert","Fajerwerki","Parada"], answer:1 },
      { q:"O której godzinie proponowane jest spotkanie?", opts:["O dziesiątej","O dwunastej","O czternastej","O szesnastej"], answer:1 }
    ]
  },
  {
    title: "Informacja w pociągu",
    text: `Szanowni Państwo, za chwilę pociąg zatrzyma się na stacji Łódź Fabryczna. Prosimy
    o przygotowanie się do wyjścia. Przypominamy, że pociąg do Poznania odjeżdża z peronu
    trzeciego za piętnaście minut. Życzymy Państwu przyjemnej dalszej podróży.`,
    questions: [
      { q:"Na jakiej stacji zatrzyma się pociąg?", opts:["Warszawa Centralna","Łódź Fabryczna","Kraków Główny","Poznań Główny"], answer:1 },
      { q:"Dokąd jedzie pociąg z peronu trzeciego?", opts:["Do Warszawy","Do Poznania","Do Krakowa","Do Gdańska"], answer:1 },
      { q:"Za ile minut odjeżdża pociąg do Poznania?", opts:["Za pięć minut","Za piętnaście minut","Za trzydzieści minut","Za godzinę"], answer:1 }
    ]
  },
  {
    title: "Wiadomości radiowe",
    text: `Witamy w wiadomościach. Dzisiaj rano na głównej ulicy miasta doszło do niewielkiego
    wypadku, który spowodował poranne korki. Policja apeluje o ostrożność i wybieranie
    alternatywnych dróg. Sytuacja na drogach powinna wrócić do normy po godzinie dziesiątej.`,
    questions: [
      { q:"Co się stało rano na głównej ulicy?", opts:["Demonstracja","Niewielki wypadek","Remont drogi","Koncert"], answer:1 },
      { q:"O co apeluje policja?", opts:["O szybką jazdę","O ostrożność i alternatywne drogi","O zostanie w domu","O używanie autobusów"], answer:1 },
      { q:"Kiedy sytuacja powinna wrócić do normy?", opts:["Po godzinie ósmej","Po godzinie dziesiątej","Po południu","Wieczorem"], answer:1 }
    ]
  },
  {
    title: "Zapowiedź w teatrze",
    text: `Szanowni Państwo, spektakl zacznie się za pięć minut. Prosimy o wyłączenie
    telefonów komórkowych oraz zajęcie miejsc zgodnie z numerami na bilecie. Przypominamy,
    że robienie zdjęć podczas przedstawienia jest zabronione. Przerwa nastąpi po pierwszym akcie.`,
    questions: [
      { q:"Za ile minut zacznie się spektakl?", opts:["Za dwie minuty","Za pięć minut","Za dziesięć minut","Już się zaczął"], answer:1 },
      { q:"O co proszą widzów?", opts:["O ciszę i wyłączenie telefonów","O szybkie zajęcie miejsc","O zakup programu","O brawa"], answer:0 },
      { q:"Kiedy będzie przerwa?", opts:["Na początku","Po pierwszym akcie","Na końcu","Nie będzie przerwy"], answer:1 }
    ]
  }
];

function seededRandomSLU(seed){
  let s=seed%2147483647; if(s<=0) s+=2147483646;
  return function(){ s=(s*16807)%2147483647; return (s-1)/2147483646; };
}
function shuffleSLU(arr, rng){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function buildListeningTest(textItem, rng){
  const questions = textItem.questions.map(q=>{
    const correctOpt = q.opts[q.answer];
    const shuffledOpts = shuffleSLU(q.opts, rng);
    return {
      type:"choice",
      q: q.q,
      options: shuffledOpts,
      answer: shuffledOpts.indexOf(correctOpt),
      explain: `Zgodnie z nagraniem, poprawna odpowiedź to: <b>${correctOpt}</b>.`
    };
  });
  const cleanText = textItem.text.replace(/\s+/g, " ").trim();
  return { title: textItem.title, text: cleanText, exercises: questions };
}

function generateSluchanieTest(testIndex){
  const textItem = LISTENING_TEXTS[testIndex % LISTENING_TEXTS.length];
  const rng = seededRandomSLU(30000 + testIndex*89);
  return buildListeningTest(textItem, rng);
}

const SLUCHANIE_TEST_COUNT = LISTENING_TEXTS.length;
