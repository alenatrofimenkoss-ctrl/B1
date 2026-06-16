/* ===================================================================
   POLSKI B1 — DANE GRAMATYCZNE (полная грамматика для уровня B1)
   Структура: GRAMMAR = [ { id, title, subtitle, blocks:[...], exercises:[...] } ]
   blocks: { type: 'text'|'table'|'list', ... } — для рендера объяснений
   exercises: { type:'choice'|'fill'|'match', question, options, answer, explain }
   =================================================================== */

const GRAMMAR = [

/* ============================== 1. PRZYPADKI ============================== */
{
  id: "przypadki",
  title: "Przypadki",
  subtitle: "Падежи существительных и прилагательных",
  blocks: [
    { type: "text", html: `В польском языке 7 падежей. На экзамене B1 редко спрашивают
      теорию — обычно нужно вставить верную форму слова в предложение. Поэтому ключ —
      не таблицы наизусть, а понимание <b>вопроса</b> и <b>типовой ситуации</b> каждого падежа.` },
    { type: "cases", items: [
      { name: "Mianownik", q: "kto? co?", use: "Подлежащее, словарная форма.", ex: "<b>Pies</b> biega. To jest <b>moja siostra</b>." },
      { name: "Dopełniacz", q: "kogo? czego?", use: "После отрицания <i>nie ma</i>; после предлогов <i>bez, do, od, z, dla, u, podczas, koło, obok, naprzeciwko</i>; после числительных 5+; принадлежность.", ex: "Nie mam <b>czasu</b>. Idę do <b>lekarza</b>. Pięć <b>kobiet</b>. Dom <b>brata</b>." },
      { name: "Celownik", q: "komu? czemu?", use: "Адресат действия. После <i>dawać, pomagać, dziękować, życzyć, ufać, wierzyć, podobać się, przyglądać się</i>.", ex: "Daję prezent <b>mamie</b>. Pomagam <b>koledze</b>. To mi się podoba." },
      { name: "Biernik", q: "kogo? co?", use: "Прямое дополнение при переходных глаголах; после предлогов направления <i>na, w, przez</i> при движении.", ex: "Czytam <b>książkę</b>. Idę <b>na uniwersytet</b>." },
      { name: "Narzędnik", q: "(z) kim? (z) czym?", use: "Орудие, способ; после <i>z</i> (совместность); после <i>być, zostać, interesować się, zajmować się, opiekować się</i>.", ex: "Piszę <b>ołówkiem</b>. Jestem <b>nauczycielką</b>. Interesuję się <b>muzyką</b>." },
      { name: "Miejscownik", q: "o kim? o czym? gdzie?", use: "Место без движения (<i>w, na, przy, o</i>); тема разговора (<i>mówić o, myśleć o, rozmawiać o, marzyć o</i>).", ex: "Mieszkam <b>w Warszawie</b>. Myślę <b>o tobie</b>." },
      { name: "Wołacz", q: "(zawołanie)", use: "Обращение. На экзамене — в формальных письмах.", ex: "Szanowny <b>Panie</b>! Drogi <b>Janku</b>!" }
    ]},
    { type: "table", caption: "Образец склонения: kobieta (ж.), student (м.лич.), dom (м.неж.), okno (ср.)",
      head: ["Падеж", "kobieta", "student", "dom", "okno"],
      rows: [
        ["Mianownik", "kobieta", "student", "dom", "okno"],
        ["Dopełniacz", "kobiety", "studenta", "domu", "okna"],
        ["Celownik", "kobiecie", "studentowi", "domowi", "oknu"],
        ["Biernik", "kobietę", "studenta", "dom", "okno"],
        ["Narzędnik", "kobietą", "studentem", "domem", "oknem"],
        ["Miejscownik", "kobiecie", "studencie", "domu", "oknie"],
        ["Wołacz", "kobieto", "studencie", "domu", "okno"]
      ]
    },
    { type: "exceptions", items: [
      "Слова на <i>-a</i> муж. рода (<i>kolega, mężczyzna, poeta, artysta</i>) склоняются как женские в ед.ч. (kolegi, koledze), но как мужские во мн.ч. (koledzy).",
      "<i>Ręka, noga, oko, ucho</i> — архаичные формы мн.ч.: <i>oczy, uszy</i> (а не «oka, ucha»).",
      "<i>Kino, radio, metro, studio</i> практически не склоняются. <i>Auto</i> склоняется частично: <i>w aucie</i>.",
      "<i>Dziecko</i> во мн.ч. — <i>dzieci</i> и согласуется как женский/смешанный род: <i>te dzieci poszły</i>.",
      "Мужской неживой допускает Dopełniacz на -u ИЛИ -a без жёсткого правила: <i>tekst→tekstu</i>, но <i>chleb→chleba</i>. Это нужно запоминать списком частых слов."
    ]}
  ],
  exercises: [
    { type: "choice", q: "Idę do ___ (lekarz).", options: ["lekarz", "lekarza", "lekarzowi", "lekarzem"], answer: 1,
      explain: "После <i>do</i> всегда Dopełniacz → <b>lekarza</b>." },
    { type: "choice", q: "Interesuję się ___ (historia).", options: ["historię", "historii", "historią", "historia"], answer: 2,
      explain: "<i>Interesować się</i> требует Narzędnik → <b>historią</b>." },
    { type: "choice", q: "To jest dom ___ (mój brat).", options: ["mojego brata", "mojemu bratu", "mój brat", "moim bratem"], answer: 0,
      explain: "Принадлежность выражается Dopełniaczem → <b>mojego brata</b>." },
    { type: "choice", q: "Czekam na ___ (autobus).", options: ["autobus", "autobusu", "autobusem", "autobusowi"], answer: 0,
      explain: "<i>Czekać na</i> + Biernik; мужской неживой = форма как в Nominativ → <b>autobus</b>." },
    { type: "choice", q: "Rozmawiamy o ___ (nasza podróż).", options: ["naszą podróż", "naszej podróży", "nasza podróż", "naszą podróżą"], answer: 1,
      explain: "<i>Rozmawiać o</i> требует Miejscownik → <b>naszej podróży</b>." },
    { type: "choice", q: "Pomagam ___ (moja siostra) w nauce.", options: ["moją siostrę", "mojej siostrze", "moja siostra", "moją siostrą"], answer: 1,
      explain: "<i>Pomagać</i> требует Celownik → <b>mojej siostrze</b>." },
    { type: "choice", q: "Nie ma ___ (czas) na rozmowę.", options: ["czas", "czasu", "czasem", "czasowi"], answer: 1,
      explain: "После <i>nie ma</i> всегда Dopełniacz → <b>czasu</b>." },
    { type: "choice", q: "Jestem zadowolona z ___ (ta praca).", options: ["tej pracy", "tę pracę", "ta praca", "tą pracą"], answer: 0,
      explain: "<i>Zadowolony z</i> + Dopełniacz → <b>tej pracy</b>." }
  ]
},

/* ============================== 2. RZECZOWNIK: RODZAJ I LICZBA ============================== */
{
  id: "rodzaj-liczba",
  title: "Rodzaj i liczba rzeczownika",
  subtitle: "Род существительных и образование множественного числа",
  blocks: [
    { type: "text", html: `Род определяет, какое окончание выберут прилагательное, числительное
      и глагол в прошедшем времени. В польском есть 5 родов (в отличие от русского, где их 3):
      męski osobowy (муж. лица), męski żywotny (муж. животные), męski nieżywotny (муж. неживые),
      żeński (женский), neutralny (средний) — и это влияет на формы множественного числа.` },
    { type: "table", caption: "Определение рода по окончанию (ед.ч.)",
      head: ["Род", "Типичное окончание", "Примеры"],
      rows: [
        ["Męski", "согласная", "stół, dom, brat, kot"],
        ["Żeński", "-a, -i", "kobieta, pani, noc (искл. на согласную)"],
        ["Neutralny", "-o, -e, -ę", "okno, mieszkanie, imię"]
      ]
    },
    { type: "text", html: `<b>Множественное число мужского рода — главная сложность B1.</b> Форма
      именительного падежа мн.ч. зависит от того, обозначает слово людей мужского пола (męskoosobowy)
      или нет. Если в группе есть хотя бы один мужчина — используется форма męskoosobowa и особая форма
      прошедшего времени глагола (<i>chłopcy poszli</i>, а не «poszły»).` },
    { type: "table", caption: "Mianownik множественного числа",
      head: ["Тип", "Ед.ч.", "Мн.ч.", "Комментарий"],
      rows: [
        ["męskoosobowy", "student", "studenci", "часто чередование: t→ci, k→cy"],
        ["męskoosobowy", "Polak", "Polacy", "k→cy"],
        ["męski nieżywotny", "stół", "stoły", ""],
        ["żeński", "kobieta", "kobiety", ""],
        ["żeński", "pani", "panie", ""],
        ["neutralny", "okno", "okna", ""],
        ["neutralny (искл.)", "dziecko", "dzieci", "архаичная форма"]
      ]
    },
    { type: "exceptions", items: [
      "<i>Przyjaciel→przyjaciele</i>, <i>brat→bracia</i>, <i>ksiądz→księża</i> — нерегулярные формы мн.ч.",
      "Слова, которые употребляются только во мн.ч. (pluralia tantum): <i>drzwi, okulary, spodnie, plecy, urodziny, wakacje</i> — у них нет ед.ч. в обычном смысле.",
      "<i>Rok→lata</i> во мн.ч. (а не «roki»).",
      "Некоторые мужские слова на -a (<i>kolega, mężczyzna</i>) во мн.ч. меняются как męskoosobowy: <i>koledzy, mężczyźni</i>."
    ]}
  ],
  exercises: [
    { type: "choice", q: "Какое слово относится к neutralny роду?", options: ["stół", "kobieta", "okno", "brat"], answer: 2,
      explain: "<b>Okno</b> заканчивается на -o → средний род." },
    { type: "choice", q: "Множественное число от «Polak»:", options: ["Polaki", "Polacy", "Polaków", "Polacze"], answer: 1,
      explain: "k→cy перед męskoosobowym окончанием -y: <b>Polacy</b>." },
    { type: "choice", q: "Множественное число от «dziecko»:", options: ["dzieckа", "dziecki", "dzieci", "dzieckowie"], answer: 2,
      explain: "Архаичная нерегулярная форма: <b>dzieci</b>." },
    { type: "choice", q: "Слово, у которого нет единственного числа:", options: ["okulary", "stół", "pani", "dom"], answer: 0,
      explain: "<b>Okulary</b> (очки) — pluralia tantum, употребляется только во мн.ч." },
    { type: "choice", q: "Множественное число от «przyjaciel»:", options: ["przyjacielowie", "przyjaciele", "przyjacieli", "przyjacielacy"], answer: 1,
      explain: "Нерегулярная форма: <b>przyjaciele</b>." }
  ]
},

/* ============================== 3. PRZYMIOTNIK ============================== */
{
  id: "przymiotnik",
  title: "Przymiotnik",
  subtitle: "Прилагательные: согласование, степени сравнения",
  blocks: [
    { type: "text", html: `Прилагательное всегда согласуется с существительным в роде, числе и
      падеже. В словаре прилагательное даётся в форме мужского рода ед.ч. (<i>dobry</i>), от него
      образуются остальные формы.` },
    { type: "table", caption: "Mianownik прилагательного по родам",
      head: ["Муж.", "Жен.", "Сред.", "Мн.ч. (не-osobowy)", "Мн.ч. (osobowy)"],
      rows: [["dobry", "dobra", "dobre", "dobre", "dobrzy"], ["mały", "mała", "małe", "małe", "mali"]]
    },
    { type: "text", html: `<b>Степени сравнения.</b> Регулярно: добавляем суффикс <i>-szy/-ejszy</i>
      для сравнительной степени и <i>naj-</i> для превосходной.` },
    { type: "table", caption: "Степени сравнения",
      head: ["Базовая", "Сравнительная", "Превосходная"],
      rows: [
        ["szybki", "szybszy", "najszybszy"],
        ["ciekawy", "ciekawszy", "najciekawszy"],
        ["ładny", "ładniejszy", "najładniejszy"]
      ]
    },
    { type: "exceptions", items: [
      "<b>Нерегулярные степени сравнения (запомнить наизусть):</b> dobry→lepszy→najlepszy; zły→gorszy→najgorszy; duży→większy→największy; mały→mniejszy→najmniejszy.",
      "Некоторые прилагательные образуют сравнительную степень с <i>bardziej</i> вместо суффикса: <i>bardziej znany, bardziej skomplikowany</i> (обычно длинные/заимствованные слова).",
      "Прилагательные на -ski, -cki, -ny часто не имеют степеней сравнения вообще (<i>polski, miejski</i>)."
    ]}
  ],
  exercises: [
    { type: "choice", q: "To jest ___ (dobry) student.", options: ["dobre", "dobra", "dobry", "dobrzy"], answer: 2,
      explain: "Муж. род ед.ч. → <b>dobry</b>." },
    { type: "choice", q: "Сравнительная степень от «duży»:", options: ["duższy", "bardziej duży", "większy", "najduższy"], answer: 2,
      explain: "Нерегулярная форма: duży→<b>większy</b>." },
    { type: "choice", q: "To są ___ (mały) dzieci.", options: ["małe", "mali", "mała", "małych"], answer: 0,
      explain: "<i>Dzieci</i> грамматически не męskoosobowy в этом контексте → форма <b>małe</b>." },
    { type: "choice", q: "Превосходная степень от «zły»:", options: ["najgorszy", "najzlejszy", "najbardziej zły", "gorszy"], answer: 0,
      explain: "Нерегулярная форма: zły→gorszy→<b>najgorszy</b>." },
    { type: "choice", q: "Ten projekt jest ___ (skomplikowany) niż poprzedni.", options: ["skomplikowańszy", "bardziej skomplikowany", "skomplikowanszy", "najskomplikowany"], answer: 1,
      explain: "Длинное прилагательное → аналитическая форма с <b>bardziej</b>." }
  ]
},

/* ============================== 4. CZASOWNIK: ASPEKT I CZASY ============================== */
{
  id: "czasownik-czasy",
  title: "Czasownik — aspekt i czasy",
  subtitle: "Виды глагола, настоящее, прошедшее, будущее время",
  blocks: [
    { type: "text", html: `Главная трудность для русскоязычных — понять, что польский <b>aspekt</b>
      (вид: niedokonany/dokonany) работает почти так же, как в русском «делать/сделать», но
      механика образования будущего времени отличается.` },
    { type: "table", caption: "Образование времён",
      head: ["Время", "Niedokonany (несов.)", "Dokonany (сов.)"],
      rows: [
        ["Przeszły (прошедшее)", "robiłem", "zrobiłem"],
        ["Teraźniejszy (наст.)", "robię", "— (нет наст. времени!)"],
        ["Przyszły (будущее)", "będę robić / będę robił", "zrobię"]
      ]
    },
    { type: "text", html: `<b>Важно:</b> глаголы совершенного вида (dokonany) не имеют формы
      настоящего времени — их «настоящая» форма автоматически означает будущее: <i>zrobię</i> = «я сделаю».
      Будущее несовершенного вида составное: <i>będę + инфинитив</i> ИЛИ <i>będę + причастие прош. времени</i>:
      <i>będę pisać</i> = <i>będę pisał</i>.` },
    { type: "table", caption: "Спряжение в настоящем времени — 3 основных группы",
      head: ["Лицо", "robić (-ę,-isz)", "czytać (-am,-asz)", "rozumieć (-em,-esz)"],
      rows: [
        ["ja", "robię", "czytam", "rozumiem"],
        ["ty", "robisz", "czytasz", "rozumiesz"],
        ["on/ona", "robi", "czyta", "rozumie"],
        ["my", "robimy", "czytamy", "rozumiemy"],
        ["wy", "robicie", "czytacie", "rozumiecie"],
        ["oni/one", "robią", "czytają", "rozumieją"]
      ]
    },
    { type: "exceptions", items: [
      "Глагол <i>być</i> в прошедшем времени спрягается полностью нерегулярно: byłem, byłeś, był/była/było, byliśmy, byliście, byli/były.",
      "Глаголы движения <i>iść/jechać</i> в несов. виде имеют отдельные «однонаправленные» (iść, jechać) и «многонаправленные/повторяющиеся» (chodzić, jeździć) формы — выбор зависит от контекста повторяемости.",
      "Некоторые глаголы образуют dokonany не приставкой, а суффиксом или другим корнем: <i>brać→wziąć</i>, <i>kładać→położyć</i>, <i>mówić→powiedzieć</i>.",
      "Возвратная частица <i>się</i> может менять значение глагола кардинально: <i>uczyć (кого-то)</i> vs <i>uczyć się (учиться самому)</i>."
    ]}
  ],
  exercises: [
    { type: "choice", q: "Wczoraj ___ (pisać, niedok.) list cały wieczór.", options: ["napisałem", "pisałem", "będę pisał", "piszę"], answer: 1,
      explain: "Длительное действие в прошлом без указания результата → niedokonany: <b>pisałem</b>." },
    { type: "choice", q: "Jutro ___ (napisać, dok.) ten list.", options: ["piszę", "napiszę", "będę pisać", "pisałem"], answer: 1,
      explain: "Dokonany в форме наст. времени автоматически = будущее: <b>napiszę</b>." },
    { type: "choice", q: "Ona codziennie ___ (chodzić) do pracy pieszo.", options: ["idzie", "chodzi", "pójdzie", "szła"], answer: 1,
      explain: "Регулярное повторяющееся действие → многонаправленный глагол <b>chodzi</b>." },
    { type: "choice", q: "Teraz ___ (iść) do sklepu, czekaj na mnie.", options: ["chodzę", "idę", "pójdę", "chodziłem"], answer: 1,
      explain: "Однократное конкретное движение прямо сейчас → <b>idę</b>." },
    { type: "choice", q: "Forma czasu przeszłego od «być» dla «ona»:", options: ["był", "było", "była", "byli"], answer: 2,
      explain: "Женский род ед.ч. → <b>była</b>." },
    { type: "choice", q: "Будущее несовершенного вида от «czytać»:", options: ["przeczytam", "będę czytać", "czytam", "czytałem"], answer: 1,
      explain: "Несов. вид + составное будущее: <b>będę czytać</b>." }
  ]
},

/* ============================== 5. LICZEBNIKI ============================== */
{
  id: "liczebniki",
  title: "Liczebniki",
  subtitle: "Числительные и их связь с падежом существительного",
  blocks: [
    { type: "text", html: `Это одна из самых частых тем на экзамене B1. Главное правило:
      числительные <b>1</b> ведут себя как прилагательное; <b>2,3,4</b> требуют особой формы
      существительного; <b>5 и больше</b> требуют Dopełniacz множественного числа.` },
    { type: "table", caption: "Числительное + существительное",
      head: ["Числительное", "Падеж существительного", "Пример"],
      rows: [
        ["1", "согласование как прилагательное", "jeden stół, jedna kobieta"],
        ["2, 3, 4", "особая форма (часто = Mianownik мн.ч. для не-osobowych)", "dwa stoły, trzy kobiety, cztery okna"],
        ["5, 6, 7… 21, 22...", "Dopełniacz мн.ч.", "pięć stołów, dwadzieścia kobiet"],
        ["2,3,4 + мужчины (osobowy)", "особая форма на -aj/-ej + глагол мн.ч.", "dwaj studenci ИЛИ dwóch studentów"]
      ]
    },
    { type: "text", html: `Для группы мужчин (męskoosobowy) после 2,3,4 есть <b>два допустимых варианта</b>:
      <i>dwaj studenci poszli</i> (числительное как подлежащее) или <i>dwóch studentów poszło</i>
      (числительное как количественное слово + Dopełniacz, глагол в ед.ч. ср.р.). Второй вариант проще
      для не-носителей и абсолютно корректен на экзамене.` },
    { type: "exceptions", items: [
      "После составных числительных, заканчивающихся на 1 (21, 31, 101...) — существительное согласуется как после «1»: <i>21 dni</i> — Mianownik мн.ч (! искл. от логики «1» в одиночку)",
      "<i>Oba/obie</i> (оба/обе) ведут себя как «2», но различают род: <i>obaj bracia</i> (м.), <i>obie siostry</i> (ж.).",
      "Дробные и порядковые числительные (<i>pierwszy, drugi</i>) — это прилагательные, согласуются обычным образом.",
      "Для дат и времени используются порядковые числительные в Dopełniaczu: <i>pierwszego maja</i>, <i>dwudziestego stycznia</i>."
    ]}
  ],
  exercises: [
    { type: "choice", q: "Mam ___ (5, brat).", options: ["pięć braci", "pięć bracia", "pięciu bratów", "pięć braty"], answer: 0,
      explain: "5+ требует Dopełniacz мн.ч.: brat→braci (искл. форма) → <b>pięć braci</b>." },
    { type: "choice", q: "W pokoju są ___ (3, okno).", options: ["trzy okno", "trzy okien", "trzy okna", "trzech okien"], answer: 2,
      explain: "2,3,4 + средний род → форма как Mianownik мн.ч.: <b>trzy okna</b>." },
    { type: "choice", q: "Na ulicy widziałem ___ (4, kobieta).", options: ["cztery kobiet", "cztery kobiety", "czworo kobiet", "cztery kobieta"], answer: 1,
      explain: "2,3,4 + женский род → <b>cztery kobiety</b> (=Mianownik мн.ч.)." },
    { type: "choice", q: "Spotkanie jest ___ (21, marzec).", options: ["dwadzieścia jeden marca", "dwudziestego pierwszego marca", "dwadziesty pierwszy marca", "dwudziesta pierwsza marca"], answer: 1,
      explain: "Даты — порядковое числительное в Dopełniaczu: <b>dwudziestego pierwszego marca</b>." },
    { type: "choice", q: "___ (2) studentów nie przyszło na egzamin.", options: ["Dwa", "Dwóch", "Dwoje", "Dwiema"], answer: 1,
      explain: "Мужчины (osobowy) после «2» количественно → <b>dwóch</b> + Dopełniacz, глагол ср.р. ед.ч." }
  ]
},

/* ============================== 6. PRZYIMKI I ZAIMKI ============================== */
{
  id: "przyimki-zaimki",
  title: "Przyimki i zaimki",
  subtitle: "Предлоги с управлением падежами, местоимения",
  blocks: [
    { type: "text", html: `Каждый предлог требует определённого падежа (а некоторые — разных
      падежей в зависимости от значения: статика vs движение). Заучивать предлоги нужно сразу
      с падежом, который они требуют.` },
    { type: "table", caption: "Частые предлоги по падежам",
      head: ["Падеж", "Предлоги", "Пример"],
      rows: [
        ["Dopełniacz", "bez, do, od, z (откуда), dla, u, podczas, koło, obok, naprzeciwko, zamiast", "bez cukru, do domu, dla ciebie"],
        ["Celownik", "dzięki, wbrew, przeciwny", "dzięki tobie"],
        ["Biernik", "na/w/przez + движение, o (просьба), przez (причина)", "idę na pocztę, proszę o pomoc"],
        ["Narzędnik", "z (совместность), nad, pod, przed, za, między (статика)", "z przyjacielem, nad stołem"],
        ["Miejscownik", "w/na + статика, o (тема), przy, po", "w domu, o tobie, przy oknie"]
      ]
    },
    { type: "text", html: `<b>Личные местоимения</b> склоняются по тем же падежам и часто имеют
      краткие («энклитические») формы, которые предпочтительны в нейтральной речи.` },
    { type: "table", caption: "Личные местоимения по падежам (ja, ty, on)",
      head: ["Падеж", "ja", "ty", "on"],
      rows: [
        ["Mianownik", "ja", "ty", "on"],
        ["Dopełniacz", "mnie", "ciebie/cię", "jego/go"],
        ["Celownik", "mi/mnie", "ci/tobie", "mu/jemu"],
        ["Biernik", "mnie", "cię/ciebie", "go/jego"],
        ["Narzędnik", "mną", "tobą", "nim"],
        ["Miejscownik", "mnie", "tobie", "nim"]
      ]
    },
    { type: "exceptions", items: [
      "Предлог <i>w</i> перед словами, начинающимися на похожие согласные, меняется на <i>we</i>: <i>we wtorek</i>, а <i>z</i> → <i>ze</i>: <i>ze mną</i>.",
      "Краткая форма <i>go</i> (его) не используется в начале предложения — там нужна полная форма <i>jego</i>.",
      "После предлогов местоимение <i>on/ono/oni</i> в Narzędnik и Miejscownik получает <i>n-</i>: <i>z nim</i>, а не «z im»."
    ]}
  ],
  exercises: [
    { type: "choice", q: "Idę ___ (do) ___ (lekarz).", options: ["do lekarz", "do lekarza", "do lekarzowi", "do lekarzem"], answer: 1,
      explain: "<i>Do</i> + Dopełniacz → <b>do lekarza</b>." },
    { type: "choice", q: "Rozmawiamy ___ (o) ___ (nowy film).", options: ["o nowy film", "o nowym filmie", "o nowego filmu", "o nowym filmem"], answer: 1,
      explain: "<i>O</i> в значении темы + Miejscownik → <b>o nowym filmie</b>." },
    { type: "choice", q: "Ten prezent jest ___ (dla) ___ (ty).", options: ["dla ty", "dla tobą", "dla ciebie", "dla tobie"], answer: 2,
      explain: "<i>Dla</i> + Dopełniacz → местоимение <b>ciebie</b>." },
    { type: "choice", q: "Idziemy ___ (do) kina ___ (z) ___ (on).", options: ["z on", "z nim", "z jego", "z niego"], answer: 1,
      explain: "После предлога местоимение получает n-: <b>z nim</b>." },
    { type: "choice", q: "Mieszkam ___ (naprzeciwko) ___ (szkoła).", options: ["naprzeciwko szkoły", "naprzeciwko szkołę", "naprzeciwko szkole", "naprzeciwko szkoła"], answer: 0,
      explain: "<i>Naprzeciwko</i> + Dopełniacz → <b>naprzeciwko szkoły</b>." }
  ]
},

/* ============================== 7. ZDANIA ZŁOŻONE I SPÓJNIKI ============================== */
{
  id: "zdania-zlozone",
  title: "Zdania złożone",
  subtitle: "Союзы и сложные предложения",
  blocks: [
    { type: "text", html: `На письме и в говорении B1 ожидается умение связывать простые
      предложения союзами причины, условия, противопоставления и цели — это прямо влияет на оценку
      части pisanie.` },
    { type: "table", caption: "Основные союзы по функции",
      head: ["Функция", "Союзы", "Пример"],
      rows: [
        ["Причина", "bo, ponieważ, dlatego że", "Nie przyszedłem, ponieważ byłem chory."],
        ["Следствие", "więc, dlatego, zatem", "Było zimno, więc wzięłam kurtkę."],
        ["Условие", "jeśli, jeżeli, gdyby", "Jeśli będzie ładna pogoda, pójdziemy na plażę."],
        ["Противопоставление", "ale, jednak, natomiast, mimo że, chociaż", "Chciałem przyjść, ale nie miałem czasu."],
        ["Цель", "aby, żeby, w celu", "Uczę się polskiego, żeby zdać egzamin."],
        ["Время", "kiedy, gdy, zanim, odkąd, dopóki", "Zanim wyjdziesz, zamknij okno."]
      ]
    },
    { type: "text", html: `<b>Условные предложения (tryb warunkowy)</b> на B1 встречаются часто.
      Реальное условие — обычный индикатив (<i>jeśli + наст./буд. время</i>). Гипотетическое/нереальное —
      условное наклонение с частицей <i>by</i>: <i>gdybym miał czas, poszedłbym</i> (если бы у меня было время, я бы пошёл).` },
    { type: "exceptions", items: [
      "После <i>mimo że</i> и <i>chociaż</i> — обычный индикатив, а не условное наклонение (частая ошибка по аналогии с русским).",
      "<i>Żeby</i> требует условного наклонения, если подлежащие в главном и придаточном разные: <i>Chcę, żebyś przyszedł</i> (а не «żebyś przyjdziesz»).",
      "Частица <i>by</i> в условном наклонении присоединяется к личным окончаниям и может «отрываться» от глагола и крепиться к другому слову в предложении для акцента: <i>Czy poszedłbyś ze mną?</i> = <i>Czy byś poszedł ze mną?</i>"
    ]}
  ],
  exercises: [
    { type: "choice", q: "Nie zdałem egzaminu, ___ się nie uczyłem.", options: ["więc", "ponieważ", "żeby", "jeśli"], answer: 1,
      explain: "Причина → <b>ponieważ</b>." },
    { type: "choice", q: "___ miał więcej czasu, nauczyłby się lepiej.", options: ["Jeśli", "Gdyby", "Ponieważ", "Mimo że"], answer: 1,
      explain: "Нереальное/гипотетическое условие → условное наклонение с <b>Gdyby</b>." },
    { type: "choice", q: "Chcę, ___ przyszedł na czas.", options: ["żebyś", "że", "więc", "jeśli"], answer: 0,
      explain: "Разные подлежащие + цель/желание → <b>żebyś</b> + условное наклонение." },
    { type: "choice", q: "___ było zimno, poszliśmy na spacer.", options: ["Gdyby", "Mimo że", "Żeby", "Dlatego"], answer: 1,
      explain: "Противопоставление с реальным фактом → обычный индикатив с <b>Mimo że</b>." }
  ]
}

]; // KONIEC GRAMMAR
