// Source: https://codewithmosh.com/courses/1269822/lectures/28673243
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach(item => item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);