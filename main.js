const precosBolos = [
  { fatias: 6, preco: 80.00 },
  { fatias: 10, preco: 115.00 },
  { fatias: 15, preco: 150.00 },
  { fatias: 27, preco: 210.00 },
  { fatias: 40, preco: 265.00 },
  { fatias: 60, preco: 335.00 },
  { fatias: 80, preco: 405.00 },
  { fatias: 100, preco: 510.00 }
];

const recheios = [
  "Doce de leite",
  "Ninho",
  "Beijinho",
  "Brigadeiro",
  "Brigadeiro 4 leite",
  "Chocolate branco",
  "Ameixa",
  "Crocante",
  "Morango",
  "Maracujá",
  "Abacaxi"
];

const recheiosComAdicional = ["Morango", "Maracujá", "Abacaxi"];

const container = document.getElementById("cardapio");
const numeroWhatsApp = "5589999844394"; 

// Cria os cards de tamanhos
precosBolos.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.cursor = "pointer";

  const title = document.createElement("div");
  title.classList.add("card-title");
  title.textContent = `🎂 ${item.fatias} fatias`;

  const price = document.createElement("div");
  price.classList.add("price");
  price.textContent = `R$ ${item.preco.toFixed(2)}`;

  card.appendChild(title);
  card.appendChild(price);
  container.appendChild(card);

  card.addEventListener("click", () => {
    mostrarOpcoesRecheio(item.fatias, item.preco);
  });
});

// Função para mostrar o submenu com recheios

function mostrarOpcoesRecheio(fatias, precoBase) {
  const modal = document.createElement("div");
  modal.classList.add("modal-recheio");

  const titulo = document.createElement("p");
  titulo.innerText =
    `Escolha até 3 sabores para o bolo de ${fatias} fatias:`;
  modal.appendChild(titulo);

  const aviso = document.createElement("p");
  aviso.innerText = "Selecione de 1 a 3 sabores.";
  aviso.style.fontSize = "13px";
  modal.appendChild(aviso);

  // Seleção da massa
  const tituloMassa = document.createElement("p");
  tituloMassa.innerText = "Escolha a massa:";
  modal.appendChild(tituloMassa);

  const massaSelect = document.createElement("select");
  massaSelect.style.display = "block";
  massaSelect.style.marginBottom = "15px";
  massaSelect.style.padding = "8px";
  massaSelect.style.width = "100%";

  const massas = [
    { nome: "Amanteigada", adicional: 0 },
    { nome: "Chocolate (+R$ 15,00)", adicional: 15 }
  ];

  massas.forEach(massa => {
    const opcao = document.createElement("option");
    opcao.value = massa.nome;
    opcao.textContent = massa.nome;
    massaSelect.appendChild(opcao);
  });

  modal.appendChild(massaSelect);

  // Lista de recheios
  const listaRecheios = document.createElement("div");
  listaRecheios.style.display = "flex";
  listaRecheios.style.flexDirection = "column";
  listaRecheios.style.gap = "8px";

  recheios.forEach(recheio => {
    const label = document.createElement("label");
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "8px";
    label.style.cursor = "pointer";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = recheio;

    const texto = document.createElement("span");
    texto.textContent = recheiosComAdicional.includes(recheio)
      ? `${recheio} (+R$ 15,00)`
      : recheio;

    label.appendChild(checkbox);
    label.appendChild(texto);
    listaRecheios.appendChild(label);

    checkbox.addEventListener("change", () => {
      const selecionados = listaRecheios.querySelectorAll(
        'input[type="checkbox"]:checked'
      );

      if (selecionados.length > 3) {
        checkbox.checked = false;
        alert("Você pode escolher no máximo 3 sabores.");
      }
    });
  });

  modal.appendChild(listaRecheios);

  // Botão para confirmar o pedido
  const confirmar = document.createElement("button");
  confirmar.innerText = "Encomendar pelo WhatsApp";
  confirmar.style.marginTop = "15px";

  confirmar.onclick = () => {
    const selecionados = [
      ...listaRecheios.querySelectorAll(
        'input[type="checkbox"]:checked'
      )
    ].map(checkbox => checkbox.value);

    if (selecionados.length === 0) {
      alert("Escolha pelo menos 1 sabor.");
      return;
    }

    if (selecionados.length > 3) {
      alert("Escolha no máximo 3 sabores.");
      return;
    }

    const massaEscolhida = massas.find(
      massa => massa.nome === massaSelect.value
    );

    const adicionalFrutas = selecionados.some(
      sabor => recheiosComAdicional.includes(sabor)
    ) ? 15 : 0;

    const precoFinal =
      precoBase + massaEscolhida.adicional + adicionalFrutas;

    const mensagem =
      `Olá! Gostaria de encomendar um bolo.\n\n` +
      `Tamanho: ${fatias} fatias\n` +
      `Massa: ${massaEscolhida.nome}\n` +
      `Recheio(s): ${selecionados.join(", ")}\n` +
      `Valor aproximado: R$ ${precoFinal.toFixed(2).replace(".", ",")}\n\n` +
      `Gostaria de confirmar os detalhes do pedido.`;

    const url =
      `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
    document.body.removeChild(modal);
  };

  modal.appendChild(confirmar);

  // Botão cancelar
  const cancelar = document.createElement("button");
  cancelar.innerText = "Cancelar";
  cancelar.style.marginTop = "10px";
  cancelar.onclick = () => modal.remove();

  modal.appendChild(cancelar);
  document.body.appendChild(modal);
}

