const btnCad = document.getElementById('btn-Cad')
const contentl = document.getElementById('contentl');

if (localStorage.getItem("token") == null) {
	alert("Você precisa estar logado para acessar essa página");
	window.location.href = "./assets/html/signin.html";
} else {

	const userLogado = localStorage.getItem("userLogado");
	
	const logado = document.querySelector("#logado");
	logado.innerHTML = `Olá ${userLogado}`;

}

function sair() {

  localStorage.removeItem("usernome");
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");
  window.location.href = "./assets/html/signin.html";
}

/*
  Slidemenu
*/
(function () {
	var $body = document.body
		, $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];

	if (typeof $menu_trigger !== 'undefined') {
		$menu_trigger.addEventListener('click', function () {
			$body.className = ($body.className == 'menu-active') ? '' : 'menu-active';
		});
	}

}).call(this);


async function ObterLista() {

	const myHeaders = new Headers();
	myHeaders.append(
		"Authorization",
		"Bearer " + localStorage.getItem("token") + ""
	);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow"
	};

	const response = await fetch("https://www.utyum.com.br/Seguro/Api/api/Usuario", requestOptions)
	
	const data = await response.json();
	
	length = data.length;
	
	var temp = "";

	if (length <= 0) {

		temp += "<tr>";
		temp += "<td><div style='text-align: center;'>Nunhum Registro Encontrado!</div></td>";

	} else {

		for (i = 0; i < length; i++) {
			temp += "<tr>";
			temp += "<td>" + data[i].id + "</td>";
			temp += "<td>" + data[i].nomeUsuario + "</td>";
			temp += "<td>" + data[i].email + "</td>";
			temp += "<td><button class='stybtn' data-id='" + data[i].id + "'>Selecionar</button></td>";
		}
    }

	document.getElementById("data").innerHTML = temp;

}

btnCad.addEventListener('click', async (event) => {
	event.preventDefault();
	const listares = await ObterLista();
})
