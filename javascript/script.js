ScrollReveal().reveal('#cta', {
    origin: 'left',
    duration: 1500,
    distance: '30%'
});

ScrollReveal().reveal('.product', {
    origin: 'right',
    duration: 1500,
    distance: '30%'
});

document.getElementById("mobile_btn").addEventListener("click", function() {
  var menu = document.getElementById("mobile_menu");
  menu.classList.toggle("active");
});
