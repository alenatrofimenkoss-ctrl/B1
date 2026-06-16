/* ===================================================================
   GENERATOR: CZYTANIE — банк текстов + вопросы на понимание
   По образцу настоящего экзамена B1 (certyfikatpolski.pl): короткие
   тексты на бытовые темы + вопросы с вариантами ответа на понимание
   главной идеи, деталей и причинно-следственных связей.
   =================================================================== */

const READING_TEXTS = [
  {
    title: "Zakupy przez internet",
    text: `Coraz więcej Polaków robi zakupy spożywcze przez internet. Według ostatnich badań,
    prawie 40% mieszkańców dużych miast zamawia jedzenie online przynajmniej raz w tygodniu.
    Najczęściej wybierane produkty to pieczywo, nabiał i owoce. Klienci podają różne powody:
    oszczędność czasu, możliwość porównania cen oraz wygodę dostawy prosto do domu. Jednak
    nie wszyscy są zadowoleni — niektórzy skarżą się na wyższe ceny niż w sklepach stacjonarnych
    oraz na problemy z jakością świeżych produktów, które czasem przyjeżdżają już nieświeże.`,
    questions: [
      { q:"Ile procent mieszkańców dużych miast zamawia jedzenie online co tydzień?", opts:["20%","40%","60%","80%"], answer:1 },
      { q:"Jakie produkty są zamawiane najczęściej?", opts:["Mięso i ryby","Pieczywo, nabiał i owoce","Słodycze","Napoje"], answer:1 },
      { q:"Co jest głównym powodem robienia zakupów online według tekstu?", opts:["Niższe ceny","Oszczędność czasu i wygoda","Lepsza jakość produktów","Brak innych opcji"], answer:1 },
      { q:"Na co skarżą się niezadowoleni klienci?", opts:["Na brak produktów","Na wyższe ceny i jakość świeżych produktów","Na długi czas dostawy","Na brak aplikacji mobilnej"], answer:1 }
    ]
  },
  {
    title: "Praca zdalna",
    text: `Pandemia zmieniła sposób, w jaki Polacy patrzą na pracę. Wielu pracowników, którzy
    przed 2020 rokiem nigdy nie pracowali z domu, odkryło zalety pracy zdalnej: brak czasu
    straconego na dojazdy, większą elastyczność i lepszą równowagę między pracą a życiem
    prywatnym. Z drugiej strony, psychologowie ostrzegają przed izolacją społeczną i trudnością
    w oddzieleniu pracy od odpoczynku. Firmy coraz częściej proponują model hybrydowy — kilka
    dni w biurze, kilka dni w domu — jako kompromis między oczekiwaniami pracowników a potrzebą
    bezpośredniego kontaktu w zespole.`,
    questions: [
      { q:"Co odkryli pracownicy podczas pandemii?", opts:["Że biuro jest lepsze","Zalety pracy zdalnej","Że praca zdalna jest trudna","Że nie mogą pracować z domu"], answer:1 },
      { q:"Przed czym ostrzegają psychologowie?", opts:["Przed izolacją społeczną","Przed niższymi zarobkami","Przed utratą pracy","Przed brakiem internetu"], answer:0 },
      { q:"Co proponują coraz częściej firmy?", opts:["Tylko pracę zdalną","Tylko pracę w biurze","Model hybrydowy","Krótszy dzień pracy"], answer:2 }
    ]
  },
  {
    title: "Zdrowe odżywianie",
    text: `Dietetycy podkreślają, że nie istnieje jedna uniwersalna dieta odpowiednia dla
    wszystkich. To, co działa dobrze u jednej osoby, może nie przynieść efektów u innej —
    zależy to od wieku, poziomu aktywności fizycznej i indywidualnych potrzeb organizmu. Mimo
    to eksperci są zgodni w jednej kwestii: warto ograniczyć spożycie przetworzonej żywności
    i cukru, a zwiększyć ilość warzyw, owoców oraz wody w codziennej diecie. Ważne jest również
    regularne jedzenie posiłków, ponieważ długie przerwy między nimi mogą prowadzić do
    przejadania się wieczorem.`,
    questions: [
      { q:"Co mówią dietetycy o uniwersalnej diecie?", opts:["Że istnieje jedna dobra dieta dla wszystkich","Że nie ma jednej diety dla wszystkich","Że dieta nie ma znaczenia","Że tylko sportowcy potrzebują diety"], answer:1 },
      { q:"Co radzą ograniczyć eksperci?", opts:["Warzywa i owoce","Wodę","Przetworzoną żywność i cukier","Białko"], answer:2 },
      { q:"Co może się stać przy długich przerwach między posiłkami?", opts:["Lepsze samopoczucie","Przejadanie się wieczorem","Szybsza utrata wagi","Nic się nie zmienia"], answer:1 }
    ]
  },
  {
    title: "Rower w mieście",
    text: `Liczba osób korzystających z roweru jako codziennego środka transportu w polskich
    miastach systematycznie rośnie. Samorządy inwestują w nową infrastrukturę: ścieżki rowerowe,
    stacje wypożyczalni miejskich rowerów oraz parkingi dla jednośladów. Zwolennicy tego sposobu
    przemieszczania się podkreślają korzyści zdrowotne oraz niższe koszty w porównaniu z
    samochodem. Przeciwnicy wskazują na niebezpieczeństwo jazdy w ruchu miejskim, zwłaszcza
    w miejscach, gdzie infrastruktura rowerowa jest jeszcze niedostatecznie rozwinięta.`,
    questions: [
      { q:"Co robią samorządy, aby zachęcić do jazdy na rowerze?", opts:["Zakazują samochodów","Inwestują w infrastrukturę rowerową","Podnoszą ceny biletów","Budują nowe drogi dla samochodów"], answer:1 },
      { q:"Jakie korzyści wymieniają zwolennicy roweru?", opts:["Tylko niższe koszty","Zdrowie i niższe koszty","Większą prędkość","Komfort"], answer:1 },
      { q:"Na co wskazują przeciwnicy?", opts:["Na wysokie ceny rowerów","Na niebezpieczeństwo w ruchu miejskim","Na brak rowerów w sklepach","Na zmiany klimatu"], answer:1 }
    ]
  },
  {
    title: "Sztuczna inteligencja w codziennym życiu",
    text: `Sztuczna inteligencja jest już obecna w wielu aspektach codziennego życia, często
    w sposób niezauważalny dla użytkownika. Algorytmy decydują o tym, jakie filmy widzimy
    w serwisach streamingowych, jakie produkty są nam polecane w sklepach internetowych, a
    nawet jak wygląda trasa proponowana przez nawigację. Niektórzy eksperci ostrzegają przed
    nadmiernym zaufaniem do tych technologii, ponieważ algorytmy mogą wzmacniać istniejące
    uprzedzenia lub ograniczać różnorodność informacji, do których mamy dostęp. Inni widzą
    w sztucznej inteligencji głównie szansę na ułatwienie pracy i codziennych zadań.`,
    questions: [
      { q:"Gdzie według tekstu jest obecna sztuczna inteligencja?", opts:["Tylko w telefonach","W wielu aspektach codziennego życia","Tylko w pracy naukowej","Tylko w grach komputerowych"], answer:1 },
      { q:"Przed czym ostrzegają niektórzy eksperci?", opts:["Przed utratą pracy","Przed nadmiernym zaufaniem do algorytmów","Przed wysokimi kosztami","Przed awariami komputerów"], answer:1 },
      { q:"Jak inni postrzegają sztuczną inteligencję?", opts:["Jako zagrożenie","Jako szansę na ułatwienie zadań","Jako coś nieważnego","Jako tymczasową modę"], answer:1 }
    ]
  },
  {
    title: "Życie na wsi a w mieście",
    text: `Od kilku lat obserwuje się w Polsce trend odwrotny do tego, co dominowało wcześniej:
    coraz więcej mieszkańców dużych miast decyduje się na przeprowadzkę na wieś lub do mniejszych
    miejscowości. Praca zdalna umożliwiła wielu osobom zachowanie miejskiej pensji przy jednoczesnym
    obniżeniu kosztów życia. Mieszkańcy wsi cenią sobie ciszę, kontakt z naturą oraz niższe ceny
    nieruchomości. Niektórzy jednak po kilku miesiącach wracają do miasta, tęskniąc za bliskością
    sklepów, kin czy restauracji oraz lepszym dostępem do opieki medycznej.`,
    questions: [
      { q:"Jaki trend obserwuje się w Polsce od kilku lat?", opts:["Przeprowadzki do miast","Przeprowadzki na wieś","Emigracja za granicę","Brak zmian"], answer:1 },
      { q:"Co umożliwiło wielu osobom przeprowadzkę na wieś?", opts:["Praca zdalna","Wyższe pensje na wsi","Tańsze samochody","Nowe autostrady"], answer:0 },
      { q:"Dlaczego niektórzy wracają do miasta?", opts:["Z powodu ciszy","Tęsknią za sklepami, kinami i opieką medyczną","Bo na wsi jest drożej","Bo nie mają internetu"], answer:1 }
    ]
  },
  {
    title: "Segregacja śmieci",
    text: `Segregacja odpadów stała się w Polsce obowiązkiem prawnym, ale wciąż wiele osób ma
    problem z prawidłowym sortowaniem śmieci. Najwięcej wątpliwości budzą opakowania złożone
    z kilku materiałów, na przykład kartony po mleku, które są jednocześnie papierowe i pokryte
    plastikową warstwą. Gminy organizują kampanie edukacyjne, aby pomóc mieszkańcom zrozumieć
    zasady segregacji, ale efekty są różne w zależności od regionu. W miastach, gdzie system
    kar finansowych za błędną segregację jest skuteczniej wdrażany, poziom prawidłowego
    sortowania jest zauważalnie wyższy.`,
    questions: [
      { q:"Co stało się w Polsce obowiązkiem prawnym?", opts:["Recykling plastiku","Segregacja odpadów","Kompostowanie","Zakaz plastikowych toreb"], answer:1 },
      { q:"Jakie opakowania budzą najwięcej wątpliwości?", opts:["Szklane butelki","Opakowania z kilku materiałów","Papierowe torby","Metalowe pudełka"], answer:1 },
      { q:"Gdzie poziom prawidłowej segregacji jest wyższy?", opts:["Gdzie nie ma kontroli","Gdzie skutecznie działają kary finansowe","Gdzie jest mniej mieszkańców","Gdzie nie ma kampanii edukacyjnych"], answer:1 }
    ]
  },
  {
    title: "Turystyka po pandemii",
    text: `Branża turystyczna odbudowuje się po trudnym okresie pandemii, ale podróżni zmienili
    swoje priorytety. Coraz więcej osób wybiera kierunki mniej zatłoczone, unikając popularnych
    europejskich metropolii w szczycie sezonu. Wzrosło zainteresowanie turystyką krajową oraz
    pobytami na łonie natury, takimi jak wędrówki górskie czy kemping. Biura podróży zauważają
    też wzrost popytu na elastyczne rezerwacje, które można łatwo zmienić lub odwołać bez
    dodatkowych kosztów — efekt niepewności, jaką wielu ludzi wciąż czuje po doświadczeniach
    związanych z odwołanymi podróżami w czasie pandemii.`,
    questions: [
      { q:"Jak zmienili się podróżni po pandemii?", opts:["Wybierają tylko zagraniczne podróże","Unikają zatłoczonych kierunków","Podróżują tylko samolotem","Nie podróżują wcale"], answer:1 },
      { q:"Co wzrosło w popularności?", opts:["Turystyka krajowa i pobyty w naturze","Tylko podróże luksusowe","Podróże służbowe","Podróże grupowe"], answer:0 },
      { q:"Czego oczekują klienci biur podróży?", opts:["Niższych cen za wszelką cenę","Elastycznych rezerwacji","Krótszych podróży","Większej liczby hoteli"], answer:1 }
    ]
  },
  {
    title: "Edukacja dzieci a technologia",
    text: `Rodzice coraz częściej zastanawiają się, jak ograniczyć czas, który ich dzieci
    spędzają przed ekranem, jednocześnie nie odcinając ich od technologii, która jest ważną
    częścią dzisiejszej edukacji. Szkoły wykorzystują tablety i komputery w nauczaniu wielu
    przedmiotów, co z jednej strony rozwija umiejętności cyfrowe uczniów, a z drugiej budzi
    obawy o nadmierne korzystanie z urządzeń elektronicznych poza zajęciami. Eksperci radzą
    ustalanie jasnych zasad dotyczących czasu spędzanego przed ekranem oraz zachęcanie dzieci
    do aktywności fizycznej i spotkań z rówieśnikami w realnym świecie.`,
    questions: [
      { q:"Czym zastanawiają się rodzice?", opts:["Jak kupić więcej urządzeń","Jak ograniczyć czas przed ekranem","Jak zmienić szkołę","Jak zarabiać więcej"], answer:1 },
      { q:"Do czego szkoły wykorzystują tablety i komputery?", opts:["Tylko do rozrywki","Do nauczania wielu przedmiotów","Tylko do testów","Do kontaktu z rodzicami"], answer:1 },
      { q:"Co radzą eksperci?", opts:["Całkowity zakaz technologii","Jasne zasady i aktywność fizyczną","Więcej czasu przed ekranem","Tylko nauka online"], answer:1 }
    ]
  },
  {
    title: "Kawiarnie jako miejsce pracy",
    text: `W ostatnich latach kawiarnie w dużych miastach przekształciły się w nieformalne
    biura dla freelancerów i pracowników zdalnych. Wiele lokali dostosowało swoją ofertę do
    tego trendu, instalując więcej gniazdek elektrycznych i zapewniając stabilne wi-fi. Niektórzy
    właściciele kawiarni są zadowoleni z dodatkowych klientów, którzy zamawiają kawę przez kilka
    godzin, inni jednak narzekają, że jedna osoba zajmująca stolik na cały dzień przy zamówieniu
    jednej kawy nie jest opłacalna dla biznesu. Część kawiarni wprowadziła limity czasowe lub
    minimalne kwoty zamówień w godzinach szczytu.`,
    questions: [
      { q:"W co przekształciły się kawiarnie dla wielu freelancerów?", opts:["W restauracje","W nieformalne biura","W sale konferencyjne","W biblioteki"], answer:1 },
      { q:"Co zainstalowały niektóre kawiarnie?", opts:["Więcej krzeseł","Gniazdka elektryczne i wi-fi","Telewizory","Automaty do kawy"], answer:1 },
      { q:"Dlaczego niektórzy właściciele są niezadowoleni?", opts:["Bo klienci są niemili","Bo długie siedzenie przy jednym zamówieniu nie jest opłacalne","Bo nie mają wi-fi","Bo kawa jest za droga"], answer:1 }
    ]
  }
];

function seededRandomCZT(seed){
  let s=seed%2147483647; if(s<=0) s+=2147483646;
  return function(){ s=(s*16807)%2147483647; return (s-1)/2147483646; };
}
function shuffleCZT(arr, rng){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

// Один "тест" Czytania = один текст + все его вопросы (с перемешанным порядком вариантов)
function buildReadingTest(textItem, rng){
  const questions = textItem.questions.map(q=>{
    const correctOpt = q.opts[q.answer];
    const shuffledOpts = shuffleCZT(q.opts, rng);
    return {
      type:"choice",
      q: q.q,
      options: shuffledOpts,
      answer: shuffledOpts.indexOf(correctOpt),
      explain: `Zgodnie z tekstem, poprawna odpowiedź to: <b>${correctOpt}</b>.`
    };
  });
  const cleanText = textItem.text.replace(/\s+/g, " ").trim();
  return { title: textItem.title, text: cleanText, exercises: questions };
}

// testIndex (0-based) -> один текст из банка (с детерминированным перемешиванием вариантов)
function generateCzytanieTest(testIndex){
  const textItem = READING_TEXTS[testIndex % READING_TEXTS.length];
  const rng = seededRandomCZT(20000 + testIndex*83);
  return buildReadingTest(textItem, rng);
}

const CZYTANIE_TEST_COUNT = READING_TEXTS.length;
