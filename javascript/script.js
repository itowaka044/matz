//efeitos de scroll reveal
ScrollReveal().reveal('#cta', {
  origin: 'left',
  duration: 1500,
  distance: '30%'
});

//leia mais pag index
const leiaMaisBtn = document.getElementById('leiaMaisBtn');
const contOculto = document.getElementById('conteudoOculto');

leiaMaisBtn.addEventListener('click', () => {
    if (contOculto.classList.contains('mostrar')) {
        contOculto.classList.remove('mostrar');
        leiaMaisBtn.textContent = 'Leia mais';
    } else {
        contOculto.classList.add('mostrar');
        leiaMaisBtn.textContent = 'Leia menos';
    }
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
// função para atualizar o modal do carrinho
function updateCartModal() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  // limpa a lista atual
  cartItems.innerHTML = '';

  let total = 0;

  // adiciona cada item ao modal com um botão de "X" para remover
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - R$${item.price} x ${item.quantity}
      <button class="remove-item" data-index="${index}">&times;</button>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  // atualiza o total
  cartTotal.textContent = `R$${total.toFixed(2)}`;

  // adiciona evento de clique para cada botão "X"
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      removeFromCart(index);
    });
  });
}

// função para remover o item do carrinho
function removeFromCart(index) {
  // remove o item do array 'cart' usando o índice
  cart.splice(index, 1);
  
  // atualiza o modal do carrinho
  updateCartModal();
}

// adiciona o item a modal, ao clicar add
const buttons = document.querySelectorAll('.add-to-cart');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const productElement = button.parentElement;
    const productId = button.getAttribute('data-id');
    const productName = document.querySelector('.products_title'+productId).textContent;
    const productPrice = document.querySelector('.price_RS'+productId).textContent.replace('R$', '');

    addToCart(productId, productName, productPrice);
  });
});



//carrossel

let currentIndex = -1.5;
const itemsToShow = 3;
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const totalItems = items.length;

function updateCarousel() {
    const itemWidth = items[0].getBoundingClientRect().width;
    const moveAmount = -currentIndex * itemWidth;
    track.style.transform = `translateX(${moveAmount}px)`;
}

function nextPage() {
    if (currentIndex < totalItems - itemsToShow) {
        currentIndex++;
        if(currentIndex == 2){
          currentIndex = -1;
        }
        updateCarousel();
    }
}

function previousPage() {
    if (currentIndex > -1) {
        currentIndex--;
        updateCarousel();
    }
}

// Inicialize a posição do carrossel
updateCarousel();
