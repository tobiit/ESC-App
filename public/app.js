const socket = io();

const state = {
  participantId: null,
  groupId: null,
  currentPerson: null,
  images: [],
  imageIndex: 0,
  zoomed: false
};

const views = {
  login: document.getElementById("login"),
  waiting: document.getElementById("waiting"),
  quiz: document.getElementById("quiz"),
  results: document.getElementById("results"),
  thanks: document.getElementById("thanks")
};

const joinBtn = document.getElementById("joinBtn");
const groupPassword = document.getElementById("groupPassword");
const nickname = document.getElementById("nickname");
const answerInput = document.getElementById("answerInput");
const submitAnswer = document.getElementById("submitAnswer");
const prevImg = document.getElementById("prevImg");
const nextImg = document.getElementById("nextImg");
const activeImg = document.getElementById("activeImg");
const imgCounter = document.getElementById("imgCounter");
const zoomToggle = document.getElementById("zoomToggle");
const countdown = document.getElementById("countdown");
const reveal = document.getElementById("reveal");
const resultsList = document.getElementById("resultsList");
const endQuiz = document.getElementById("endQuiz");

const showView = (key) => {
  Object.entries(views).forEach(([name, el]) => {
    el.classList.toggle("hidden", name !== key);
  });
};

const fetchJson = async (url, options = {}) => {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Request failed");
  }
  return res.json();
};

const updateGallery = () => {
  if (!state.images.length) {
    activeImg.src = "";
    imgCounter.textContent = "0 / 0";
    return;
  }
  const img = state.images[state.imageIndex];
  activeImg.src = img.url;
  imgCounter.textContent = `${state.imageIndex + 1} / ${state.images.length}`;
  activeImg.classList.toggle("zoomed", state.zoomed);
};

const setPerson = (payload) => {
  state.currentPerson = payload.person;
  state.images = payload.images || [];
  state.imageIndex = 0;
  state.zoomed = false;
  answerInput.value = "";
  reveal.classList.add("hidden");
  updateGallery();
  showView("quiz");
};

const renderResults = (items) => {
  resultsList.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "result-item";
    row.innerHTML = `
      <img src="${item.thumbUrl}" alt="${item.personName}" />
      <div>
        <strong>${item.personName}</strong>
      </div>
      <div class="muted">${item.answer || "-"}</div>
    `;
    resultsList.appendChild(row);
  });
};

joinBtn.addEventListener("click", async () => {
  try {
    const data = await fetchJson("/api/participant/join", {
      method: "POST",
      body: JSON.stringify({
        accessPassword: groupPassword.value.trim(),
        nickname: nickname.value.trim()
      })
    });
    state.participantId = data.participantId;
    state.groupId = data.groupId;
    socket.emit("join", { role: "participant", groupId: data.groupId, participantId: data.participantId });
    showView("waiting");
  } catch (err) {
    alert(err.message);
  }
});

submitAnswer.addEventListener("click", async () => {
  if (!state.currentPerson) return;
  try {
    await fetchJson("/api/participant/answer", {
      method: "POST",
      body: JSON.stringify({
        personId: state.currentPerson.id,
        answer: answerInput.value.trim()
      })
    });
  } catch (err) {
    alert(err.message);
  }
});

prevImg.addEventListener("click", () => {
  if (!state.images.length) return;
  state.imageIndex = (state.imageIndex - 1 + state.images.length) % state.images.length;
  updateGallery();
});

nextImg.addEventListener("click", () => {
  if (!state.images.length) return;
  state.imageIndex = (state.imageIndex + 1) % state.images.length;
  updateGallery();
});

zoomToggle.addEventListener("click", () => {
  state.zoomed = !state.zoomed;
  updateGallery();
});

endQuiz.addEventListener("click", async () => {
  await fetchJson("/api/participant/leave", { method: "POST" });
  showView("thanks");
});

socket.on("sessionStarted", (payload) => {
  setPerson(payload);
});

socket.on("personChanged", (payload) => {
  setPerson(payload);
  countdown.classList.add("hidden");
});

socket.on("reveal", (payload) => {
  reveal.textContent = `Auflosung: ${payload.personName}`;
  reveal.classList.remove("hidden");
});

socket.on("countdown", (payload) => {
  countdown.textContent = `${payload.seconds}s`;
  countdown.classList.remove("hidden");
  if (payload.seconds <= 0) {
    countdown.classList.add("hidden");
  }
});

socket.on("sessionEnded", async () => {
  const data = await fetchJson("/api/participant/results");
  renderResults(data.items);
  showView("results");
});

setInterval(() => {
  if (state.participantId) {
    socket.emit("heartbeat", { participantId: state.participantId });
  }
}, 60000);

const loadState = async () => {
  try {
    const data = await fetchJson("/api/participant/state");
    if (!data.loggedIn) {
      showView("login");
      return;
    }
    state.participantId = data.participantId;
    state.groupId = data.groupId;
    socket.emit("join", { role: "participant", groupId: data.groupId, participantId: data.participantId });
    if (data.status === "waiting") {
      showView("waiting");
    } else if (data.status === "running") {
      setPerson(data.current);
    } else if (data.status === "ended") {
      renderResults(data.items || []);
      showView("results");
    }
  } catch (err) {
    showView("login");
  }
};

loadState();
