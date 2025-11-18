/* =========================================================
   MENU LATERAL
========================================================= */
const menuItems = document.querySelectorAll(".menu-item");
const btnExpand = document.querySelector("#btn-exp");
const menuSide = document.querySelector(".side-menu");

// Marca item selecionado
menuItems.forEach(item => {
  item.addEventListener("click", function () {
    menuItems.forEach(i => i.classList.remove("active"));
    this.classList.add("active");
  });
});


/* =========================================================
   CAMPOS EDITÁVEIS + LOCALSTORAGE
========================================================= */
const editBtn = document.getElementById("editBtn");
let isEditing = false;

// Carregar dados salvos
window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("empresaData"));
  if (savedData) {
    Object.entries(savedData).forEach(([key, value]) => {
      const span = document.querySelector(`.field[data-key="${key}"]`);
      if (span) span.textContent = value;
    });
  }
});

// Modo edição
editBtn.addEventListener("click", () => {
  if (!isEditing) {
    ativarEdicao();
  } else {
    salvarEdicao();
  }

  isEditing = !isEditing;
});

function ativarEdicao() {
  document.querySelectorAll(".field").forEach(span => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.placeholder = "Digite aqui...";
    input.dataset.key = span.dataset.key;
    span.replaceWith(input);
  });

  editBtn.innerHTML = `<i class="bi bi-save"></i>`;
}

function salvarEdicao() {
  const dadosAtualizados = {};

  document.querySelectorAll('input[data-key]').forEach(input => {
    const span = document.createElement("span");
    span.className = "field";
    span.dataset.key = input.dataset.key;
    span.textContent = input.value;

    dadosAtualizados[input.dataset.key] = input.value;
    input.replaceWith(span);
  });

  localStorage.setItem("empresaData", JSON.stringify(dadosAtualizados));

  editBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;
}


/* =========================================================
   LOGO DINÂMICO (AJUSTADO PARA O NOVO HTML)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const logoImg = document.getElementById("companyLogo");
  const logoInput = document.getElementById("logoInput");
  const changeLogoBtn = document.querySelector(".change-logo");

  // Carregar do localStorage
  const savedLogo = localStorage.getItem("empresaLogo");
  if (savedLogo) logoImg.src = savedLogo;

  // Ao clicar na área "Alterar logo"
  changeLogoBtn.addEventListener("click", () => {
    logoInput.click();
  });

  // Ao selecionar arquivo
  logoInput.addEventListener("change", () => {
    const file = logoInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      const dataURL = e.target.result;

      logoImg.src = dataURL;
      localStorage.setItem("empresaLogo", dataURL);
    };

    reader.readAsDataURL(file);
  });
});


/* =========================================================
   KANBAN
========================================================= */
const addColumnBtn = document.getElementById("addColumnBtn");
const kanbanColumns = document.getElementById("kanbanColumns");

addColumnBtn.addEventListener("click", () => {
  const column = criarColuna();
  kanbanColumns.appendChild(column);
});

function criarColuna() {
  const column = document.createElement("div");
  column.className = "kanban-column";
  column.innerHTML = `
    <div class="column-header">
      <input class="column-title" value="Nova Coluna" />
      <button class="delete-column" title="Excluir coluna">🗑️</button>
    </div>
    <div class="tasks"></div>
    <button class="add-task-btn">+ Adicionar Quadro</button>
  `;

  const deleteBtn = column.querySelector(".delete-column");
  const tasksContainer = column.querySelector(".tasks");
  const addTaskBtn = column.querySelector(".add-task-btn");

  deleteBtn.addEventListener("click", () => column.remove());

  addTaskBtn.addEventListener("click", () => adicionarTask(tasksContainer));

  tasksContainer.addEventListener("dragover", e => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const totalTasks = tasksContainer.querySelectorAll(".task").length;

    if (dragging && totalTasks < 5) {
      tasksContainer.appendChild(dragging);
    }
  });

  return column;
}

function adicionarTask(container) {
  if (container.querySelectorAll(".task").length >= 5) {
    alert("Máximo de 5 quadros por coluna atingido.");
    return;
  }

  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;

  task.innerHTML = `
    <div class="task-content" contenteditable="true">Novo Quadro</div>
    <button class="delete-task" title="Excluir quadro">🗑️</button>
  `;

  task.querySelector(".delete-task").addEventListener("click", () => task.remove());

  task.addEventListener("dragstart", () => task.classList.add("dragging"));
  task.addEventListener("dragend", () => task.classList.remove("dragging"));

  container.appendChild(task);
}


/* =========================================================
   CALENDÁRIO + EVENTOS
========================================================= */
const mesSelect = document.getElementById("mesSelect");
const anoSelect = document.getElementById("anoSelect");
const calendarGrid = document.getElementById("calendarGrid");

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

let eventos = {};

document.addEventListener("DOMContentLoaded", () => {
  carregarEventosLocal();
  preencherSelects();
  initCalendar();

  mesSelect.addEventListener("change", atualizarCalendario);
  anoSelect.addEventListener("change", atualizarCalendario);
});


// Preenche selects
function preencherSelects() {
  meses.forEach((mes, i) => {
    mesSelect.innerHTML += `<option value="${i + 1}">${mes}</option>`;
  });

  const anoAtual = new Date().getFullYear();
  for (let ano = anoAtual - 10; ano <= anoAtual + 10; ano++) {
    anoSelect.innerHTML += `<option value="${ano}">${ano}</option>`;
  }
}

function initCalendar() {
  const hoje = new Date();
  mesSelect.value = hoje.getMonth() + 1;
  anoSelect.value = hoje.getFullYear();

  gerarDias(hoje.getMonth() + 1, hoje.getFullYear());
  atualizarEventos();
}

function atualizarCalendario() {
  gerarDias(parseInt(mesSelect.value), parseInt(anoSelect.value));
  atualizarEventos();
}

function gerarDias(mes, ano) {
  calendarGrid.innerHTML = "";

  const primeiroDia = new Date(ano, mes - 1, 1).getDay();
  const totalDias = new Date(ano, mes, 0).getDate();

  for (let i = 0; i < primeiroDia; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = dia;
    div.dataset.day = dia;

    calendarGrid.appendChild(div);
  }
}

function atualizarEventos() {
  const dias = document.querySelectorAll(".day");
  const mes = mesSelect.value;
  const ano = anoSelect.value;

  dias.forEach(dia => {
    const data = `${ano}-${mes.padStart(2, "0")}-${String(dia.dataset.day).padStart(2, "0")}`;

    dia.classList.remove("event-day");
    dia.removeEventListener("click", exibirDescricaoEvento);

    if (eventos[data]) {
      dia.classList.add("event-day");
      dia.title = eventos[data];
      dia.addEventListener("click", exibirDescricaoEvento);
    }
  });
}

function exibirDescricaoEvento(e) {
  const element = e.currentTarget;
  const mes = mesSelect.value;
  const ano = anoSelect.value;
  const dia = element.dataset.day;

  const data = `${ano}-${mes.padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  showToast(`📅 Evento em ${data}<br>${eventos[data]}`);
}

function salvarEventosLocal() {
  localStorage.setItem("eventosCalendario", JSON.stringify(eventos));
}

function carregarEventosLocal() {
  try {
    eventos = JSON.parse(localStorage.getItem("eventosCalendario")) || {};
  } catch {
    eventos = {};
  }
}

/* =========================================================
   MODAL DE EVENTOS
========================================================= */
const modal = document.getElementById("eventModal");
const openModalBtn = document.getElementById("openEventModal");
const closeModalBtn = document.getElementById("closeModal");
const eventForm = document.getElementById("eventForm");

openModalBtn.addEventListener("click", e => {
  e.preventDefault();
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

eventForm.addEventListener("submit", e => {
  e.preventDefault();

  const date = document.getElementById("eventDate").value;
  const title = document.getElementById("eventTitle").value;

  if (!date || !title) return;

  eventos[date] = title;
  salvarEventosLocal();

  modal.style.display = "none";
  eventForm.reset();

  atualizarEventos();
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerHTML = message;
  toast.className = "show";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 4000);
}