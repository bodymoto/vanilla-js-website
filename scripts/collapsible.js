const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach(item => item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);

// // When the user scrolls the page, execute myFunction
// window.onscroll = function() {myFunction()};

// // Get the navbar
// var navbar = document.getElementById("navibar");

// // Get the offset position of the navbar
// var sticky = navbar.offsetTop;

// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// } 

// CSS
// #navibar {
//   background-color: rgb(76, 121, 136);
// }

// .sticky {
//   position: fixed;
//   top: 0;
//   width: 100%;
// }