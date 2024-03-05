const btnGo = document.getElementById('btn-Go')
const btnGolimp = document.getElementById('btn-Golimp')

let btn = document.querySelector('.fa-eye')

btnGolimp.addEventListener('click', async (event) => {
    document.getElementById('usuario').value = '';
    document.getElementById('senha').value = '';
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    userLabel.setAttribute('style', 'color: #272262')
    usuario.setAttribute('style', 'border-color: #272262')
    senhaLabel.setAttribute('style', 'color: #272262')
    senha.setAttribute('style', 'border-color: #272262')
    usuario.focus()
})

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

const ObterTokenApi = (usuario, password) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "Email": usuario.value,
        "PasswordHash": password.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    const retorno = fetch("https://www.utyum.com.br/Seguro/Api/api/Auth", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            return result;
        })
        .catch(error => console.log('error', error));

    return retorno;

}


btnGo.addEventListener('click', async (event) => {
    event.preventDefault();
    let usuario = document.querySelector('#usuario')
    let senha = document.querySelector('#senha')
    showSpinner();
    const resulta = await ObterTokenApi(usuario, senha);
    if (resulta != undefined) {
        var UserFim = JSON.stringify(resulta.user).replace(/"/g, '');

        localStorage.setItem('userLogado', JSON.stringify(resulta.nome).replace(/"/g, ''))
        localStorage.setItem('token', JSON.stringify(resulta.token).replace(/"/g, ''))
        localStorage.setItem('usernome', UserFim)
    }
    entrar(UserFim);

});


function entrar(value) {
  let usuario = document.querySelector('#usuario')
  let userLabel = document.querySelector('#userLabel')
  
  let senha = document.querySelector('#senha')
  let senhaLabel = document.querySelector('#senhaLabel')
  
  let msgError = document.querySelector('#msgError')


  if (usuario.value == value){
    window.location.href = '../../index.html'
      
  } else {
    userLabel.setAttribute('style', 'color: red')
    usuario.setAttribute('style', 'border-color: red')
    senhaLabel.setAttribute('style', 'color: red')
    senha.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos'
    usuario.focus()
  }
    setTimeout(() => {
        hideSpinner()
    }, 1500);
}

//Show spinner function
const showSpinner = () => {
    document.getElementById('btn-Golimp').style.dsplay = 'none'
    document.getElementById('btnSubmitText').style.display = 'none'
    document.querySelector('.fa-spinner').style.display = 'block'
}

//Hide spinner function
const hideSpinner = () => {
    document.getElementById('btn-Golimp').style.dsplay = 'block'
    document.getElementById('btnSubmitText').style.display = 'block'
    document.querySelector('.fa-spinner').style.display = 'none'
}

