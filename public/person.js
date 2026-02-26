const personTitle = document.getElementById("personTitle");
const refreshImages = document.getElementById("refreshImages");
const uploadInput = document.getElementById("uploadInput");
const uploadDropzone = document.getElementById("uploadDropzone");
const uploadQueue = document.getElementById("uploadQueue");
const uploadSubmit = document.getElementById("uploadSubmit");
const imageList = document.getElementById("imageList");

const params = new URLSearchParams(window.location.search);
const personId = params.get("id");

let uploadFiles = [];

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

const requireAdmin = async () => {
  try {
    const data = await fetchJson("/api/admin/me");
    if (!data.loggedIn) {
      window.location.href = "/admin.html";
      return false;
    }
    return true;
  } catch (err) {
    window.location.href = "/admin.html";
    return false;
  }
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
        <button class="btn ghost" data-action="delete">Loschen</button>
      </div>
    `;
    imageList.appendChild(card);
  });
};

const refreshImageList = async () => {
  if (!personId) return;
  const data = await fetchJson(`/api/admin/people/${personId}/images`);
  renderImageList(data.items);
};

const loadPerson = async () => {
  if (!personId) return;
  const data = await fetchJson(`/api/admin/people/${personId}`);
  personTitle.textContent = `Person bearbeiten: ${data.person.name}`;
};

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
  if (!personId) return;
  if (!uploadFiles.length) return;
  const orientations = Array.from(uploadQueue.querySelectorAll("select")).map((sel) => sel.value);
  const form = new FormData();
  uploadFiles.forEach((file) => form.append("images", file));
  orientations.forEach((o) => form.append("orientations", o));
  await fetch(`/api/admin/people/${personId}/images`, {
    method: "POST",
    body: form,
    credentials: "include"
  });
  uploadFiles = [];
  uploadInput.value = "";
  uploadQueue.innerHTML = "";
  await refreshImageList();
});

imageList.addEventListener("click", async (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;
  if (btn.dataset.action !== "delete") return;
  const card = btn.closest(".image-card");
  if (!card) return;
  await fetchJson(`/api/admin/images/${card.dataset.id}`, { method: "DELETE" });
  await refreshImageList();
});

refreshImages.addEventListener("click", refreshImageList);

const init = async () => {
  const ok = await requireAdmin();
  if (!ok) return;
  await loadPerson();
  await refreshImageList();
};

init();
