fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((data) => {
    const todoList = document.getElementById("todo-list");
    data.forEach((todo) => {
      const li = document.createElement("li");
      li.classList.add("todo-item");
      li.textContent = todo.title;
      li.addEventListener("click", () => displayTodoDetails(todo));
      todoList.appendChild(li);
    });
  })
  .catch((error) => console.error("Error fetching todos:", error));

function displayTodoDetails(todo) {
  const todoDetails = document.getElementById("todo-details");
  todoDetails.innerHTML = `
        <h2>Task Details</h2>
        <p id="tlt"><strong>Title:</strong> ${todo.title}</p>
        <p><strong>Completed:</strong> ${todo.completed ? "Yes" : "No"}</p>
        <p id="tlt"><strong>User-id:</strong> ${todo.userId}</p>
        <div class="btns">
        ${
          todo.completed
            ? `<button id='completed' onclick="markCompleted(${todo.id})">Completed</button>`
            : `<button id='markCompleted' onclick="markCompleted(${todo.id})">Mark Completed</button>`
        }
        <button onclick="deleteTodo(${todo.id})" id="delete">Delete</button>
        </div>
    `;
}

function markCompleted(todoId) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed: true,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((updatedTodo) => {
      // Update UI or perform any necessary actions
      // displayTodoDetails(todoId);
      document.getElementById("markCompleted").id = "completed";
      document.getElementById("completed").innerHTML = "Completed";
      document.getElementById("status").innerHTML = "Yes";
      console.log("Todo marked as completed:", updatedTodo);
    })

    .catch((error) => console.error("Error marking todo as completed:", error));
}

// Function to delete a todo
function deleteTodo(todoId) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // Remove the todo from the UI
        const todoItem = document.querySelector(
          `.todo-item[data-id="${todoId}"]`
        );
        todoItem.remove();
        // Clear todo details
        document.getElementById("todo-details").innerHTML = "";
        console.log("Todo deleted successfully");
      } else {
        console.error("Failed to delete todo:", response.statusText);
      }
    })
    .catch((error) => console.error("Error deleting todo:", error));
}
