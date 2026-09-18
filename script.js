const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const clearCompleted =
    document.getElementById("clearCompleted");

const themeButton =
    document.getElementById("themeButton");

const filterButtons =
    document.querySelectorAll(".filter");


let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// SAVE TASKS

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// DISPLAY TASKS

function displayTasks() {

    taskList.innerHTML = "";

    let visibleTasks = tasks;

    if (currentFilter === "active") {

        visibleTasks =
            tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {

        visibleTasks =
            tasks.filter(task => task.completed);
    }


    visibleTasks.forEach(task => {

        const li =
            document.createElement("li");

        li.className = "task";


        const span =
            document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


        if (task.completed) {

            span.classList.add("completed");
        }


        span.addEventListener("click", () => {

            toggleTask(task.id);

        });


        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete";


        deleteButton.addEventListener("click", () => {

            deleteTask(task.id);

        });


        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    updateCounter();
}


// ADD TASK

function addTask() {

    const text =
        taskInput.value.trim();


    if (text === "") {

        return;
    }


    const task = {

        id: Date.now(),

        text: text,

        completed: false

    };


    tasks.push(task);

    taskInput.value = "";

    saveTasks();

    displayTasks();
}


// COMPLETE TASK

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            return {

                ...task,

                completed: !task.completed

            };

        }

        return task;

    });


    saveTasks();

    displayTasks();
}


// DELETE TASK

function deleteTask(id) {

    tasks =
        tasks.filter(task => task.id !== id);


    saveTasks();

    displayTasks();
}


// COUNTER

function updateCounter() {

    const remaining =
        tasks.filter(task => !task.completed).length;


    if (remaining === 1) {

        taskCount.textContent =
            "1 task remaining";

    } else {

        taskCount.textContent =
            `${remaining} tasks remaining`;

    }
}


// FILTERS

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentFilter =
            button.dataset.filter;


        displayTasks();

    });

});


// CLEAR COMPLETED

clearCompleted.addEventListener("click", () => {

    tasks =
        tasks.filter(task => !task.completed);


    saveTasks();

    displayTasks();
});


// DARK MODE

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (
        document.body.classList.contains("dark")
    ) {

        themeButton.textContent = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeButton.textContent = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});


// LOAD SAVED THEME

if (
    localStorage.getItem("theme") === "dark"
) {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";
}


// ENTER KEY

taskInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// START APP

displayTasks();
