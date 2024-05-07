let flippedCard = []
function cardClick() {
  const cards = document.querySelectorAll('.card')
  let firstCard, secondCard

  ;[...cards].forEach((card) => {
    card.addEventListener('click', function () {
      if (flippedCard.length < 2 && !card.classList.contains('is-flipped')) {
        flippedCard.push(card)
        card.classList.toggle('is-flipped')
      }
    })
  })
}
let cardShuffled = () => {}
window.addEventListener('load', cardClick)

function shuffleCards(cardsArray) {
  return cardsArray.sort(() => Math.random() - 0.5)
}
