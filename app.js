// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskListContainer = document.getElementById('taskList');
const taskCountElement = document.getElementById('taskCount');
const clearAllButton = document.getElementById('clearBtn')

// // Tasks array to store user input
// const tasks = [];

// Retrieve tasks from localStorage or use an empty array if not present
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


// Function to add a new task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push(taskText);
        taskInput.value = ''; // Clear input field

        // Display tasks
        displayTasks();
        // Task count
        updateTaskCount();
        // Save tasks to localStorage
        saveTasksToLocalStorage();
    }
};

// Function to remove a task
const removeTask = (index) => {
    tasks.splice(index, 1);
    displayTasks();
    // Task count
    updateTaskCount();
    // Save tasks to localStorage
    saveTasksToLocalStorage();

};

// Function to display tasks
const displayTasks = () => {
    // Clear the existing content in the taskListContainer
    taskListContainer.innerHTML = '';

    // Loop through tasks and append them to taskListContainer
    tasks.forEach((task, index) => {
        const taskItemContainer = document.createElement('div');
        taskItemContainer.className = 'taskItemContainer';

        // Create input for task text
        const taskTextInput = document.createElement('input');
        taskInput.style.translateY = 'auto'
        taskTextInput.type = 'text';
        taskTextInput.value = task;
        taskTextInput.readOnly = true;
        taskTextInput.style = 'background-color: rgba(182, 166, 166, 0.884); color: rgb(12, 12, 12); max-width: 90%; width: 550px; height: 30px; font-size: 17px; padding: 5px; margin-bottom: 10px; border-style: none; display: inline; ';

        // Create delete button
        const deleteButton = document.createElement('i');
        deleteButton.className = 'fas fa-trash deleteButton';
        deleteButton.style = 'color: rgb(248, 241, 241); background-color: rgb(228, 30, 30); width: 10%; height: 30px;text-align: center; padding-top:5px; cursor: pointer;'
        deleteButton.onclick = () => removeTask(index);

        // Add event listener for double-click to enable task editing
        taskTextInput.addEventListener('dblclick', () => {
            taskTextInput.readOnly = false;
            taskTextInput.focus();
            taskTextInput.style.hover = preventDefault;
        });

        // Add event listener for keydown to save the edited task on Enter
        taskTextInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the default behavior (e.g., new line)
                taskTextInput.contentEditable = true;
                tasks[i] = taskTextInput.value; // Save the edited task
                displayTasks(); // Update the display
                // Save tasks to localStorage
                saveTasksToLocalStorage();
            }
        });


        // Append input and delete button to the taskItemContainer
        taskItemContainer.appendChild(taskTextInput);
        taskItemContainer.appendChild(deleteButton);

        // Append taskItemContainer to taskListContainer
        taskListContainer.appendChild(taskItemContainer);
        taskItemContainer.addEventListener('mouseenter', () => {
            deleteButton.style.display = 'inline-block';
        });

        taskItemContainer.addEventListener('mouseleave', () => {
            deleteButton.style.display = 'none';
        });
    });
};

// Function to update task count
const updateTaskCount = () => {
    const taskCount = tasks.length;
    let message = `You have ${taskCount} pending task`;
    if (taskCount !== 1) {
        message += 's';
    }
    taskCountElement.textContent = message;

};
// Event listener for adding a new task
addTaskButton.addEventListener('click', addTask);

// Function to clear all task

clearAllButton.addEventListener('click', () => {
    // Clear all tasks
    tasks.length = 0;
    displayTasks();
    updateTaskCount();
    // Save tasks to localStorage
    saveTasksToLocalStorage();

});
// Display tasks on page load
displayTasks();
// Update task count on page load
updateTaskCount();

// Event listener to prompt user before leaving the page
window.addEventListener('beforeunload', (event) => {
    const confirmationMessage = 'Changes you made may not be saved. Are you sure you want to leave?';
    event.returnValue = confirmationMessage; // Standard for most browsers
    return confirmationMessage; // For some older browsers
});

