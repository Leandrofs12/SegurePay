const editBtn = document.getElementById('editBtn');
let isEditing = false;


var menuItem = document.querySelectorAll( '.menu-item')

function selectLink(){
    menuItem.forEach((item)=>
        item.classList.remove('active')
    )
    this.classList.add('active')
}

menuItem.forEach((item)=>
    item.addEventListener('click', selectLink)
)
var btnExp = document.querySelector('#btn-exp')
var menuSide = document.querySelector('.side-menu')

btnExp.addEventListener('click', function(){
    menuSide.classList.toggle('expand')
})



window.addEventListener('DOMContentLoaded', () => {
  const savedData = JSON.parse(localStorage.getItem('empresaData'));
  if (savedData) {
    Object.keys(savedData).forEach(key => {
      const span = document.querySelector(`.field[data-key="${key}"]`);
      if (span) span.textContent = savedData[key];
    });
  }
});

editBtn.addEventListener('click', () => {
  if (!isEditing) {

    document.querySelectorAll('.field').forEach(span => {
      const value = span.textContent;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = value;
      input.placeholder = 'Digite aqui...';
      input.setAttribute('data-key', span.dataset.key);
      span.replaceWith(input);
    });
    editBtn.innerHTML = '<i class="bi bi-save"></i>';
  } else {

    const updatedData = {};
    document.querySelectorAll('input[data-key]').forEach(input => {
      const value = input.value;
      const key = input.dataset.key;
      updatedData[key] = value;

      const span = document.createElement('span');
      span.className = 'field';
      span.dataset.key = key;
      span.textContent = value;
      input.replaceWith(span);
    });

    localStorage.setItem('empresaData', JSON.stringify(updatedData));

    editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
  }

  isEditing = !isEditing;
});

document.addEventListener("DOMContentLoaded", function () {
    const logoImg = document.querySelector(".card-img");
    const logoInput = document.getElementById("logoInput");

    const savedLogo = localStorage.getItem("empresaLogo");
    if (savedLogo) {
        logoImg.src = savedLogo;
    }

    logoInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const dataURL = e.target.result;
                logoImg.src = dataURL;
                localStorage.setItem("empresaLogo", dataURL);
            };
            reader.readAsDataURL(file);
        }
    });
});

addColumnBtn.addEventListener("click", () => {
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

  column.querySelector(".delete-column").addEventListener("click", () => {
    column.remove();
  });

  const tasksContainer = column.querySelector(".tasks");
  const addTaskBtn = column.querySelector(".add-task-btn");

  addTaskBtn.addEventListener("click", () => {
    const currentTasks = tasksContainer.querySelectorAll(".task");
    if (currentTasks.length >= 5) {
      alert("Máximo de 5 quadros por coluna atingido.");
      return;
    }

    const task = document.createElement("div");
  task.className = "task";
  task.setAttribute("draggable", "true");

  
  task.innerHTML = `
  <div contenteditable="true" class="task-content">Novo Quadro</div>
  <button class="delete-task" title="Excluir quadro">🗑️</button>
`;

  
  task.querySelector(".delete-task").addEventListener("click", () => {
  task.remove();
  });


task.addEventListener("dragstart", () => {
  task.classList.add("dragging");
});
task.addEventListener("dragend", () => {
  task.classList.remove("dragging");
});

tasksContainer.appendChild(task);


    // Drag and Drop
    task.setAttribute("draggable", "true");
    task.addEventListener("dragstart", () => {
      task.classList.add("dragging");
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("dragging");
    });

    tasksContainer.appendChild(task);
  });

  tasksContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingTask = document.querySelector(".dragging");
    const currentTasks = tasksContainer.querySelectorAll(".task");

    if (draggingTask && !tasksContainer.contains(draggingTask)) {
      if (currentTasks.length < 3) {
        tasksContainer.appendChild(draggingTask);
      }
    }
  });

  kanbanColumns.appendChild(column);
});

const mesSelect = document.getElementById('mesSelect');
const anoSelect = document.getElementById('anoSelect');
const calendarGrid = document.getElementById('calendarGrid');

const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril',
  'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

function preencherSelects() {
  meses.forEach((mes, i) => {
    const option = document.createElement('option');
    option.value = i + 1;
    option.textContent = mes;
    mesSelect.appendChild(option);
  });

  const anoAtual = new Date().getFullYear();
  for(let ano = anoAtual - 10; ano <= anoAtual + 10; ano++) {
    const option = document.createElement('option');
    option.value = ano;
    option.textContent = ano;
    anoSelect.appendChild(option);
  }
}

function gerarDias(mes, ano) {
  calendarGrid.innerHTML = '';

  const primeiroDia = new Date(ano, mes - 1, 1).getDay();
  const totalDias = new Date(ano, mes, 0).getDate();

  for(let i = 0; i < primeiroDia; i++) {
    const vazio = document.createElement('div');
    calendarGrid.appendChild(vazio);
  }

  for(let dia = 1; dia <= totalDias; dia++) {
    const diaDiv = document.createElement('div');
    diaDiv.className = 'day';
    diaDiv.textContent = dia;
    diaDiv.dataset.day = dia; 

    calendarGrid.appendChild(diaDiv);
  }
}

function atualizarCalendario() {
  const mes = parseInt(mesSelect.value);
  const ano = parseInt(anoSelect.value);
  gerarDias(mes, ano);
  atualizarEventos();
}

function initCalendar() {
  preencherSelects();

  const hoje = new Date();
  mesSelect.value = hoje.getMonth() + 1;
  anoSelect.value = hoje.getFullYear();

  gerarDias(hoje.getMonth() + 1, hoje.getFullYear());
  atualizarEventos();
}

document.addEventListener("DOMContentLoaded", () => {
  carregarEventosLocal();
  initCalendar();

  mesSelect.addEventListener('change', atualizarCalendario);
  anoSelect.addEventListener('change', atualizarCalendario);
});

const modal = document.getElementById('eventModal');
const openModalBtn = document.getElementById('openEventModal');
const closeModalBtn = document.getElementById('closeModal');
const eventForm = document.getElementById('eventForm');

let eventos = {}; 

openModalBtn.addEventListener('click', e => {
  e.preventDefault();
  modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if(e.target === modal) {
    modal.style.display = 'none';
  }
});

eventForm.addEventListener('submit', e => {
  e.preventDefault();

  const date = document.getElementById('eventDate').value;
  const title = document.getElementById('eventTitle').value;

  if(!date || !title) return;

  eventos[date] = title;

  salvarEventosLocal();

  modal.style.display = 'none';
  eventForm.reset();

  atualizarEventos();
});

function atualizarEventos() {
  const dias = document.querySelectorAll('.calendar-grid .day');
  const mes = parseInt(mesSelect.value);
  const ano = parseInt(anoSelect.value);

  dias.forEach(dia => {
    const diaNum = parseInt(dia.dataset.day);

    const dataFormatada = `${ano}-${String(mes).padStart(2, '0')}-${String(diaNum).padStart(2, '0')}`;

    dia.classList.remove('event-day');
    dia.removeEventListener('click', exibirDescricaoEvento);
    if (eventos[dataFormatada]) {
      dia.classList.add('event-day');
      dia.title = eventos[dataFormatada];
      dia.addEventListener('click', exibirDescricaoEvento);
    } else {
      dia.title = '';
    }
  });
}

function exibirDescricaoEvento(e) {
  const dia = e.currentTarget;
  const diaNum = dia.dataset.day;
  const mes = mesSelect.value;
  const ano = anoSelect.value;

  const data = `${ano}-${String(mes).padStart(2, '0')}-${String(diaNum).padStart(2, '0')}`;
  const titulo = eventos[data];

  if (titulo) {
    alert(`📅 Evento em ${data}:\n\n${titulo}`);
  }
}

function salvarEventosLocal() {
  localStorage.setItem('eventosCalendario', JSON.stringify(eventos));
}

function carregarEventosLocal() {
  const dados = localStorage.getItem('eventosCalendario');
  try {
    eventos = dados ? JSON.parse(dados) : {};
  } catch {
    eventos = {};
  }
}





