const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const prioritySelect = document.getElementById('priority');
const filterSelect = document.getElementById('filter');
const taskList = document.getElementById('task-list');

// Event listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
filterSelect.addEventListener('change', filterTasks);

// Add task
function addTask(e) {
    e.preventDefault();

    if (taskInput.value === '') {
        alert('Please enter a task');
        return;
    }

    const task = document.createElement('li');
    task.classList.add(prioritySelect.value);
    task.innerHTML = `
        ${taskInput.value} - ${dueDateInput.value}
        <button class="delete">Delete</button>
        <span class="timer"></span>
    `;
    taskList.appendChild(task);

    // Start the countdown timer
    const dueDate = new Date(dueDateInput.value);
    const timer = task.querySelector('.timer');
    startCountdown(dueDate, timer);

    taskInput.value = '';
    dueDateInput.value = '';
    prioritySelect.value = 'low';
}

// Countdown function
function startCountdown(dueDate, timerElement) {
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = dueDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.textContent = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(interval);
            timerElement.textContent = "Time's up!";
        }
    }, 1000);
}

//...


// Remove task
function removeTask(e) {
    if (
        e.target.classList.contains('delete')) {
            if (confirm('Are you sure you want to delete this task?')) {
            e.target.parentElement.remove();
            }
            }
            }
            
            // Filter tasks
            function filterTasks(e) {
            const tasks = taskList.childNodes;
            tasks.forEach(task => {
            if (e.target.value === 'all') {
            task.style.display = 'flex';
            } else {
            if (task.classList.contains(e.target.value)) {
            task.style.display = 'flex';
            } else {
            task.style.display = 'none';
            }
            }
            });
            }            


// ...

const pastTasks = document.getElementById('past-tasks');
const todaysTasks = document.getElementById('todays-tasks');
const upcomingTasks = document.getElementById('upcoming-tasks');

// Event listeners
// ...
pastTasks.addEventListener('click', filterByDate);
todaysTasks.addEventListener('click', filterByDate);
upcomingTasks.addEventListener('click', filterByDate);

// ...

// Filter tasks by date
function filterByDate(e) {
    const tasks = taskList.childNodes;
    tasks.forEach(task => {
        const dueDateText = task.textContent.split(" - ")[1].split(" Time")[0];
        const dueDate = new Date(dueDateText);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (e.target.id === 'past-tasks') {
            if (dueDate < today) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        } else if (e.target.id === 'todays-tasks') {
            if (dueDate.getTime() === today.getTime()) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        } else if (e.target.id === 'upcoming-tasks') {
            if (dueDate > today) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        }
    });
}

// ...
