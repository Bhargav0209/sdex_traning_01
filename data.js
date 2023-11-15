const form = document.getElementById("Project-form");
const table = document.getElementById("dataTable");
const currentPageSpan = document.getElementById("currentPage");

let currentPage = 1;
const itemsPerPage = 10;
let data = []; // Initialize an empty array to store data

function showPage(page) {
    // Clear all rows except the header row
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    generateTable(data, page);
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

    cellUserID.innerHTML = userID;
    cellID.innerHTML = id;
    cellTitle.innerHTML = title;
    cellCompleted.innerHTML = completed
        ? '<i class="fa-solid fa-check" style="color: #35b137,font-size: 30px"></i>'
        : '<i class="fa-solid fa-xmark" style="color: #bf582b;"></i>';

    const deleteButton = document.createElement("button1");
    deleteButton.innerHTML = 'Delete <i class="fa-solid fa-trash-can" style="color: white;"></i>';
    deleteButton.addEventListener("click", function () {
        const idToDelete = newRow.cells[1].innerHTML;
        fetch(`https://mock-api-template-rh6s.onrender.com/users/${idToDelete}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    table.deleteRow(newRow.rowIndex);
                    showPage(currentPage);
                } else {
                    // Handle error
                }
            });
    });
    cellAction.appendChild(deleteButton);

    const editButton = document.createElement("button2");
    editButton.innerHTML = 'Edit <i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i>   ';
    editButton.addEventListener("click", function () {
        document.getElementById("userID").value = newRow.cells[0].innerHTML;
        document.getElementById("id").value = newRow.cells[1].innerHTML;
        document.getElementById("title").value = newRow.cells[2].innerHTML;

        form.removeEventListener("submit", handleEditSubmit);
        form.addEventListener("submit", handleEditSubmit);
    });
    cellAction.appendChild(editButton);

    function handleEditSubmit(event) {
        event.preventDefault();

        const editedUserID = document.getElementById("userID").value;
        const editedID = document.getElementById("id").value;
        const editedTitle = document.getElementById("title").value;
        const editedCompleted = document.getElementById("completed").checked;

        fetch(`https://mock-api-template-rh6s.onrender.com/users/${editedID}`, {
            method: 'PUT', // or 'PATCH' depending on your API
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: editedUserID,
                id: editedID,
                title: editedTitle,
                completed: editedCompleted,
            }),
        })
            .then(response => {
                if (response.ok) {
                    newRow.cells[0].innerHTML = editedUserID;
                    newRow.cells[1].innerHTML = editedID;
                    newRow.cells[2].innerHTML = editedTitle;
                    newRow.cells[3].innerHTML = editedCompleted
                        ? '<i class="fa-solid fa-check" style="color: #35b137,font-size: 30px"></i>'
                        : '<i class="fa-solid fa-xmark" style="color: #bf582b;"></i>';
                    showPage(currentPage); // Update the page after editing
                } else {
                    // Handle error
                }
            });

        form.removeEventListener("submit", handleEditSubmit);
    }
}

function generateTable(data, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        addTableRow(data[i].userid, data[i].id, data[i].title, data[i].completed);
    }
}

fetch('https://mock-api-template-rh6s.onrender.com/users')
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
