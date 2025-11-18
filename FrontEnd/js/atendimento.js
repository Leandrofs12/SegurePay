(function(){
  const messagesContainer = document.getElementById('messagesContainer');
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendBtn');
  const contactsListEl = document.getElementById('contactsList');
  const contactNameEl = document.getElementById('contactName');
  const contactStatusEl = document.getElementById('contactStatus');
  const contactAvatarEl = document.getElementById('contactAvatar');

  let selectedContactId = null;

  // exemplo de contatos (substitua por dados reais / carregar de API)
  const defaultContacts = [
    { id: 'c1', name: 'Cliente 1', avatar: 'https://i.pravatar.cc/48?img=1', status: 'Online' },
    { id: 'c2', name: 'Cliente 2', avatar: 'https://i.pravatar.cc/48?img=10', status: 'Online' },
    { id: 'c3', name: 'Cliente 3', avatar: 'https://i.pravatar.cc/48?img=3', status: 'Offline' }
  ];

  function getContacts(){
    return JSON.parse(localStorage.getItem('contacts')) || defaultContacts;
  }

  function saveContacts(contacts){
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  function renderContacts(){
    const contacts = getContacts();
    contactsListEl.innerHTML = '';
    contacts.forEach(c => {
      const item = document.createElement('div');
      item.className = 'contact-item';
      item.dataset.id = c.id;
      item.innerHTML = `
        <img class="contact-thumb" src="${c.avatar}" alt="${c.name}">
        <div class="contact-meta">
          <div class="name">${c.name}</div>
          <div class="preview">Toque para abrir conversa</div>
        </div>
        <div style="margin-left:auto" class="time">${c.status}</div>
      `;
      item.addEventListener('click', () => selectContact(c.id));
      contactsListEl.appendChild(item);
    });
  }

  function selectContact(id){
    selectedContactId = id;
    // marca ativo
    contactsListEl.querySelectorAll('.contact-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === id);
    });

    const contact = getContacts().find(c => c.id === id);
    if(contact){
      contactNameEl.textContent = contact.name;
      contactStatusEl.textContent = contact.status;
      contactAvatarEl.src = contact.avatar;
    }

    loadChatHistory(id);
  }

  function historyKey(id){ return `chat_history_${id}`; }

  function loadChatHistory(id){
    messagesContainer.innerHTML = '';
    const history = JSON.parse(localStorage.getItem(historyKey(id))) || [];
    history.forEach(m => {
      appendMessage(m.text, m.type, m.time, false);
    });
    scrollToBottom();
  }

  function saveMessageToHistory(id, text, type, time){
    if(!id) return;
    const key = historyKey(id);
    const history = JSON.parse(localStorage.getItem(key)) || [];
    history.push({ text, type, time });
    localStorage.setItem(key, JSON.stringify(history));
  }

  function scrollToBottom(){ messagesContainer.scrollTop = messagesContainer.scrollHeight; }

  function appendMessage(text, type = 'sent', time = null, persist = true){
    const msg = document.createElement('div');
    msg.className = 'message ' + type;

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;

    const meta = document.createElement('div');
    meta.className = 'meta';
    const now = time ? new Date(time) : new Date();
    meta.textContent = now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

    msg.appendChild(bubble);
    msg.appendChild(meta);
    messagesContainer.appendChild(msg);
    scrollToBottom();

    if(persist && selectedContactId){
      saveMessageToHistory(selectedContactId, text, type, now.toISOString());
    }
  }

  function send(){
    const text = messageInput.value.trim();
    if(!text || !selectedContactId) return;
    appendMessage(text, 'sent');
    messageInput.value = '';
    autoResize();
    // resposta automática de exemplo
    setTimeout(()=> {
      appendMessage('Olá, qual sua tabela de preços?','received');
    }, 700);
  }

  sendBtn.addEventListener('click', send);
  messageInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send(); }
  });

  // auto-resize textarea
  function autoResize(){
    if(!messageInput) return;
    messageInput.style.height = 'auto';
    const newH = Math.min(messageInput.scrollHeight, 140);
    messageInput.style.height = newH + 'px';
  }
  messageInput.addEventListener('input', autoResize);

  window.addEventListener('load', ()=>{ renderContacts(); autoResize(); scrollToBottom(); });

  // placeholder attach
  const attachBtn = document.getElementById('attachBtn');
  if(attachBtn) attachBtn.addEventListener('click', ()=> alert('Funcionalidade de anexar ainda não implementada.'));

  // seleciona primeiro contato por padrão
  window.addEventListener('DOMContentLoaded', () => {
    const contacts = getContacts();
    if(contacts && contacts.length) selectContact(contacts[0].id);
  });

  // expose for debugging (opcional)
  window.chatApp = { renderContacts, selectContact, getContacts };
})();