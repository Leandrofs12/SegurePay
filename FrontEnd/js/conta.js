const editBtn = document.getElementById('editBtn');
let isEditing = false;

//SideBar
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


// Carrega dados do localStorage ao iniciar
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
    // Entra no modo edição
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
    // Salva os dados
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

    // Salva no localStorage
    localStorage.setItem('empresaData', JSON.stringify(updatedData));

    editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
  }

  isEditing = !isEditing;
});

document.addEventListener("DOMContentLoaded", function () {
    const logoImg = document.querySelector(".card-img");
    const logoInput = document.getElementById("logoInput");

    // Carregar imagem do localStorage
    const savedLogo = localStorage.getItem("empresaLogo");
    if (savedLogo) {
        logoImg.src = savedLogo;
    }

    // Atualizar imagem ao escolher novo arquivo
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

  // Conteúdo HTML do card com botão de deletar
  task.innerHTML = `
  <div contenteditable="true" class="task-content">Novo Quadro</div>
  <button class="delete-task" title="Excluir quadro">🗑️</button>
`;

  // Botão de exclusão
  task.querySelector(".delete-task").addEventListener("click", () => {
  task.remove();
  });

// Drag and Drop
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






