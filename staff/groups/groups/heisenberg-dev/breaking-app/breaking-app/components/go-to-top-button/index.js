const topButton = document.getElementsByClassName('goToTopButton')[0]

topButton.addEventListener('click', () => {
    document.documentElement.scrollTop = 0
})

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.documentElement.scrollTop > 50) {
    topButton.style.visibility = 'visible';
    topButton.style.display = 'block';
  } else {
    topButton.style.visibility = 'none';
    topButton.style.display = 'none';
  }
}