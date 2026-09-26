(function () {
  const moduleListEl = document.getElementById("module-list");
  const exCountEl = document.getElementById("ex-count");
  const exTitleEl = document.getElementById("ex-title");
  const exTaglineEl = document.getElementById("ex-tagline");
  const exInstructionsEl = document.getElementById("ex-instructions");
  const hintPanelEl = document.getElementById("hint-panel");
  const hintBtn = document.getElementById("hint-btn");
  const resetBtn = document.getElementById("reset-btn");
  const runBtn = document.getElementById("run-btn");
  const codeEditor = document.getElementById("code-editor");
  const lineNumbersEl = document.getElementById("line-numbers");
  const consoleOutputEl = document.getElementById("console-output");
  const clearConsoleBtn = document.getElementById("clear-console");
  const varCounterEl = document.getElementById("var-counter");

  const STORAGE_PREFIX = "js-practice-lab:";
  let currentIndex = 0;
  const completed = new Set(loadCompleted());

  function loadCompleted() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_PREFIX + "completed") || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveCompleted() {
    try {
      localStorage.setItem(STORAGE_PREFIX + "completed", JSON.stringify([...completed]));
    } catch (e) {}
  }

  function codeStorageKey(id) {
    return STORAGE_PREFIX + "code:" + id;
  }

  function loadSavedCode(ex) {
    try {
      return localStorage.getItem(codeStorageKey(ex.id));
    } catch (e) {
      return null;
    }
  }

  function saveCode(ex, code) {
    try {
      localStorage.setItem(codeStorageKey(ex.id), code);
    } catch (e) {}
  }

  function renderModuleList() {
    moduleListEl.innerHTML = "";
    EXERCISES.forEach((ex, i) => {
      const btn = document.createElement("button");
      btn.className = "module-item" + (i === currentIndex ? " active" : "") + (completed.has(ex.id) ? " done" : "");
      btn.innerHTML = `
        <span class="module-index">${completed.has(ex.id) ? "✓" : i + 1}</span>
        <span class="module-copy">
          <strong>${ex.title}</strong>
          <span>${ex.tagline}</span>
        </span>
      `;
      btn.addEventListener("click", () => loadExercise(i));
      moduleListEl.appendChild(btn);
    });
  }

  function countVariables(code) {
    const matches = code.match(/\b(?:let|const)\s+[A-Za-z_$][\w$]*/g);
    return matches ? matches.length : 0;
  }

  function updateVarCounter(code) {
    const n = countVariables(code);
    varCounterEl.textContent = `${n} variable${n === 1 ? "" : "s"} in use`;
  }

  function syncLineNumbers() {
    const lines = codeEditor.value.split("\n").length;
    let out = "";
    for (let i = 1; i <= lines; i++) out += i + "\n";
    lineNumbersEl.textContent = out;
  }

  function syncScroll() {
    lineNumbersEl.scrollTop = codeEditor.scrollTop;
  }

  function loadExercise(index) {
    currentIndex = index;
    const ex = EXERCISES[index];

    exCountEl.textContent = `Exercise ${index + 1} of ${EXERCISES.length}`;
    exTitleEl.textContent = ex.title;
    exTaglineEl.textContent = ex.tagline;

    exInstructionsEl.innerHTML =
      "<ol>" + ex.instructions.map((line) => `<li>${line}</li>`).join("") + "</ol>";

    hintPanelEl.innerHTML = ex.hint;
    hintPanelEl.hidden = true;
    hintBtn.textContent = "Show hint";

    const saved = loadSavedCode(ex);
    codeEditor.value = saved !== null ? saved : ex.starterCode;
    syncLineNumbers();
    updateVarCounter(codeEditor.value);

    resetConsole();
    renderModuleList();
  }

  function resetConsole() {
    consoleOutputEl.innerHTML = '<p class="console-placeholder">Click <strong>Run code</strong> to see what your program prints here.</p>';
  }

  function formatValue(v) {
    if (typeof v === "string") return v;
    try {
      return JSON.stringify(v, null, 2);
    } catch (e) {
      return String(v);
    }
  }

  function appendConsoleLine(kind, text) {
    if (consoleOutputEl.querySelector(".console-placeholder")) {
      consoleOutputEl.innerHTML = "";
    }
    const row = document.createElement("div");
    row.className = "console-line " + kind;
    row.innerHTML = `<span class="gutter">›</span><span class="value"></span>`;
    row.querySelector(".value").textContent = text;
    consoleOutputEl.appendChild(row);
    consoleOutputEl.scrollTop = consoleOutputEl.scrollHeight;
  }

  function runCode() {
    const code = codeEditor.value;
    saveCode(EXERCISES[currentIndex], code);
    resetConsole();
    consoleOutputEl.innerHTML = "";

    const fakeConsole = {
      log: (...args) => {
        const text = args.map(formatValue).join(" ");
        appendConsoleLine("log", text);
      },
    };

    try {
      const runner = new Function("console", code);
      runner(fakeConsole);
      if (!consoleOutputEl.children.length) {
        appendConsoleLine("error", "No output yet — did you forget to call console.log(...)?");
      } else {
        completed.add(EXERCISES[currentIndex].id);
        saveCompleted();
        renderModuleList();
      }
    } catch (err) {
      appendConsoleLine("error", err.message);
    }
  }

  runBtn.addEventListener("click", runCode);

  resetBtn.addEventListener("click", () => {
    const ex = EXERCISES[currentIndex];
    codeEditor.value = ex.starterCode;
    saveCode(ex, ex.starterCode);
    syncLineNumbers();
    updateVarCounter(codeEditor.value);
    resetConsole();
  });

  hintBtn.addEventListener("click", () => {
    hintPanelEl.hidden = !hintPanelEl.hidden;
    hintBtn.textContent = hintPanelEl.hidden ? "Show hint" : "Hide hint";
  });

  clearConsoleBtn.addEventListener("click", resetConsole);

  codeEditor.addEventListener("input", () => {
    syncLineNumbers();
    updateVarCounter(codeEditor.value);
  });
  codeEditor.addEventListener("scroll", syncScroll);

  codeEditor.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = codeEditor.selectionStart;
      const end = codeEditor.selectionEnd;
      codeEditor.value = codeEditor.value.slice(0, start) + "  " + codeEditor.value.slice(end);
      codeEditor.selectionStart = codeEditor.selectionEnd = start + 2;
      syncLineNumbers();
    }
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      runCode();
    }
  });

  renderModuleList();
  loadExercise(0);
})();
