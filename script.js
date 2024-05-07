let flippedCard = [];

function cardClick() {
	const cards = document.querySelectorAll('.card');
	let firstCard, secondCard;
	[...cards].forEach((card) => {
		card.addEventListener('click', function () {
			if (flippedCard.length < 2 && !card.classList.contains('is-flipped')) {
				flippedCard.push(card);
				card.classList.toggle('is-flipped');
			}
		});
	});
}
function shuffleCards(cardsArray) {
	let shuffledArray = [];
	while (cardsArray.length > 0) {
		let randIndex = Math.floor(Math.random() * cardsArray.length);
		shuffledArray.push(cardsArray.splice(randIndex, 1)[0]);
	}
	return shuffledArray;
}

function reset() {
	const cards = document.querySelectorAll('.card');
	flippedCard = [];
	[...cards].forEach((card, index) => {
		card.classList.remove('is-flipped');
		handleCardsShuffle();
	});
}
function handleCardsShuffle() {
	const cards = document.querySelectorAll('.card');
	let shuffledCards = shuffleCards(Array.from(cards));
	let cardsContainer = document.getElementById('cards-container');
	cardsContainer.innerHTML = '';
	shuffledCards.forEach((card) => {
		cardsContainer.appendChild(card);
	});
}

window.addEventListener('load', cardClick);
document.addEventListener('DOMContentLoaded', handleCardsShuffle);
