//efeitos de scroll reveal
ScrollReveal().reveal('#cta', {
  origin: 'left',
  duration: 1500,
  distance: '30%'
});

//botao de mobile
document.getElementById("mobile_btn").addEventListener("click", function() {
  var menu = document.getElementById("mobile_menu");
  menu.classList.toggle("active");
});

//modal vars
let modal = document.getElementById("cart-modal");
let btn = document.getElementById("openModalBtn");
let span = document.getElementsByClassName("close")[0];

//funções para o modal
btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// array de itens do carrinho
let cart = [];

// adicionar ao carrinho
function addToCart(productId, productName, productPrice) {
  // cria um objeto para o item
  const item = {
    id: productId,
    name: productName,
    price: parseFloat(productPrice),
    quantity: 1
  };
  
  // verifica se o item existe no carrinho
  const existingItem = cart.find(product => product.id === productId);
  if (existingItem) {
    // se tiver adiciona apenas unidade
    existingItem.quantity += 1;
  } else {
    // se n tiver adiciona ao carrinho
    cart.push(item);
  }

  // atualiza o modal do carrinho
  updateCartModal();
}

// atualiza o carrinho
function updateCartModal() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  // limpa a lista do modal
  cartItems.innerHTML = '';

  let total = 0;

  // adiciona cada item ao modal
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$${item.price} x ${item.quantity}`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `R$${total.toFixed(2)}`;
}

// adiciona o item a modal, ao clicar add
const buttons = document.querySelectorAll('.add-to-cart');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const productElement = button.parentElement;
    const productId = button.getAttribute('data-id');
    const productName = document.querySelector('.products_title').textContent;
    const productPrice = document.querySelector('.product_price span').textContent.replace('R$', '');

    addToCart(productId, productName, productPrice);
  });
});
  
  // obtém os dados do formulário usando FormData
  const formData = new FormData(event.target);
  
  // monta a mensagem usando os valores dos campos
  const mensagem = `Olá, gostaria de registrar meu interesse na pré-venda:\n\n` +
                   `Nome: ${formData.get("name")}\n` +
                   `E-mail: ${formData.get("email")}\n` +
                   `Telefone: ${formData.get("phone")}\n` +
                   `Sugestão de Preço: R$ ${formData.get("suggested-price")}\n` +
                   `Comentários: ${formData.get("comments")}`;
  
  // URL do WhatsApp com a mensagem codificada
  const url = `https://wa.me/5541997716099?text=${encodeURIComponent(mensagem)}`;
  
  // abre o WhatsApp em uma nova aba
  window.open(url, '_blank');
