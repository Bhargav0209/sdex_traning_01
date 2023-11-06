const form = document.getElementById("Project-form");
const table = document.getElementById("dataTable");

let currentPage = 1;
const itemsPerPage = 10;

function showPage(page) {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    generateTable(data, page);
}

function nextPage() {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
        currentPage++;
        showPage(currentPage);
        updatePageNumber();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updatePageNumber();
    }
}

function updatePageNumber() {
    document.getElementById("currentPage").textContent = currentPage;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    currentPage = 1;
    const userID = document.getElementById("userID").value;
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const completed = document.getElementById("completed").checked;

    addTableRow(userID, id, title, completed);

    form.reset();
});

function addTableRow(userID, id, title, completed) {
    const newRow = table.insertRow();
    const cellUserID = newRow.insertCell(0);
    const cellID = newRow.insertCell(1);
    const cellTitle = newRow.insertCell(2);
    const cellCompleted = newRow.insertCell(3);
    const cellAction = newRow.insertCell(4);

    const idExists = Array.from(table.rows).some(row => row.cells[1].innerHTML === id);

    if (idExists) {
        alert("the same ID already exists!");
        return;
    }

    cellUserID.innerHTML = userID;
    cellID.innerHTML = id;
    cellTitle.innerHTML = title;
    cellCompleted.innerHTML = completed ? '<i class="fa-solid fa-check" style="color: #35b137,font-size: 30px"></i>' : '<i class="fa-solid fa-xmark" style="color: #bf582b;"></i>';

    const deleteButton = document.createElement("button1");
    deleteButton.innerHTML = 'Delete <i class="fa-solid fa-trash-can" style="color: white;"></i>';
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
}

function generateTable(data, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        addTableRow(data[i].userId, data[i].id, data[i].title, data[i].completed);
    }
}

fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('something went wrong');
    })
    .then(dataResponse => {
        data = dataResponse; // Set the data in the global scope
        generateTable(data, currentPage);
        showPage(currentPage);
        updatePageNumber();
    })
    .catch(myError);

