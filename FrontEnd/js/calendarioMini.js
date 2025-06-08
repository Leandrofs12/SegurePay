 const calendarGrid = document.getElementById('calendarGrid');
  const mesSelect = document.getElementById('mesSelect');
  const anoSelect = document.getElementById('anoSelect');

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  for (let i = 0; i < 12; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = meses[i];
    mesSelect.appendChild(opt);
  }

  const anoAtual = new Date().getFullYear();
  for (let i = anoAtual - 5; i <= anoAtual + 5; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    anoSelect.appendChild(opt);
  }

  mesSelect.value = new Date().getMonth();
  anoSelect.value = anoAtual;

  function gerarCalendario(mes, ano) {
    calendarGrid.innerHTML = '';
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primeiroDia; i++) {
      const vazio = document.createElement('div');
      calendarGrid.appendChild(vazio);
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
      const divDia = document.createElement('div');
      divDia.className = 'day';
      divDia.textContent = dia;
      calendarGrid.appendChild(divDia);
    }
  }

  mesSelect.addEventListener('change', () => {
    gerarCalendario(Number(mesSelect.value), Number(anoSelect.value));
  });

  anoSelect.addEventListener('change', () => {
    gerarCalendario(Number(mesSelect.value), Number(anoSelect.value));
  });

  gerarCalendario(Number(mesSelect.value), Number(anoSelect.value));