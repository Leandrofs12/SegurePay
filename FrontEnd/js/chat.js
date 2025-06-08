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

      const table = document.getElementById('chatModelsTable').getElementsByTagName('tbody')[0];
      const row = table.insertRow();
      row.innerHTML = `<td>${name}</td><td>${time}</td><td>${type}</td><td>${delivery}</td>`;

     
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

      const table = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
      const row = table.insertRow();
      row.innerHTML = `<td>${name}</td><td>${price}</td><td>${category}</td><td>${quantity}</td>`;

      document.getElementById('productName').value = '';
      document.getElementById('productPrice').value = '';
      document.getElementById('productCategory').value = '';
      document.getElementById('productQuantity').value = '';
}