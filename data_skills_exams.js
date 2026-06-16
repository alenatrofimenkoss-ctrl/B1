/* ===================================================================
   POLSKI B1 — DANE: inne sekcje (заглушки, наращиваются в след. сообщениях)
   =================================================================== */

const SKILLS = {
  czytanie: {
    title: "Czytanie",
    subtitle: "Понимание текста при чтении",
    ready: false,
    texts: []
  },
  sluchanie: {
    title: "Słuchanie",
    subtitle: "Понимание на слух",
    ready: false,
    texts: []
  },
  pisanie: {
    title: "Pisanie",
    subtitle: "Письмо (формальное / неформальное)",
    ready: false,
    templates: []
  },
  mowienie: {
    title: "Mówienie",
    subtitle: "Устная часть экзамена",
    ready: false,
    topics: []
  }
};

const EXAM_VERSIONS = [
  // 15 полных вариантов экзамена будут добавлены сюда поэтапно.
  // Структура одного варианта:
  // { id:1, grammar:[...], reading:{...}, listening:{...}, writing:{...}, speaking:{...} }
];
