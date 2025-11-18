document.addEventListener("keydown", (e)=>{
    const focus = document.activeElement;
    
    if(focus !== document.querySelector("#usuario")
        && focus !== document.querySelector("#senha")){
        return;
    }
    
    const k = e.key;
    
    if(k === "Enter"){
        e.preventDefault();
        entrar();
        return;
    }
})

function entrar(){
  let usuario = document.querySelector('#usuario')
  let userLabel = document.querySelector('#userLabel')
  
  let senha = document.querySelector('#senha')
  let senhaLabel = document.querySelector('#senhaLabel')
  
  let msgError = document.querySelector('#msgError')
  let listaUser = []
  
  let userValid = {
    nome: '',
    user: '',
    senha: ''
  }
  
  listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')
  
  if(listaUser.length === 0){
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Nenhum usuário cadastrado. Por favor, cadastre-se primeiro.'
    return
  }
  
  listaUser.forEach((item) => {
    if(usuario.value == item.userCad && senha.value == item.senhaCad){
       
      userValid = {
         nome: item.nomeCad,
         user: item.userCad,
         senha: item.senhaCad
       }
      
    }
  })
   
  if(usuario.value == userValid.user && senha.value == userValid.senha){
    let mathRandom = Math.random().toString(16).substr(2)
    let token = mathRandom + mathRandom

    localStorage.setItem('token', token)
    localStorage.setItem('userLogado', JSON.stringify(userValid))
    window.location.href = './chat.html'
  } else {
    userLabel.setAttribute('style', 'color: #ff6b6b')
    usuario.setAttribute('style', 'border-color: #ff6b6b')
    senhaLabel.setAttribute('style', 'color: #ff6b6b')
    senha.setAttribute('style', 'border-color: #ff6b6b')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos'
    usuario.focus()
  }
  
}
