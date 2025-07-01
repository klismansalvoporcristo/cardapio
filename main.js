  const precosBolos = [
    { fatias: 10, preco: 100.00 },
    { fatias: 15, preco: 125.00 },
    { fatias: 27, preco: 155.00 },
    { fatias: 40, preco: 200.00 },
    { fatias: 60, preco: 260.00 },
    { fatias: 80, preco: 320.00 },
    { fatias: 100, preco: 380.00 }
  ];

  const container = document.getElementById("cardapio");

  const numeroWhatsApp = "5589999844394"; // Altere aqui para seu número real (com DDI)

  precosBolos.forEach(item => {
    const card = document.createElement("a");
    card.classList.add("card");
    card.href = gerarLinkWhatsApp(item.fatias, item.preco);
    card.target = "_blank"; // Abre em nova aba

    const title = document.createElement("div");
    title.classList.add("card-title");
    title.textContent = `${item.fatias} fatias`;

    const price = document.createElement("div");
    price.classList.add("price");
    price.textContent = `R$ ${item.preco.toFixed(2)}`;

    card.appendChild(title);
    card.appendChild(price);
    container.appendChild(card);
  });

  function gerarLinkWhatsApp(fatias, preco) {
    const mensagem = `Olá! Gostaria de encomendar um bolo com ${fatias} fatias.`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    return url;
  }