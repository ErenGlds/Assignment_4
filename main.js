const taskManager = new TaskManager();

const loadTasksBtn = document.getElementById('loadTasksBtn');
const statusMessage = document.getElementById('statusMessage');
const taskList = document.getElementById('taskList');


function renderTasks() {
  taskList.innerHTML = '';

  taskManager.tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    
    if (task.completed) {
      taskDiv.classList.add('completed');
    }

    const titleSpan = document.createElement('span');
    titleSpan.textContent = task.title;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'task-buttons';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
    toggleBtn.className = 'toggle-btn';
    
    toggleBtn.addEventListener('click', () => {
      taskManager.toggleTask(task.id);
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    
    deleteBtn.addEventListener('click', () => {
      taskManager.removeTask(task.id);
      renderTasks();
    });

    buttonsDiv.appendChild(toggleBtn);
    buttonsDiv.appendChild(deleteBtn);

    taskDiv.appendChild(titleSpan);
    taskDiv.appendChild(buttonsDiv);

    taskList.appendChild(taskDiv);
  });
}

async function loadTasks() {
  try {
    statusMessage.textContent = 'Loading tasks...';
    statusMessage.classList.remove('error');

    const rawData = await fetchTasks();

    const jsonString = JSON.stringify(rawData);
    const parsedData = JSON.parse(jsonString);

    const taskInstances = parsedData.map(item => {
      return new Task(item.id, item.title, item.completed);
    });

    taskManager.setTasks(taskInstances);

    renderTasks();

    statusMessage.textContent = '';

  } catch (error) {
    statusMessage.textContent = `Error: ${error.message}`;
    statusMessage.classList.add('error');
    console.error('Failed to load tasks:', error);
  }
}

loadTasksBtn.addEventListener('click', loadTasks);
