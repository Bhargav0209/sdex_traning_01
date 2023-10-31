const form = document.getElementById("Project-form");
const table = document.getElementById("dataTable");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const userID = document.getElementById("userID").value;
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const completed = document.getElementById("completed").checked;
    
    const userExists = Array.from(table.rows).some(row => row.cells[0].innerHTML === userID);

    if (userExists) {
        alert("User with the same userID already exists!");
        return;
    }
  
    const newRow = table.insertRow();
    const cellUserID = newRow.insertCell(0);
    const cellID = newRow.insertCell(1);
    const cellTitle = newRow.insertCell(2);
    const cellCompleted = newRow.insertCell(3);
    const cellAction = newRow.insertCell(4);

    cellUserID.innerHTML = userID;
    cellID.innerHTML = id;
    cellTitle.innerHTML = title;
    cellCompleted.innerHTML = completed ? '<i class="fa-solid fa-check" style="color: #35b137,font-size: 30px"></i>' : '<i class="fa-solid fa-xmark" style="color: #bf582b;"></i>';

    const deleteButton = document.createElement("button1");
    deleteButton.innerHTML = 'Delete <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>';
    deleteButton.addEventListener("click", function () {
        table.deleteRow(newRow.rowIndex);
    });

    cellAction.appendChild(deleteButton);
    const editButton = document.createElement("button2");
    editButton.innerHTML = 'Edit <i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i>   ';
    editButton.addEventListener("click", function () {
        document.getElementById("userID").value = newRow.cells[0].innerHTML;
        document.getElementById("id").value = newRow.cells[1].innerHTML;
        document.getElementById("title").value = newRow.cells[2].innerHTML;
    });
    cellAction.appendChild(editButton);
    form.reset();
});
