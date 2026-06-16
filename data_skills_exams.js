/* ===================================================================
   POLSKI B1 — DANE: inne sekcje (заглушки, наращиваются в след. сообщениях)
   =================================================================== */

const SKILLS = {
  czytanie: {
    title: "Czytanie",
    subtitle: "Понимание текста при чтении",
    ready: true,
    generator: generateCzytanieTest,
    testCount: CZYTANIE_TEST_COUNT
  },
  sluchanie: {
    title: "Słuchanie",
    subtitle: "Понимание на слух",
    ready: true,
    generator: generateSluchanieTest,
    testCount: SLUCHANIE_TEST_COUNT
  },
  pisanie: {
    title: "Pisanie",
    subtitle: "Письмо (формальное / неформальное)",
    ready: true,
    tasks: WRITING_TASKS,
    criteria: WRITING_EVALUATION_CRITERIA
  },
  mowienie: {
    title: "Mówienie",
    subtitle: "Устная часть экзамена",
    ready: true,
    tasks: SPEAKING_TASKS,
    criteria: SPEAKING_EVALUATION_CRITERIA
  }
};

const EXAM_VERSIONS = [
  // 15 полных вариантов экзамена будут добавлены сюда поэтапно.
  // Структура одного варианта:
  // { id:1, grammar:[...], reading:{...}, listening:{...}, writing:{...}, speaking:{...} }
];
