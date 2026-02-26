const socket = io();

const adminLogin = document.getElementById("adminLogin");
const adminApp = document.getElementById("adminApp");
const adminPassword = document.getElementById("adminPassword");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminLogout = document.getElementById("adminLogout");

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

const groupList = document.getElementById("groupList");
const newGroupName = document.getElementById("newGroupName");
const newGroupPassword = document.getElementById("newGroupPassword");
const createGroup = document.getElementById("createGroup");

const peopleList = document.getElementById("peopleList");
const newPersonName = document.getElementById("newPersonName");
const createPerson = document.getElementById("createPerson");

const assignGroup = document.getElementById("assignGroup");
const assignPeople = document.getElementById("assignPeople");

const uploadPerson = document.getElementById("uploadPerson");
const refreshImages = document.getElementById("refreshImages");
const uploadInput = document.getElementById("uploadInput");
const uploadDropzone = document.getElementById("uploadDropzone");
const uploadQueue = document.getElementById("uploadQueue");
const uploadSubmit = document.getElementById("uploadSubmit");
const imageList = document.getElementById("imageList");

const moderationGroup = document.getElementById("moderationGroup");
const autoSeconds = document.getElementById("autoSeconds");
const startAuto = document.getElementById("startAuto");
const startModerated = document.getElementById("startModerated");
const moderationStatus = document.getElementById("moderationStatus");
const revealBtn = document.getElementById("revealBtn");
const countdownBtn = document.getElementById("countdownBtn");
const nextBtn = document.getElementById("nextBtn");
const moderationResults = document.getElementById("moderationResults");

const sessionList = document.getElementById("sessionList");

let uploadFiles = [];
let peopleCache = [];

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

const showTab = (name) => {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === name));
  panels.forEach((panel) => panel.classList.toggle("hidden", panel.id !== `tab-${name}`));
};

const renderGroups = (groups) => {
  groupList.innerHTML = "";
  const currentAssignGroup = assignGroup.value;
  const currentModerationGroup = moderationGroup.value;
  assignGroup.innerHTML = "";
  moderationGroup.innerHTML = "";

  groups.forEach((group) => {
    const item = document.createElement("div");
    item.className = "list-item";
    const disabled = group.activeCount < 1;
    item.innerHTML = `
      <strong>${group.name}</strong>
      <div class="muted">Passwort: ${group.access_password}</div>
      <div>Teilnehmer aktiv: ${group.activeCount}</div>
      <div>Quiz lauft: ${group.running ? "Ja" : "Nein"}</div>
      <div>Status: ${group.activeCount > 0 ? "Aktiv" : "Inaktiv"}</div>
      <div class="row">
        <button class="btn ghost" data-action="rename" data-id="${group.id}">Umbenennen</button>
        <button class="btn ghost" data-action="regen" data-id="${group.id}">Passwort neu</button>
        <button class="btn ghost" data-action="set-pass" data-id="${group.id}">Passwort setzen</button>
        <button class="btn primary" data-action="auto" data-id="${group.id}" ${disabled ? "disabled" : ""}>Auto Start</button>
        <button class="btn ghost" data-action="moderated" data-id="${group.id}" ${disabled ? "disabled" : ""}>Moderiert Start</button>
      </div>
    `;
    groupList.appendChild(item);

    const option = document.createElement("option");
    option.value = group.id;
    option.textContent = group.name;
    assignGroup.appendChild(option);

    const option2 = document.createElement("option");
    option2.value = group.id;
    option2.textContent = group.name;
    moderationGroup.appendChild(option2);
  });

  if (currentAssignGroup) {
    assignGroup.value = currentAssignGroup;
  }
  if (currentModerationGroup) {
    moderationGroup.value = currentModerationGroup;
  }
};

const renderPeople = (people) => {
  peopleList.innerHTML = "";
  assignPeople.innerHTML = "";
  const currentUploadPerson = uploadPerson.value;
  uploadPerson.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Person wahlen";
  uploadPerson.appendChild(placeholder);

  people.forEach((person) => {
    const item = document.createElement("div");
    item.className = "list-item";
    item.dataset.person = person.id;
    const groupTags = (person.groups || [])
      .map(
        (group) =>
          `<span class="tag">
            ${group.name}
            <button class="tag-x" data-action="remove-from-group" data-person="${person.id}" data-group="${group.id}">x</button>
          </span>`
      )
      .join("");
    item.innerHTML = `
      <strong>${person.name}</strong>
      <div class="muted">${person.imageCount} Bilder</div>
      <div class="tag-list">${groupTags || "-"}</div>
      <div class="row">
        <button class="btn ghost" data-action="edit-person" data-id="${person.id}">Bearbeiten</button>
        <button class="btn ghost" data-action="delete-person" data-id="${person.id}">Loschen</button>
      </div>
    `;
    peopleList.appendChild(item);

    const option = document.createElement("option");
    option.value = person.id;
    option.textContent = person.name;
    uploadPerson.appendChild(option);

    // Assignment list is rendered separately based on selected group.
  });

  if (currentUploadPerson) {
    uploadPerson.value = currentUploadPerson;
  }
};

const renderAssignPeople = (groupId) => {
  assignPeople.innerHTML = "";
  if (!groupId) return;
  const unassigned = peopleCache.filter((person) => {
    const groups = person.groups || [];
    return !groups.some((group) => String(group.id) === String(groupId));
  });
  if (!unassigned.length) {
    const empty = document.createElement("div");
    empty.className = "list-item";
    empty.textContent = "Alle Menschen sind bereits zugeordnet.";
    assignPeople.appendChild(empty);
    return;
  }
  unassigned.forEach((person) => {
    const item = document.createElement("div");
    item.className = "list-item";
    item.innerHTML = `
      <strong>${person.name}</strong>
      <div class="row">
        <button class="btn primary" data-action="assign-to-group" data-person="${person.id}">Dieser Gruppe zuordnen</button>
      </div>
    `;
    assignPeople.appendChild(item);
  });
};

const renderUploadList = (list, files) => {
  list.innerHTML = "";
  files.forEach((file, index) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <span>${file.name}</span>
      <select data-index="${index}">
        <option value="portrait">Hochkant</option>
        <option value="landscape">Quer</option>
      </select>
    `;
    list.appendChild(row);
  });
};

const renderImageList = (items) => {
  imageList.innerHTML = "";
  items.forEach((img) => {
    const card = document.createElement("div");
    card.className = "image-card";
    card.dataset.id = img.id;
    card.innerHTML = `
      <img src="${img.url}" alt="Bild" />
      <div class="image-actions">
        <select data-action="orientation">
          <option value="portrait" ${img.orientation === "portrait" ? "selected" : ""}>Hochkant</option>
          <option value="landscape" ${img.orientation === "landscape" ? "selected" : ""}>Quer</option>
        </select>
        <button class="btn ghost" data-action="delete">Loschen</button>
      </div>
    `;
    imageList.appendChild(card);
  });
};

const renderSessions = (sessions) => {
  sessionList.innerHTML = "";
  sessions.forEach((session) => {
    const item = document.createElement("div");
    item.className = "list-item";
    item.innerHTML = `
      <strong>${session.groupName}</strong>
      <div class="muted">${session.mode} | ${session.state}</div>
      <div>Gestartet: ${new Date(session.started_at).toLocaleString()}</div>
      <div>Teilnehmer: ${session.participantCount}</div>
    `;
    sessionList.appendChild(item);
  });
};

const refresh = async () => {
  const groups = await fetchJson("/api/admin/groups");
  renderGroups(groups.items);

  const people = await fetchJson("/api/admin/people");
  peopleCache = people.items;
  renderPeople(peopleCache);
  renderAssignPeople(assignGroup.value);

  if (uploadPerson.value) {
    await refreshImageList();
  }

  const sessions = await fetchJson("/api/admin/sessions");
  renderSessions(sessions.items);
};

const checkAdminSession = async () => {
  try {
    const data = await fetchJson("/api/admin/me");
    if (data.loggedIn) {
      adminLogin.classList.add("hidden");
      adminApp.classList.remove("hidden");
      await refresh();
    }
  } catch (err) {
    // Stay on login screen when not authenticated.
  }
};

adminLoginBtn.addEventListener("click", async () => {
  try {
    await fetchJson("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password: adminPassword.value.trim() })
    });
    adminLogin.classList.add("hidden");
    adminApp.classList.remove("hidden");
    await refresh();
  } catch (err) {
    alert(err.message);
  }
});

adminLogout.addEventListener("click", async () => {
  await fetchJson("/api/admin/logout", { method: "POST" });
  adminApp.classList.add("hidden");
  adminLogin.classList.remove("hidden");
  adminPassword.value = "";
});

createGroup.addEventListener("click", async () => {
  await fetchJson("/api/admin/groups", {
    method: "POST",
    body: JSON.stringify({
      name: newGroupName.value.trim(),
      accessPassword: newGroupPassword.value.trim()
    })
  });
  newGroupName.value = "";
  newGroupPassword.value = "";
  await refresh();
});

createPerson.addEventListener("click", async () => {
  await fetchJson("/api/admin/people", {
    method: "POST",
    body: JSON.stringify({ name: newPersonName.value.trim() })
  });
  newPersonName.value = "";
  await refresh();
});

peopleList.addEventListener("click", async (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;
  if (btn.dataset.action === "edit-person") {
    const id = btn.dataset.id;
    window.location.href = `/person.html?id=${id}`;
    return;
  }
  if (btn.dataset.action === "remove-from-group") {
    const personId = btn.dataset.person;
    const groupId = btn.dataset.group;
    await fetchJson(`/api/admin/groups/${groupId}/people/${personId}`, { method: "DELETE" });
    await refresh();
    return;
  }
  if (btn.dataset.action === "delete-person") {
    const id = btn.dataset.id;
    const confirmed = window.confirm("Soll diese Person wirklich geloescht werden? Alle Bilder werden entfernt.");
    if (!confirmed) return;
    await fetchJson(`/api/admin/people/${id}`, { method: "DELETE" });
    await refresh();
  }
});

groupList.addEventListener("click", async (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === "rename") {
    const name = prompt("Neuer Name?");
    if (!name) return;
    await fetchJson(`/api/admin/groups/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name })
    });
  }
  if (btn.dataset.action === "regen") {
    await fetchJson(`/api/admin/groups/${id}/regen-password`, { method: "POST" });
  }
  if (btn.dataset.action === "set-pass") {
    const accessPassword = prompt("Neues Passwort (optional, sonst automatisch)");
    if (accessPassword === null) return;
    const normalized = accessPassword.trim().toLowerCase();
    if (!normalized) {
      alert("Bitte ein Passwort eingeben.");
      return;
    }
    await fetchJson(`/api/admin/groups/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ accessPassword: normalized })
    });
    const item = btn.closest(".list-item");
    const passwordLine = item?.querySelector(".muted");
    if (passwordLine) {
      passwordLine.textContent = `Passwort: ${normalized}`;
    }
  }
  if (btn.dataset.action === "auto") {
    try {
      const seconds = Number(prompt("Sekunden pro Person?", "30"));
      await fetchJson(`/api/admin/groups/${id}/start-auto`, {
        method: "POST",
        body: JSON.stringify({ seconds })
      });
    } catch (err) {
      alert(err.message);
    }
  }
  if (btn.dataset.action === "moderated") {
    try {
      await fetchJson(`/api/admin/groups/${id}/start-moderated`, { method: "POST" });
    } catch (err) {
      alert(err.message);
    }
  }
  await refresh();
});


const refreshImageList = async () => {
  if (!uploadPerson.value) {
    imageList.innerHTML = "";
    return;
  }
  const data = await fetchJson(`/api/admin/people/${uploadPerson.value}/images`);
  renderImageList(data.items);
};

assignGroup.addEventListener("change", () => {
  renderAssignPeople(assignGroup.value);
});

assignPeople.addEventListener("click", async (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;
  if (btn.dataset.action !== "assign-to-group") return;
  const groupId = assignGroup.value;
  if (!groupId) return;
  const personId = btn.dataset.person;
  try {
    await fetchJson(`/api/admin/groups/${groupId}/people/${personId}`, { method: "POST" });
    await refresh();
  } catch (err) {
    alert(err.message);
  }
});

startAuto.addEventListener("click", async () => {
  await fetchJson(`/api/admin/groups/${moderationGroup.value}/start-auto`, {
    method: "POST",
    body: JSON.stringify({ seconds: Number(autoSeconds.value) })
  });
});

startModerated.addEventListener("click", async () => {
  await fetchJson(`/api/admin/groups/${moderationGroup.value}/start-moderated`, {
    method: "POST" }
  );
  showTab("moderation");
});

uploadInput.addEventListener("change", () => {
  uploadFiles = Array.from(uploadInput.files);
  renderUploadList(uploadQueue, uploadFiles);
});

uploadDropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
});

uploadDropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  uploadFiles = Array.from(event.dataTransfer.files || []);
  uploadInput.value = "";
  renderUploadList(uploadQueue, uploadFiles);
});

uploadSubmit.addEventListener("click", async () => {
  if (!uploadPerson.value) return;
  if (!uploadFiles.length) return;
  const orientations = Array.from(uploadQueue.querySelectorAll("select")).map((sel) => sel.value);
  const form = new FormData();
  uploadFiles.forEach((file) => form.append("images", file));
  orientations.forEach((o) => form.append("orientations", o));
  await fetch(`/api/admin/people/${uploadPerson.value}/images`, {
    method: "POST",
    body: form,
    credentials: "include"
  });
  uploadFiles = [];
  uploadInput.value = "";
  uploadQueue.innerHTML = "";
  await refreshImageList();
  await refresh();
});

uploadPerson.addEventListener("change", refreshImageList);
refreshImages.addEventListener("click", refreshImageList);

imageList.addEventListener("change", async (event) => {
  const select = event.target.closest("select");
  if (!select) return;
  const card = select.closest(".image-card");
  if (!card) return;
  await fetchJson(`/api/admin/images/${card.dataset.id}`, {
    method: "PATCH",
    body: JSON.stringify({ orientation: select.value })
  });
  await refreshImageList();
});

imageList.addEventListener("click", async (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;
  const card = btn.closest(".image-card");
  if (!card) return;
  if (btn.dataset.action === "delete") {
    await fetchJson(`/api/admin/images/${card.dataset.id}`, { method: "DELETE" });
    await refreshImageList();
    await refresh();
  }
});

revealBtn.addEventListener("click", async () => {
  await fetchJson(`/api/admin/groups/${moderationGroup.value}/reveal`, { method: "POST" });
});

countdownBtn.addEventListener("click", async () => {
  await fetchJson(`/api/admin/groups/${moderationGroup.value}/countdown`, { method: "POST" });
});

nextBtn.addEventListener("click", async () => {
  await fetchJson(`/api/admin/groups/${moderationGroup.value}/next`, { method: "POST" });
});

const refreshModeration = async () => {
  if (!moderationGroup.value) return;
  const data = await fetchJson(`/api/admin/groups/${moderationGroup.value}/status`);
  moderationStatus.innerHTML = `
    <div>Teilnehmer: ${data.activeCount}</div>
    <div>Aktuelle Person: ${data.currentPerson || "-"}</div>
    <div>Eingaben: ${data.answersCount}</div>
    <div>Status: ${data.state}</div>
  `;
  moderationResults.innerHTML = "";
  if (data.results?.length) {
    data.results.forEach((row) => {
      const item = document.createElement("div");
      item.className = "list-item";
      item.textContent = `${row.participant}: ${row.person} -> ${row.answer}`;
      moderationResults.appendChild(item);
    });
  }
};

moderationGroup.addEventListener("change", refreshModeration);

setInterval(async () => {
  if (!adminApp.classList.contains("hidden")) {
    await refresh();
    await refreshModeration();
  }
}, 5000);

socket.on("connect", () => {
  socket.emit("join", { role: "admin" });
});

socket.on("groupStatus", async () => {
  await refresh();
  await refreshModeration();
});

showTab("groups");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => showTab(tab.dataset.tab));
});

checkAdminSession();
