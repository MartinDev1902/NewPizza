document.addEventListener('DOMContentLoaded', function () {

   let burgerButton = document.getElementById('burger-button');
   let navbar = document.getElementById('responsive-navbar');

   burgerButton.onclick = function () {
      burgerButton.classList.toggle('active-burger');
      navbar.classList.toggle('active-responsive-navigation');
   }

});
