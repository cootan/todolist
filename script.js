const myInput = document.querySelector("#myInput");



let list = JSON.parse(localStorage.getItem("list")) || [];

function addtodo() {
    const myInput = document.querySelector("#myInput"); // Moved inside the function to ensure it’s defined
    if (myInput.value != "") {
        const ul = document.querySelector("ul");
        const li = document.createElement("li");

        list.push(myInput.value); 
        li.innerHTML = myInput.value;
        ul.appendChild(li);

        localStorage.setItem("list", JSON.stringify(list)); // Save the updated list to local storage

        myInput.value = ""; 
        addDeleteEvent(li); } else {
        alert("Please enter a task name");
    }
}

// Automatically add todos from local storage on page load
document.addEventListener("DOMContentLoaded", function() {
    const ul = document.querySelector("ul");
    list.forEach(function(todo) {
        const li = document.createElement("li");
        li.innerHTML = todo;
        ul.appendChild(li);

        addDeleteEvent(li); // Add delete functionality to the item loaded from local storage
    });
});

document.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the addtodo function
        addtodo();
    }
});

// Add delete functionality 
function addDeleteEvent(listItem) {
    listItem.addEventListener("click", function() {
       
        list = list.filter(item => item !== listItem.innerHTML);
        
        // Update local storage
        localStorage.setItem("list", JSON.stringify(list));
        
        // Remove the item 
        listItem.remove();
    });
}
