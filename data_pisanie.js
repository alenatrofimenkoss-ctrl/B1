/* ===================================================================
   DANE: PISANIE — банк тем письма (формальное/неформальное)
   По образцу экзамена: одно формальное (e-mail/skarga/podanie), одно
   неформальное (list do przyjaciela). ~120-150 слов.
   =================================================================== */

const WRITING_TASKS = [
  { id:1, type:"nieformalny", title:"List do przyjaciela o przeprowadzce",
    prompt:`Niedawno przeprowadziłeś/aś się do nowego miasta. Napisz e-mail do przyjaciela, w którym:
    – opiszesz, jak wygląda twoje nowe miejsce zamieszkania,
    – wyjaśnisz, dlaczego się przeprowadziłeś/aś,
    – zapytasz, kiedy przyjaciel może cię odwiedzić.
    (120–150 słów)` },
  { id:2, type:"formalny", title:"Skarga do administracji budynku",
    prompt:`Od miesiąca w twoim budynku nie działa winda. Napisz formalny e-mail do administracji, w którym:
    – opiszesz problem,
    – wyjaśnisz, jak to wpływa na twoje codzienne życie,
    – poprosisz o szybkie rozwiązanie sytuacji.
    (120–150 słów)` },
  { id:3, type:"nieformalny", title:"Zaproszenie na urodziny",
    prompt:`Organizujesz urodziny. Napisz e-mail do znajomego, w którym:
    – zapraszasz go na imprezę,
    – podajesz szczegóły (data, miejsce, godzina),
    – pytasz, czy może pomóc w przygotowaniach.
    (120–150 słów)` },
  { id:4, type:"formalny", title:"Podanie o pracę",
    prompt:`Zobaczyłeś/aś ogłoszenie o pracę, która cię interesuje. Napisz formalny e-mail do pracodawcy, w którym:
    – przedstawisz się i wyjaśnisz, dlaczego piszesz,
    – opiszesz swoje doświadczenie i umiejętności,
    – zapytasz o możliwość rozmowy kwalifikacyjnej.
    (120–150 słów)` },
  { id:5, type:"nieformalny", title:"Przeprosiny za spóźnienie",
    prompt:`Nie przyszedłeś/aś na spotkanie z przyjacielem. Napisz e-mail, w którym:
    – przepraszasz i wyjaśniasz, co się stało,
    – proponujesz nowy termin spotkania,
    – pytasz, czy przyjaciel się nie obraził.
    (120–150 słów)` },
  { id:6, type:"formalny", title:"Reklamacja zakupionego produktu",
    prompt:`Kupiłeś/aś produkt online, który okazał się uszkodzony. Napisz formalny e-mail do sklepu, w którym:
    – opiszesz, jaki produkt kupiłeś/aś i kiedy,
    – wyjaśnisz, jaki jest problem,
    – poprosisz o wymianę lub zwrot pieniędzy.
    (120–150 słów)` },
  { id:7, type:"nieformalny", title:"Opis wakacji",
    prompt:`Wróciłeś/aś z wakacji. Napisz e-mail do przyjaciela, w którym:
    – opiszesz, gdzie byłeś/aś i z kim,
    – opowiesz o najciekawszym wydarzeniu,
    – zaproponujesz wspólny wyjazd w przyszłości.
    (120–150 słów)` },
  { id:8, type:"formalny", title:"Prośba o zmianę terminu egzaminu",
    prompt:`Z powodów zdrowotnych nie możesz przyjść na egzamin w wyznaczonym terminie. Napisz formalny e-mail do nauczyciela, w którym:
    – wyjaśnisz sytuację,
    – poprosisz o nowy termin,
    – zapytasz o dalsze kroki.
    (120–150 słów)` },
  { id:9, type:"nieformalny", title:"Rada dla przyjaciela",
    prompt:`Twój przyjaciel napisał, że ma problem w pracy z kolegą. Napisz e-mail, w którym:
    – pokazujesz zrozumienie dla jego sytuacji,
    – dajesz mu radę, co powinien zrobić,
    – proponujesz spotkanie, aby porozmawiać o tym osobiście.
    (120–150 słów)` },
  { id:10, type:"formalny", title:"Zapytanie o ofertę kursu językowego",
    prompt:`Chcesz zapisać się na kurs języka polskiego. Napisz formalny e-mail do szkoły językowej, w którym:
    – zapytasz o dostępne poziomy i terminy,
    – zapytasz o cenę kursu,
    – poprosisz o informacje na temat sposobu zapisu.
    (120–150 słów)` }
];

const WRITING_EVALUATION_CRITERIA = [
  "Zgodność z tematem (czy uwzględniono wszystkie wymagane punkty)",
  "Poprawność gramatyczna",
  "Bogactwo słownictwa",
  "Organizacja tekstu (wstęp, rozwinięcie, zakończenie, forma listu/e-maila)",
  "Długość zgodna z wymaganiami (120–150 słów)"
];
