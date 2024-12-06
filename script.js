const products = [
  {
    name: 'Xbox Series X',
    price: 11.299,
    image: 'xbox.png',
  },
  {
    name: 'Razer',
    price: 9.499,
    image: 'razer.png',
  },
  {
    name: 'Nintendo Switch',
    price: 6.999,
    image: 'nintendoswitch.png',
  },
];

// Base de datos ficticia para autenticación
const usersDB = [
  { username: "Admin", password: "123456", email: "leonardo@example.com" },
  { username: "Leonardo", password: "123456", email: "cristiano@example.com" },
];

// Array para almacenar los productos en el carrito
const cart = [];

// Variable para verificar si el usuario está autenticado
let isAuthenticated = false;

// Rutas protegidas
const protectedRoutes = ["store", "about", "datatable", "cart"];

// Usuario actualmente autenticado
let currentUser = null;

// Función para manejar los clics en los botones "Añadir al Carrito"
function addToCart(productIndex) {
  const product = products[productIndex];
  const existingProduct = cart.find(item => item.name === product.name);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  showAddToCartNotification(product.name);
  console.log('Producto añadido al carrito:', product);
}

// Función para mostrar la notificación de "Producto añadido al carrito"
function showAddToCartNotification(productName) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `${productName} ha sido añadido al carrito.`;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = 0;
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Función para actualizar la vista del carrito
function updateCartView() {
  const cartView = document.getElementById('main-content');
  if (cart.length === 0) {
    cartView.innerHTML = `<div style="text-align: center; padding: 20px;">
      <h1>Carrito de Compras</h1>
      <p>Aún no tienes productos en tú carrito de compras.</p>
    </div>`;
  } else {
    let totalPrice = 0;
    const cartContent = cart
      .map(product => {
        const productTotal = product.price * product.quantity;
        totalPrice += productTotal;
        return `
          <tr class="cart-item">
            <td><img src="${product.image}" alt="${product.name}" width="50"></td>
            <td>${product.name}</td>
            <td><input type="number" value="${product.quantity}" min="1" onchange="updateQuantity(${cart.indexOf(product)}, this.value)"></td>
            <td>$${product.price.toFixed(4)}</td>
            <td>$${productTotal.toFixed(4)}</td>
          </tr>
        `;
      })
      .join('');

    cartView.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 20px;">Carrito de Compras</h1>
        <table style="width: 80%; margin: 0 auto; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${cartContent}
          </tbody>
        </table>
        <h2 style="font-size: 22px; font-weight: bold; margin-top: 20px;">Total: $${totalPrice.toFixed(4)}</h2>
      </div>
    `;
  }
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(index, newQuantity) {
  cart[index].quantity = parseInt(newQuantity);
  updateCartView();
}

// Función para validar credenciales de usuario
function authenticateUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = usersDB.find(u => u.username === username && u.password === password);

  if (user) {
    isAuthenticated = true;
    currentUser = user.username; // Guarda el nombre del usuario autenticado
    alert(`¡Bienvenido, ${username}!`);
    navigateTo("store");
  } else {
    alert("Credenciales incorrectas. Intenta de nuevo.");
  }
}


// Función para recuperar contraseña
function recoverPassword() {
  const username = prompt("Por favor, introduce tu nombre de usuario:");
  const user = usersDB.find(u => u.username === username);

  if (user) {
    alert(`Tu contraseña es: ${user.password}`);
  } else {
    alert("Usuario no encontrado.");
  }
}

// Función para navegar entre vistas con protección de rutas
function navigateTo(view) {
  const mainContent = document.getElementById("main-content");

  if (protectedRoutes.includes(view) && !isAuthenticated) {
    alert("Debes iniciar sesión para acceder a esta página.");
    mainContent.innerHTML = views.login;
  } else if (view === "datatable" && currentUser === "Leonardo") {
    alert("No tienes acceso a esta sección.");
  } else if (view === "cart") {
    updateCartView();
  } else {
    mainContent.innerHTML = views[view];

    if (view === "datatable") {
      $("#product-table").DataTable({
        dom: "t", // Solo muestra la tabla (sin controles)
        paging: false, // Desactiva paginación
        info: false, // Oculta "Showing x to y of z entries"
        searching: false // Desactiva el cuadro de búsqueda
      });
      
      // Estilo para centrar el título de DataTable
      $("h1").css({
        "text-align": "center",
        "font-size": "24px",
        "font-weight": "bold",
        "margin-bottom": "20px"
      });

      // Estilo para la tabla
      $("table").css({
        "width": "80%",
        "margin": "0 auto",
        "text-align": "left",
        "border-collapse": "collapse",
        "box-shadow": "0 4px 8px rgba(0, 0, 0, 0.1)",
        "background-color": "#fff",
        "border-radius": "8px",
        "overflow": "hidden"
      });

      // Asegurarse de que las celdas tengan el estilo adecuado
      $("th, td").css({
        "padding": "10px",
        "border": "1px solid #ddd"
      });

      // Ajustar el estilo de los encabezados
      $("th").css({
        "background-color": "#4CAF50",
        "color": "#fff",
        "font-weight": "bold"
      });

      // Configurar la imagen dentro de las celdas de la tabla
      $("td img").css({
        "width": "50px",
        "height": "auto",
        "border-radius": "4px"
      });

      // Fila alterna de la tabla
      $("table tbody tr:nth-child(even)").css({
        "background-color": "#f9f9f9"
      });

      // Hover en las filas
      $("table tbody tr:hover").css({
        "background-color": "#e1f5e1"
      });
    }
  }
}

// Vistas
const views = {
  store: ` 
    ${products
      .map(
        (product, index) => `
      <div class="product-card">
        <button class="add-to-cart" onclick="addToCart(${index})">Añadir al Carrito</button>
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
      </div>
    `
      )
      .join('') }
  `,
  datatable: `
        <div style="text-align: center; padding: 20px;">
        <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 20px;">Vista DataTable</h1>
    <table id="product-table" class="display">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Imagen</th>
        </tr>
      </thead>
      <tbody>
        ${products
          .map(
            product => `
          <tr>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td><img src="${product.image}" alt="${product.name}" width="50"></td>
          </tr>
        `
          )
          .join('') }
      </tbody>
    </table>
  `,
  cart: `
    <div style="text-align: center; padding: 20px;">
      <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 20px;">Carrito de Compras</h1>
      <table style="width: 80%; margin: 0 auto; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${cart
            .map(product => {
              const productTotal = product.price * product.quantity;
              return `
                <tr class="cart-item">
                  <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                  <td>${product.name}</td>
                  <td><input type="number" value="${product.quantity}" min="1" onchange="updateQuantity(${cart.indexOf(product)}, this.value)"></td>
                  <td>$${product.price.toFixed(4)}</td>
                  <td>$${productTotal.toFixed(4)}</td>
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
      <h2 style="font-size: 22px; font-weight: bold; margin-top: 20px;">Total: $${cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(4)}</h2>
    </div>
  `,
  about: `
    <div style="text-align: center; padding: 20px;">
      <h1>Sobre Nosotros</h1>
      <p>Somos una tienda especializada en productos gaming.</p>
    </div>
  `,
  login: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f4f4f4;">
      <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); text-align: center; max-width: 400px; width: 100%;">
        <h1 style="font-size: 28px; margin-bottom: 20px; color: #333; font-weight: bold;">Iniciar Sesión</h1>
        <input type="text" id="username" placeholder="Usuario" style="margin: 10px; padding: 12px; width: 80%;" />
        <input type="password" id="password" placeholder="Contraseña" style="margin: 10px; padding: 12px; width: 80%;" />
        <button onclick="authenticateUser()" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007BFF; border: none; cursor: pointer;">Iniciar sesión</button>
        <button onclick="recoverPassword()" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #28a745; border: none; cursor: pointer;">Recuperar contraseña</button>
      </div>
    </div>
  `,
};

// Inicialización
window.onload = () => {
  navigateTo('login');
};
