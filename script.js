const API_URL = "https://fakestoreapi.com/products";
const loader = document.querySelector(".loader");
const productsDiv = document.querySelector(".products");
const categoriesDiv = document.querySelector(".categories");
const paginationDiv = document.querySelector(".pagination");
let currentPage = 1;
let productsPerPage = 5;
let currentCategory = "";

async function fetchProducts(category = "", page = 1) {
    loader.style.display = "block";
    let url = category ? `${API_URL}/category/${category}` : API_URL;
    let res = await fetch(url);
    let products = await res.json();
    loader.style.display = "none";
    displayProducts(products, page);
    setupPagination(products.length, page);
}

function displayProducts(products, page) {
    productsDiv.innerHTML = "";
    let start = (page - 1) * productsPerPage;
    let end = start + productsPerPage;
    products.slice(start, end).forEach(product => {
        let productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `<h3>${product.title}</h3><img src="${product.image}" width="100" /><p>${product.price} $</p>`;
        productsDiv.appendChild(productDiv);
    });
}

function setupPagination(totalProducts, page) {
    paginationDiv.innerHTML = "";
    let totalPages = Math.ceil(totalProducts / productsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;
        btn.className = page === i ? "active" : "";
        btn.onclick = () => fetchProducts(currentCategory, i);
        paginationDiv.appendChild(btn);
    }
}

async function fetchCategories() {
    let res = await fetch("https://fakestoreapi.com/products/categories");
    let categories = await res.json();
    categoriesDiv.innerHTML = `<button onclick="fetchProducts('', 1)">الكل</button>`;
    categories.forEach(category => {
        let btn = document.createElement("button");
        btn.innerText = category;
        btn.onclick = () => { currentCategory = category; fetchProducts(category, 1); };
        categoriesDiv.appendChild(btn);
    });
}

fetchCategories();
fetchProducts();
