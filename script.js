const listaProductos = document.getElementById("lista-productos");
const productosCarrito = document.getElementById("productos-carrito");
const contador = document.getElementById("contador");
const total = document.getElementById("total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Obtener productos de la API

fetch("https://fakestoreapi.com/products")
.then(respuesta => respuesta.json())
.then(productos => {

    const nombres = [
        "Mochila",
        "Remera Premium",
        "Campera de Algodón",
        "Remera Slim",
        "Pulsera",
        "Anillo de Oro",
        "Cadena de Oro",
        "Aro de Plata",
        "Disco Rígido Externo",
        "Pendrive",
        "Disco SSD",
        "Notebook Acer",
        "Monitor Samsung",
        "Notebook Gamer",
        "Mouse Gamer",
        "Campera de Mujer",
        "Remera de Mujer",
        "Buzo de Mujer",
        "Campera Deportiva",
        "Blusa"
    ];

    productos.forEach((producto, indice) => {

        let precio = Math.round(producto.price * 1400);

        listaProductos.innerHTML += `

        <div class="tarjeta">

            <img src="${producto.image}" alt="${nombres[indice]}">

            <h3>${nombres[indice]}</h3>

            <p>$${precio.toLocaleString("es-AR")}</p>

            <button onclick="agregarCarrito(${producto.id}, '${nombres[indice]}', ${precio})">

                Agregar

            </button>

        </div>

        `;

    });

});

// Agregar al carrito

function agregarCarrito(id, nombre, precio){

    carrito.push({
        id,
        nombre,
        precio
    });

    guardarCarrito();

}

// Guardar carrito

function guardarCarrito(){

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();

}

// Mostrar carrito

function mostrarCarrito(){

    productosCarrito.innerHTML = "";

    let suma = 0;

    carrito.forEach((producto, indice)=>{

        suma += producto.precio;

        productosCarrito.innerHTML += `

        <div class="tarjeta-carrito">

            <h4>${producto.nombre}</h4>

            <p>Precio: $${producto.precio.toLocaleString("es-AR")}</p>

            <button onclick="eliminarProducto(${indice})">

                Eliminar

            </button>

        </div>

        `;

    });

    contador.textContent = carrito.length;

    total.textContent = suma.toLocaleString("es-AR");

}

// Eliminar producto

function eliminarProducto(indice){

    carrito.splice(indice,1);

    guardarCarrito();

}

// Mostrar carrito al abrir la página

mostrarCarrito();
