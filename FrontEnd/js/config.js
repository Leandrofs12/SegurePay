const user = JSON.parse(localStorage.getItem("userLogado"));
const infoUsuario = document.getElementById("infoUsuario");
const novoEmailInput = document.getElementById("novoEmail");
const novoNomeInput = document.getElementById("novoNome");
const checkNotif = document.getElementById("notificacoes");
const msg = document.getElementById("mensagemFeedback");
const dataEmail = document.getElementById("dataEmail");

if (user) {
  infoUsuario.innerText = `${user.nome} (${user.user})`;
  novoEmailInput.value = user.user;
  novoNomeInput.value = user.nome;

  const listaUser = JSON.parse(localStorage.getItem("listaUser")) || [];
  const usuarioAtual = listaUser.find(u => u.userCad === user.user);

  if (usuarioAtual && usuarioAtual.dataAlteracaoEmail) {
    dataEmail.innerText = usuarioAtual.dataAlteracaoEmail;
  } else {
    dataEmail.innerText = "Nenhuma alteração recente";
  }
}

if (localStorage.getItem("notificacoes") !== null) {
  checkNotif.checked = localStorage.getItem("notificacoes") === "true";
}

checkNotif.addEventListener("change", () => {
  localStorage.setItem("notificacoes", checkNotif.checked);
});

novoEmailInput.addEventListener("input", () => {
  novoEmailInput.style.borderColor = novoEmailInput.validity.valid ? "green" : "red";
});

novoNomeInput.addEventListener("input", () => {
  novoNomeInput.style.borderColor = novoNomeInput.value.length >= 3 ? "green" : "red";
});

function salvarEmail() {
  const novoEmail = novoEmailInput.value;
  if (novoEmail && novoEmailInput.validity.valid) {
    let listaUser = JSON.parse(localStorage.getItem("listaUser")) || [];
    const i = listaUser.findIndex(u => u.userCad === user.user);
    if (i !== -1) {
      listaUser[i].userCad = novoEmail;
      listaUser[i].dataAlteracaoEmail = new Date().toLocaleString("pt-BR");

      user.user = novoEmail;
      user.dataAlteracaoEmail = listaUser[i].dataAlteracaoEmail;

      localStorage.setItem("userLogado", JSON.stringify(user));
      localStorage.setItem("listaUser", JSON.stringify(listaUser));

      infoUsuario.innerText = `${user.nome} (${user.user})`;
      dataEmail.innerText = listaUser[i].dataAlteracaoEmail;

      exibirMensagem("E-mail atualizado com sucesso!", "sucesso");
    } else {
      exibirMensagem("Usuário não encontrado.", "erro");
    }
  } else {
    exibirMensagem("Digite um e-mail válido.", "erro");
  }
}

function salvarNome() {
  const novoNome = novoNomeInput.value;
  if (novoNome.length >= 3) {
    let listaUser = JSON.parse(localStorage.getItem("listaUser")) || [];
    const i = listaUser.findIndex(u => u.userCad === user.user);
    if (i !== -1) {
      listaUser[i].nomeCad = novoNome;
      user.nome = novoNome;

      localStorage.setItem("userLogado", JSON.stringify(user));
      localStorage.setItem("listaUser", JSON.stringify(listaUser));

      exibirMensagem("Nome atualizado com sucesso!", "sucesso");
      infoUsuario.innerText = `${user.nome} (${user.user})`;
    } else {
      exibirMensagem("Usuário não encontrado.", "erro");
    }
  } else {
    exibirMensagem("O nome deve ter no mínimo 3 letras.", "erro");
  }
}

function alterarSenha() {
  const senhaAtual = document.getElementById("senhaAtual").value;
  const novaSenha = document.getElementById("novaSenha").value;
  const confirmarNovaSenha = document.getElementById("confirmarNovaSenha").value;

  let listaUser = JSON.parse(localStorage.getItem("listaUser")) || [];
  const indexUser = listaUser.findIndex(u => u.userCad === user.user && u.senhaCad === senhaAtual);

  if (indexUser === -1) return exibirMensagem("Senha atual incorreta.", "erro");
  if (novaSenha.length < 6) return exibirMensagem("A nova senha deve ter pelo menos 6 caracteres.", "erro");
  if (novaSenha !== confirmarNovaSenha) return exibirMensagem("As senhas não coincidem.", "erro");

  listaUser[indexUser].senhaCad = novaSenha;
  localStorage.setItem("listaUser", JSON.stringify(listaUser));
  user.senha = novaSenha;
  localStorage.setItem("userLogado", JSON.stringify(user));
  exibirMensagem("Senha alterada com sucesso!", "sucesso");

  document.getElementById("senhaAtual").value = "";
  document.getElementById("novaSenha").value = "";
  document.getElementById("confirmarNovaSenha").value = "";
}

function sair() {
  localStorage.removeItem("userLogado");
  localStorage.removeItem("token");
  window.location.href = "signin.html";
}

function excluirConta() {
  if (confirm("Tem certeza que deseja excluir sua conta?")) {
    let listaUser = JSON.parse(localStorage.getItem("listaUser")) || [];

    listaUser = listaUser.filter(u => u.userCad !== user.user);

    localStorage.setItem("listaUser", JSON.stringify(listaUser));
    localStorage.removeItem("userLogado");
    localStorage.removeItem("token");

    exibirMensagem("Conta excluída!", "sucesso");
    setTimeout(() => {
      window.location.href = "signin.html";
    }, 1000);
  }
}

function exibirMensagem(texto, tipo) {
  msg.innerText = texto;
  msg.className = "feedback " + tipo;
}

function toggleSenha(id) {
  const campo = document.getElementById(id);
  campo.type = campo.type === "password" ? "text" : "password";
}
