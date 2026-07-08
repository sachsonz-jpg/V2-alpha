(function () {
  const views = Array.from(document.querySelectorAll("[data-view-panel]"));
  const dockButtons = Array.from(document.querySelectorAll("[data-view]"));
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !message) return;
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 1800);
  }

  function openView(name) {
    views.forEach((view) => {
      view.classList.toggle("active", view.dataset.viewPanel === name);
    });
    dockButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.view === name);
    });
  }

  dockButtons.forEach((button) => {
    button.addEventListener("click", () => openView(button.dataset.view));
  });

  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => openView(button.dataset.open));
  });

  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.toast));
  });

  const taskList = document.getElementById("task-list");
  const taskCount = document.getElementById("task-count");

  function updateTaskCount() {
    if (!taskList || !taskCount) return;
    const remaining = taskList.querySelectorAll(".task-item:not(.done)").length;
    taskCount.textContent = `${remaining} left`;
  }

  if (taskList) {
    taskList.addEventListener("click", (event) => {
      const task = event.target.closest("[data-task]");
      if (!task) return;
      task.classList.toggle("done");
      updateTaskCount();
    });
  }

  let remainingSeconds = 25 * 60;
  let timerId = null;
  const timerValue = document.getElementById("timer-value");
  const timerToggle = document.getElementById("timer-toggle");
  const timerReset = document.getElementById("timer-reset");

  function renderTimer() {
    if (!timerValue) return;
    const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, "0");
    const seconds = (remainingSeconds % 60).toString().padStart(2, "0");
    timerValue.textContent = `${minutes}:${seconds}`;
  }

  function stopTimer() {
    window.clearInterval(timerId);
    timerId = null;
    if (timerToggle) timerToggle.textContent = "Start";
  }

  if (timerToggle) {
    timerToggle.addEventListener("click", () => {
      if (timerId) {
        stopTimer();
        return;
      }
      timerToggle.textContent = "Pause";
      timerId = window.setInterval(() => {
        remainingSeconds = Math.max(0, remainingSeconds - 1);
        renderTimer();
        if (remainingSeconds === 0) {
          stopTimer();
          showToast("Focus session complete");
        }
      }, 1000);
    });
  }

  if (timerReset) {
    timerReset.addEventListener("click", () => {
      stopTimer();
      remainingSeconds = 25 * 60;
      renderTimer();
    });
  }

  const paletteName = document.getElementById("palette-name");
  document.querySelectorAll("#palette-swatches .swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      document.querySelectorAll("#palette-swatches .swatch").forEach((item) => item.classList.remove("active"));
      swatch.classList.add("active");
      if (paletteName) paletteName.textContent = swatch.dataset.name;
    });
  });

  const launcherSearch = document.getElementById("launcher-search");
  const appCards = Array.from(document.querySelectorAll(".app-card"));
  const launcherFilters = document.getElementById("launcher-filters");
  let activeFilter = "all";

  function renderApps() {
    const query = (launcherSearch?.value || "").trim().toLowerCase();
    appCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const matchesSearch = text.includes(query);
      const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
      card.hidden = !matchesSearch || !matchesFilter;
    });
  }

  launcherSearch?.addEventListener("input", renderApps);

  launcherFilters?.addEventListener("click", (event) => {
    const filter = event.target.closest("[data-filter]");
    if (!filter) return;
    activeFilter = filter.dataset.filter;
    launcherFilters.querySelectorAll("[data-filter]").forEach((button) => button.classList.remove("active"));
    filter.classList.add("active");
    renderApps();
  });

  const appDestinations = {
    Aperture: "board",
    Library: "files",
    Mood: "board",
    Spectrum: "settings",
    Typeset: "board"
  };

  appCards.forEach((card) => {
    card.addEventListener("click", () => {
      const app = card.dataset.app;
      if (appDestinations[app]) {
        openView(appDestinations[app]);
      }
      showToast(`${app} opened`);
    });
  });

  const filesWindow = document.querySelector(".files-window");
  const gridView = document.getElementById("grid-view");
  const listView = document.getElementById("list-view");
  const folderName = document.getElementById("folder-name");
  const fileLocation = document.getElementById("file-location");

  gridView?.addEventListener("click", () => {
    filesWindow?.classList.remove("list-mode");
    gridView.classList.add("active");
    listView?.classList.remove("active");
  });

  listView?.addEventListener("click", () => {
    filesWindow?.classList.add("list-mode");
    listView.classList.add("active");
    gridView?.classList.remove("active");
  });

  document.querySelectorAll(".file-sidebar button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".file-sidebar button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      if (folderName) folderName.textContent = button.dataset.folder;
      if (fileLocation) fileLocation.textContent = button.dataset.folder;
      showToast(`${button.dataset.folder} selected`);
    });
  });

  document.querySelectorAll(".file-card, .file-list button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".file-card, .file-list button").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      const name = button.querySelector("strong")?.textContent || "File";
      showToast(`${name} selected`);
    });
  });

  const boardLabel = document.getElementById("board-label");
  const selectionTitle = document.getElementById("selection-title");
  const selectionCopy = document.getElementById("selection-copy");
  const canvas = document.getElementById("canvas");
  const addBoardCard = document.getElementById("add-board-card");
  let noteCount = 1;

  function selectCanvasCard(card) {
    document.querySelectorAll(".canvas-card").forEach((item) => item.classList.remove("selected"));
    card.classList.add("selected");
    const title = card.dataset.title || "Canvas item";
    if (selectionTitle) selectionTitle.textContent = title;
    if (selectionCopy) selectionCopy.textContent = "Canvas item / Aperture Vol.3 / editable";
  }

  document.querySelectorAll(".board-sidebar button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".board-sidebar button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      if (boardLabel) boardLabel.textContent = `${button.dataset.board} board`;
      showToast(`${button.dataset.board} board opened`);
    });
  });

  function enableCard(card) {
    card.addEventListener("click", () => selectCanvasCard(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCanvasCard(card);
      }
    });
    card.addEventListener("pointerdown", (event) => {
      if (!canvas) return;
      selectCanvasCard(card);
      card.setPointerCapture(event.pointerId);
      const canvasBox = canvas.getBoundingClientRect();
      const cardBox = card.getBoundingClientRect();
      const offsetX = event.clientX - cardBox.left;
      const offsetY = event.clientY - cardBox.top;

      function move(pointerEvent) {
        const maxX = canvas.clientWidth - card.offsetWidth - 24;
        const maxY = canvas.clientHeight - card.offsetHeight - 24;
        const x = Math.min(Math.max(24, pointerEvent.clientX - canvasBox.left - offsetX), maxX);
        const y = Math.min(Math.max(24, pointerEvent.clientY - canvasBox.top - offsetY), maxY);
        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
      }

      function stop() {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerup", stop);
        card.removeEventListener("pointercancel", stop);
      }

      card.addEventListener("pointermove", move);
      card.addEventListener("pointerup", stop);
      card.addEventListener("pointercancel", stop);
    });
  }

  document.querySelectorAll(".canvas-card").forEach(enableCard);

  addBoardCard?.addEventListener("click", () => {
    if (!canvas) return;
    noteCount += 1;
    const card = document.createElement("article");
    card.className = "canvas-card note-card";
    card.tabIndex = 0;
    card.dataset.title = `New note ${noteCount}`;
    card.style.setProperty("--x", `${110 + noteCount * 18}px`);
    card.style.setProperty("--y", `${120 + noteCount * 22}px`);
    card.innerHTML = `<p>New direction note. Edit content in the project manager.</p><footer>Note ${noteCount}</footer>`;
    canvas.appendChild(card);
    enableCard(card);
    selectCanvasCard(card);
    showToast("Note added");
  });

  document.querySelectorAll(".theme-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.body.dataset.theme = card.dataset.theme;
      document.querySelectorAll(".theme-card").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
    });
  });

  document.querySelectorAll(".accent").forEach((button) => {
    button.addEventListener("click", () => {
      document.documentElement.style.setProperty("--accent", button.dataset.accent);
      document.querySelectorAll(".accent").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  document.querySelectorAll(".switch").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(next));
      button.classList.toggle("on", next);
    });
  });

  document.addEventListener("keydown", (event) => {
    const isCommandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
    if (!isCommandK) return;
    event.preventDefault();
    openView("launcher");
    window.setTimeout(() => launcherSearch?.focus(), 50);
  });

  renderTimer();
  updateTaskCount();
})();
