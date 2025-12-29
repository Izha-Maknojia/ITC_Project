// Run when page loads
window.onload = function () {
    showPasswords();
};

// Save password function
function savePassword() {

    // Get input values
    var website = document.getElementById("website").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check empty fields
    if (website === "" || username === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    // Get passwords from localStorage
    var savedPasswords = localStorage.getItem("passwords");

    // If no data, create empty array
    if (savedPasswords === null) {
        savedPasswords = [];
    } else {
        savedPasswords = JSON.parse(savedPasswords);
    }

    // Create password object
    var newPassword = {
        website: website,
        username: username,
        password: password
    };

    // Add to array
    savedPasswords.push(newPassword);

    // Save back to localStorage
    localStorage.setItem("passwords", JSON.stringify(savedPasswords));

    // Clear inputs
    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    // Refresh list
    showPasswords();
}

// Display passwords
function showPasswords() {

    var tableBody = document.getElementById("passwordList");
    tableBody.innerHTML = "";

    var savedPasswords = localStorage.getItem("passwords");

    // If no passwords
    if (savedPasswords === null) {
        tableBody.innerHTML =
            "<tr><td colspan='4'>No Data To Show</td></tr>";
        return;
    }

    savedPasswords = JSON.parse(savedPasswords);

    // Loop through passwords
    for (var i = 0; i < savedPasswords.length; i++) {

        var row = document.createElement("tr");

        var websiteCell = document.createElement("td");
        var usernameCell = document.createElement("td");
        var passwordCell = document.createElement("td");
        var actionCell = document.createElement("td");

        websiteCell.innerText = savedPasswords[i].website;
        usernameCell.innerText = savedPasswords[i].username;
        passwordCell.innerText = savedPasswords[i].password;

        // Delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = function () {
            deletePassword(this);
        };

        actionCell.appendChild(deleteBtn);

        row.appendChild(websiteCell);
        row.appendChild(usernameCell);
        row.appendChild(passwordCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    }
}

// Delete password
function deletePassword(button) {

    var row = button.parentNode.parentNode;
    var index = row.rowIndex - 1;

    var savedPasswords = JSON.parse(localStorage.getItem("passwords"));

    savedPasswords.splice(index, 1);

    localStorage.setItem("passwords", JSON.stringify(savedPasswords));

    showPasswords();
}
