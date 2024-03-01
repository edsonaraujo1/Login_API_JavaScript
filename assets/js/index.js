if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página");
    window.location.href = "./assets/html/signin.html";
}

const userLogado = localStorage.getItem("userLogado");

const logado = document.querySelector("#logado");
logado.innerHTML = `Olá ${userLogado}`;

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