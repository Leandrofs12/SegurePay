
function showChatInputs() {
    document.getElementById('chatInputs').style.display = 'block';
}

function showProductInputs() {
    document.getElementById('productInputs').style.display = 'block';
}

function addChatRow() {
    const name = document.getElementById('chatName').value;
    const time = document.getElementById('chatTime').value;
    const type = document.getElementById('chatType').value;
    const delivery = document.getElementById('chatDelivery').value;

    const rowData = { name, time, type, delivery };

    let chats = JSON.parse(localStorage.getItem('chats')) || [];
    chats.push(rowData);
    localStorage.setItem('chats', JSON.stringify(chats));

    appendChatRowToTable(rowData);

    document.getElementById('chatName').value = '';
    document.getElementById('chatTime').value = '';
    document.getElementById('chatType').value = '';
    document.getElementById('chatDelivery').value = '';
}

function addProductRow() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('productCategory').value;
    const quantity = document.getElementById('productQuantity').value;

    const rowData = { name, price, category, quantity };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(rowData);
    localStorage.setItem('products', JSON.stringify(products));

    appendProductRowToTable(rowData);

    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productQuantity').value = '';
}

function appendChatRowToTable({ name, time, type, delivery }) {
    const table = document.getElementById('chatModelsTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `<td>${name}</td><td>${time}</td><td>${type}</td><td>${delivery}</td>`;
}

function appendProductRowToTable({ name, price, category, quantity }) {
    const table = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `<td>${name}</td><td>${price}</td><td>${category}</td><td>${quantity}</td>`;
}

// Carrega dados salvos ao iniciar a página
window.onload = function () {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
    savedChats.forEach(appendChatRowToTable);

    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    savedProducts.forEach(appendProductRowToTable);
};

