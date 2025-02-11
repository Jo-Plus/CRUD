let address = document.getElementById('address');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let index;

function getTotal() {
  if (price.value != '') {
    total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.style.background = '#5e35b1';
  } else {
    total.innerHTML = '';
    total.style.background = '#5c6bc0';
  }
}

let datapro = localStorage.product ? JSON.parse(localStorage.product) : [];

submit.onclick = function () {
  let newpro = {
    address: address.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  }

  if (address.value != '' && price.value != '' && category.value != '' && count.value <= 100) {
    if (mood === 'create') {
      for (let i = 0; i < newpro.count; i++) {
        datapro.push(newpro);
      }
    } else {
      datapro[index] = newpro;
      mood = 'create';
      submit.innerHTML = 'Create';
      count.style.display = 'block';
    }
  } else {
    clearData();
  }

  localStorage.setItem('product', JSON.stringify(datapro));
  showData();
}

function clearData() {
  address.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
  total.style.background = 'blue';
}

function showData() {
  getTotal();
  let table = '';
  for (let i = 0; i < datapro.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${datapro[i].address}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].count}</td>
      <td>${datapro[i].category}</td>
      <td><button onclick="updateData(${i})">Update</button></td>
      <td><button onclick="deletData(${i})">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deleteAll');
  if (datapro.length != 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">Delete All (${datapro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = '';
  }
}
showData();

function deletData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}

function updateData(i) {
  address.value = datapro[i].address;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  getTotal();
  count.style.display = 'none';
  submit.innerHTML = 'Update';
  mood = 'update';
  index = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = 'title';

function getSearchMood(id) {
  let search = document.getElementById('search');
  if (id == 'searchTitle') {
    searchMood = "title";
    search.placeholder = 'Search By Title';
  } else {
    searchMood = "category";
    search.placeholder = 'Search By Category';
  }
  search.focus();
  search.value = '';
  showData();
}

function searchData(value) {
  let table = '';
  for (let i = 0; i < datapro.length; i++) {
    let match = (searchMood === "title") 
      ? datapro[i].address.toLowerCase().includes(value.toLowerCase())
      : datapro[i].category.toLowerCase().includes(value.toLowerCase());

    if (match) {
      table += `
      <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].address}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].count}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})">Update</button></td>
        <td><button onclick="deletData(${i})">Delete</button></td>
      </tr>
      `;
    }
  }
  document.getElementById('tbody').innerHTML = table;
}