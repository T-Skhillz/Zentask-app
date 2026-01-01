const rawToken = localStorage.getItem("access_token");
const cleanToken = rawToken ? rawToken.trim().replace(/\s/g, "") : "";

if (!cleanToken) {
    window.location.href = "../Login/index.html";
}

let TaskCount = document.querySelector(".NumberOfActiveTasks span");
const DashboardInputs = document.querySelector(".DashboardInputs");
const TaskInput = document.querySelector("#TaskInput");
const CategoryInput = document.querySelector("#CategoryInput");
const TaskTemplate = document.querySelector(".task-template");
const TaskList = document.querySelector(".task-list");

function UpdateCount() {
    const count = TaskList.querySelectorAll(".task-card:not(.completed)").length;
    TaskCount.textContent = count;
}

function createTask(title, category, id, completed) {
    const clone = TaskTemplate.content.cloneNode(true);
    const card = clone.querySelector(".task-card");
    const checkbox = clone.querySelector(".task-check");
    const tasktitle = clone.querySelector(".task-title");
    const taskCategory = clone.querySelector(".task-category");
    const deleteTaskBtn = clone.querySelector(".delete-btn");

    tasktitle.textContent = title;
    taskCategory.textContent = category;
    checkbox.checked = completed;
    card.classList.toggle("completed", completed);

    checkbox.addEventListener("change", async () => {
        card.classList.toggle("completed", checkbox.checked);
        UpdateCount();
        try {
            await fetch(`https://django-todo-api-1.onrender.com/tasks/${id}/`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + cleanToken, // Fixed space
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    category: category,
                    completed: checkbox.checked
                })
            });
        } catch (error) {
            console.log("Failed to update task:", error);
        }
    });

    deleteTaskBtn.addEventListener("click", () => {
        card.remove();
        UpdateCount();
    });

    TaskList.appendChild(clone);
    UpdateCount();
}

async function fetchTasks() {
    try {
        const response = await fetch("https://django-todo-api-1.onrender.com/tasks/", {
            method: "GET",
            headers: { "Authorization": "Bearer " + cleanToken } // Fixed space
        });
        const data = await response.json();
        TaskList.innerHTML = ""; // Clear list before rendering
        data.forEach(task => {
            createTask(task.title, task.category, task.id, task.completed);
        });
    } catch (error) {
        console.log("Connection error:", error);
    }
}

DashboardInputs.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = TaskInput.value;
    const category = CategoryInput.value.trim();
    
    if (!title) return alert("Please enter a task");

    const taskData = {
        title: title,
        category: category,
        completed: false
    };

    try {
        const response = await fetch("https://django-todo-api-1.onrender.com/tasks/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer ".concat(cleanToken.trim()), 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });

        if (response.ok) {
            const savedTask = await response.json();
            createTask(savedTask.title, savedTask.category, savedTask.id, savedTask.completed);
            TaskInput.value = "";
        } else {
            const errorDetail = await response.json();
            console.log("The Server says:", errorDetail);
            if(response.status === 401) alert("Session expired. Please log in again.");
        }
    } catch (error) {
        console.log("Failed to save task:", error);
    }
});
fetchTasks();