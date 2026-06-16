/* ===================================================================
   DANE: MÓWIENIE — банк тем устной части (монолог по теме)
   По образцу экзамена: краткий монолог 1.5-2 минуты на бытовую тему.
   =================================================================== */

const SPEAKING_TASKS = [
  { id:1, title:"Twoje miasto", prompt:"Opowiedz o mieście, w którym mieszkasz. Co lubisz w nim najbardziej, a co chciałbyś/chciałabyś zmienić?" },
  { id:2, title:"Twój wolny czas", prompt:"Opisz, jak zwykle spędzasz wolny czas. Jakie masz hobby i dlaczego je wybrałeś/aś?" },
  { id:3, title:"Praca i kariera", prompt:"Opowiedz o swojej pracy lub o pracy, którą chciałbyś/chciałabyś robić w przyszłości. Co jest dla ciebie ważne w pracy?" },
  { id:4, title:"Podróże", prompt:"Opisz swoją ostatnią podróż albo podróż, o której marzysz. Dokąd byś pojechał/a i dlaczego?" },
  { id:5, title:"Zdrowy styl życia", prompt:"Czy prowadzisz zdrowy styl życia? Opowiedz, co robisz, aby zachować zdrowie i dobre samopoczucie." },
  { id:6, title:"Technologia w życiu codziennym", prompt:"Jak technologia zmieniła twoje codzienne życie? Czy widzisz w tym więcej zalet czy wad?" },
  { id:7, title:"Przyjaźń", prompt:"Co jest dla ciebie ważne w przyjaźni? Opowiedz o swoim najlepszym przyjacielu lub przyjaciółce." },
  { id:8, title:"Edukacja", prompt:"Opowiedz o swoim doświadczeniu związanym z nauką języka polskiego. Co jest dla ciebie najtrudniejsze?" },
  { id:9, title:"Tradycje i święta", prompt:"Opisz jedno święto lub tradycję ważną w twojej kulturze. Jak się je obchodzi?" },
  { id:10, title:"Plany na przyszłość", prompt:"Jakie masz plany na najbliższe pięć lat? Co chciałbyś/chciałabyś osiągnąć?" },
  { id:11, title:"Ulubiona kuchnia", prompt:"Opowiedz o swojej ulubionej kuchni lub potrawie. Czy umiesz ją przygotować?" },
  { id:12, title:"Mieszkanie idealne", prompt:"Jak wyglądałoby twoje idealne mieszkanie lub dom? Opisz je." }
];

const SPEAKING_EVALUATION_CRITERIA = [
  "Płynność mówienia",
  "Poprawność gramatyczna",
  "Bogactwo słownictwa",
  "Zgodność z tematem i pełnota odpowiedzi",
  "Wymowa i naturalność (na podstawie transkrypcji)"
];
