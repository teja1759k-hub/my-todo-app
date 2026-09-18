function addTask() {

    const input = document.getElementById("taskInput");

    const task = input.value.trim();

    if (task === "") {
        return;
    }

    const list = document.getElementById("taskList");

    const item = document.createElement("li");

    item.textContent = task;

    list.appendChild(item);

    input.value = "";
}