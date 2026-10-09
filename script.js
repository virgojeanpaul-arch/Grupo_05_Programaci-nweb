let carrito = [];
let total = 0;
let contadorCliente = 1;

function mostrarSeccion(id){
	let secciones = document.querySelectorAll(".seccion");

	secciones.forEach(function(seccion){
		seccion.style.display="none";
	});

	document.getElementById(id).style.display="block";
	window.scrollTo(0,0);

	let menu=document.getElementById("menu");

	if(menu.classList.contains("show")){
		document.querySelector(".navbar-toggler").click();
	}
}

function agregar(){
	let producto=document.getElementById("producto");
	let cantidad=Number(document.getElementById("cantidad").value);

	if(producto.value==""){
		alert("Selecciona un producto");
		return;
	}

	if(cantidad<1){
		alert("La cantidad debe ser mayor a 0");
		return;
	}

	let nombre=producto.options[producto.selectedIndex].text;
	let precio=Number(producto.value);
	let existente=carrito.find(item=>item.nombre==nombre);

	if(existente){
		existente.cantidad+=cantidad;
	}else{
		carrito.push({
			nombre:nombre,
			precio:precio,
			cantidad:cantidad
		});
	}

	mostrar();
}

function mostrar(){
	let carritoHTML=document.getElementById("carrito");
	total=0;
	carritoHTML.innerHTML="";

	for(let i=0;i<carrito.length;i++){
		let subtotal=carrito[i].precio*carrito[i].cantidad;
		total+=subtotal;

		carritoHTML.innerHTML+=`<p>${carrito[i].nombre} x${carrito[i].cantidad} - S/ ${subtotal}</p>`;
	}

	if(carrito.length==0){
		carritoHTML.innerHTML="<p>No hay productos agregados.</p>";
	}

	document.getElementById("total").textContent=total;
}

function mostrarCodigo(){
	document.getElementById("codigo").value="CLI-"+String(contadorCliente).padStart(4,"0");
}

function confirmar(){
	let nombre=document.getElementById("nombre").value;
	let codigo=document.getElementById("codigo").value;
	let mensaje=document.getElementById("mensaje");

	if(nombre==""){
		alert("Escribe tu nombre");
		return;
	}

	if(carrito.length==0){
		alert("Agrega productos al pedido");
		return;
	}

	mensaje.textContent="🔥 Pedido confirmado para "+nombre+" (Código: "+codigo+"). Total: S/ "+total;

	carrito=[];
	total=0;
	mostrar();

	contadorCliente++;
	mostrarCodigo();

	document.getElementById("btnOtro").style.display="block";
}

function otroPedido(){
	document.getElementById("nombre").value="";
	document.getElementById("producto").value="";
	document.getElementById("cantidad").value=1;
	document.getElementById("mensaje").textContent="";
	document.getElementById("btnOtro").style.display="none";
}

mostrarCodigo();