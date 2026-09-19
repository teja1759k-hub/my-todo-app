const API_URL = "http://localhost:3000/api/tasks";

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");


// GET TASKS FROM DATABASE

async function loadTasks() {

    try {

        const response = await fetch(API_URL);

        const tasks = await response.json();

        displayTasks(tasks);

    } catch (error) {

        console.error("Could not load tasks:", error);

    }
}


// DISPLAY TASKS

function displayTasks(tasks) {

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";


        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


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
}


// ADD TASK

async function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        return;

    }


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })

        });


        if (!response.ok) {

            throw new Error("Failed to add task");

        }


        taskInput.value = "";

        loadTasks();

    } catch (error) {

        console.error("Could not add task:", error);

    }
}


// DELETE TASK

async function deleteTask(id) {

    try {

        const response =
            await fetch(`${API_URL}/${id}`, {

                method: "DELETE"

            });


        if (!response.ok) {

            throw new Error("Failed to delete task");

        }


        loadTasks();

    } catch (error) {

        console.error(
            "Could not delete task:",
            error
        );

    }
}


// ADD BUTTON

addButton.addEventListener("click", addTask);


// ENTER KEY

taskInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        addTask();

    }

});


// LOAD TASKS WHEN PAGE OPENS

loadTasks();
