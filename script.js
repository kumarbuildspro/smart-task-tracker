const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const pendingCount = document.getElementById('pendingCount');
const clearAllBtn = document.getElementById('clearAllBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  let pending = 0;

  tasks.forEach((task, index) => {
    if (!task.completed) pending++;

    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });

  pendingCount.textContent = `${pending} task${pending === 1 ? '' : 's'} pending`;
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    saveAndRender();
  }
});

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

clearAllBtn.addEventListener('click', () => {
  tasks = [];
  saveAndRender();
});

renderTasks();
