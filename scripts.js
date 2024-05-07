// Array
let listaProductos = [
  { id: 1, name: "piggies", artist: "Matias Mirassou", coleccion: "ALine", stock: 10000, price: 10, rutaImagen: "piggies.mp4" },
  { id: 2, name: "flamingos", artist: "Matias Mirassou", coleccion: "ALine", stock: 9997, price: 30, rutaImagen: "flamingos.mp4" },
  { id: 3, name: "rubber ducks", artist: "Matias Mirassou", coleccion: "ALine", stock: 9998, price: 50, rutaImagen: "rubberducks.mp4" },
  { id: 4, name: "desintegrating art", artist: "Decentral Artist", coleccion: "PArt", stock: 1000, price: 150, rutaImagen: "desintegratingart.mp4" },
  { id: 5, name: "stoic art", artist: "Decentral Artist", coleccion: "PArt", stock: 998, price: 250, rutaImagen: "stoicart.mp4" },
  { id: 6, name: "ethereal art", artist: "Decentral Artist", coleccion: "PArt", stock: 994, price: 350, rutaImagen: "etherealart.mp4" },
];

//Funcion de busqueda y filtrado
principal(listaProductos)

function principal(productos) {
    let carrito = []

    let botonMostrarCarrito = document.getElementById("mostarOcultar")
    botonMostrarCarrito.addEventListener("click", mostarOcultar)

    let botonBuscar = document.getElementById("botonBuscar")
    botonBuscar.addEventListener("click", () => filtrarYRenderizar(productos, carrito))
    renderizarProductos(productos, carrito)
}

//Mostar y ocultar
function mostarOcultar(e) {
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    let contenedorProductos = document.getElementById("contenedorProductos")

    //toggle
    if (contenedorCarrito.classList.contains("oculto") || contenedorProductos.classList.contains("visible")) {
        contenedorCarrito.classList.toggle("visiblecont")
        contenedorCarrito.classList.remove("oculto")
        contenedorProductos.classList.toggle("oculto")
        contenedorProductos.classList.remove("visible")
    } else {
        contenedorCarrito.classList.toggle("oculto")
        contenedorCarrito.classList.remove("visiblecont")
        contenedorProductos.classList.toggle("visible")
        contenedorProductos.classList.remove("oculto")
    }

    if (e.target.innerText === "Ver Carrito") {
        e.target.innerText = "Ocultar Carrito"
    } else {
        e.target.innerText = "Ver Carrito"
    }
}

function filtrarYRenderizar(productos, carrito) {
    let productosFiltrados = filtrarProducto(productos)
    renderizarProductos(productosFiltrados, carrito)
}

//Filtro de productos x value del input
function filtrarProducto(productos) {
    let inputBusqueda = document.getElementById("inputBusqueda")

    return productos.filter(producto => producto.name.includes(inputBusqueda.value))
}

//Creacion de Tarjetas
function renderizarProductos(productos, carrito) {
    let contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""

    productos.forEach(producto => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "tarjetaProducto"

        tarjetaProducto.innerHTML = `
        <h3>${producto.name}</h3>
        <video src="videos/${producto.rutaImagen}" autoplay width="200"></video>
        <h4>precio: $${producto.price}</h4>
        <p>stock: ${producto.stock} un.</p>
        <button  class="btn btn-secondary" id=botonCarrito${producto.id}>Agregar al carrito</button>
    `
        contenedorProductos.appendChild(tarjetaProducto)

        let botonAgregarAlCarrito = document.getElementById("botonCarrito" + producto.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(e, productos, carrito))

    });
}

function agregarProductoAlCarrito(e, productos, carrito) {

    let idDelProducto = Number(e.target.id.substring(12))

    let posProductoEnCarrito = carrito.findIndex(producto => producto.id === idDelProducto)
    let productoBuscado = productos.find(producto => producto.id === idDelProducto)

    if (posProductoEnCarrito !== -1) {
        carrito[posProductoEnCarrito].unidades++
        carrito[posProductoEnCarrito].subtotal = carrito[posProductoEnCarrito].precioUnitario * carrito[posProductoEnCarrito].unidades

    } else {
        carrito.push({
            id: productoBuscado.id,
            nombre: productoBuscado.name,
            precioUnitario: productoBuscado.price,
            unidades: 1,
            subtotal: productoBuscado.price
        })
    }
    renderizarCarrito(carrito)
}

function renderizarCarrito(carrito) {
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    contenedorCarrito.innerHTML = ""

    let total = 0

    carrito.forEach(producto => {
        let tarjetaProductoCarrito = document.createElement("div")
        tarjetaProductoCarrito.className = "tarjetaProductoCarrito"
        tarjetaProductoCarrito.id = `tarjetaProductoCarrito${producto.id}`

        tarjetaProductoCarrito.innerHTML = `
            <p>${producto.nombre}</p>
            <p>unidades: ${producto.unidades}</p>
            <p>precio: ${producto.precioUnitario}</p>
            <button class="btn btn-secondary" id=eliminar${producto.id}>ELIMINAR</button>
        `
        contenedorCarrito.appendChild(tarjetaProductoCarrito)

        let botonEliminar = document.getElementById(`eliminar${producto.id}`)
        botonEliminar.addEventListener("click", (e) => eliminarProductoDelCarrito(carrito, e))

        total += producto.precioUnitario * producto.unidades
    })

    let precioTotal = document.createElement("div")
    precioTotal.innerHTML = `<h3>Total: $${total}</h3>`
    contenedorCarrito.appendChild(precioTotal)
}

function eliminarProductoDelCarrito(carrito, e) {
    let id = e.target.id.substring(8)
    let index = carrito.findIndex(producto => producto.id === Number(id))
    carrito.splice(index, 1)
    renderizarCarrito(carrito)
}


