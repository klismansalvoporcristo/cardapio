const precosBolos = [
  { fatias: 6, preco: 70.00 },
  { fatias: 10, preco: 100.00 },
  { fatias: 15, preco: 130.00 },
  { fatias: 27, preco: 180.00 },
  { fatias: 40, preco: 230.00 },
  { fatias: 60, preco: 290.00 },
  { fatias: 80, preco: 350.00 },
  { fatias: 100, preco: 4500.00 }
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
  titulo.innerText = `Escolha o recheio para o bolo de ${fatias} fatias:`;
  modal.appendChild(titulo);

  const avisoMassa = document.createElement("p");
    avisoMassa.innerText = "Massas disponíveis: amanteigada ou chocolate (+R$15)";
    avisoMassa.style.fontSize = "13px";
    avisoMassa.style.marginBottom = "10px";

    modal.appendChild(avisoMassa);

  recheios.forEach(recheio => {
    const botao = document.createElement("button");
    botao.innerText = recheio;

    if (recheiosComAdicional.includes(recheio)) {
      const aviso = document.createElement("span");
      aviso.innerText = " + Adicional de fruta R$ 15,00";
      aviso.style.color = "red";
      aviso.style.fontSize = "12px";
      aviso.style.marginLeft = "8px";
      botao.appendChild(aviso);
    }

    botao.onclick = () => {
      let precoFinal = precoBase;
      let mensagem = `Olá! Gostaria de encomendar um bolo de ${fatias} fatias com recheio de ${recheio}. Valor aproximado: R$ ${precoFinal.toFixed(2)}.`;

      if (recheiosComAdicional.includes(recheio)) {
        precoFinal += 15;
        mensagem += " Observação: Estou ciente do adicional para recheios com frutas.";
      }

      mensagem;
      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, "_blank");
      document.body.removeChild(modal);
    };

    modal.appendChild(botao);
  });

  const cancelar = document.createElement("button");
  cancelar.innerText = "Cancelar";
  cancelar.style.marginTop = "10px";
  cancelar.onclick = () => document.body.removeChild(modal);
  modal.appendChild(cancelar);

  document.body.appendChild(modal);
}
