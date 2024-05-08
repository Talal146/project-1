class CardManager {


	constructor(cards) {

		this.container = document.getElementById('cards-container');
		this.cards = [];
		this.flippedCard = [];

		document
			.getElementById('reset')
			.addEventListener('click', () => this.reset());

		for (let index = 0; index < cards.length; index++) {
			this.createCard(cards[index]);
			this.createCard(cards[index]);
		}

		this.handleCardsShuffle();
	}

	handleCardsShuffle() {
		let shuffledCards = this.shuffleCards(Array.from(this.cards));
		shuffledCards.forEach((card) => {
			this.container.appendChild(card);
		});
	}

	shuffleCards(cardsArray) {
		let shuffledArray = [];
		while (cardsArray.length > 0) {
			let randIndex = Math.floor(Math.random() * cardsArray.length);
			shuffledArray.push(cardsArray.splice(randIndex, 1)[0]);
		}
		return shuffledArray;
	}

	cardClick(card) {
		let flippedCard = this.flippedCard;
		let cardFlip = this.cardFlip;

		card.addEventListener('click', function () {
			cardFlip(card);

			setTimeout(() => {
				if (flippedCard.length == 0) {
					flippedCard.push(card);
				} else {
					if (flippedCard[0].dataset.value === card.dataset.value) {
						flippedCard.pop();
					} else {
						cardFlip(card);
						cardFlip(flippedCard[0]);

						flippedCard.pop();
					}
				}
			}, 1000);


		});
	}

	cardFlip(card) {

		if (card.classList.contains('is-flipped')) {
			card.classList.remove('is-flipped');
		} else {
			card.classList.toggle('is-flipped');
		}
	}

	reset() {
		this.cards.forEach((card) => {
			card.classList.remove('is-flipped');
			this.handleCardsShuffle();
		});
	}

	createCard(cardInfo) {
		let card = this.createDivOnly(this.container);
		card.classList.add('card');
		this.createFrontCard(card);
		this.createBackCard(card, cardInfo.src);

		card.dataset.value = cardInfo.data;

		this.cardClick(card);

		this.cards.push(card);
	}

	createFrontCard(parent) {
		let div = this.createDivOnly(parent);
		div.classList.add('key', 'view-front');
		parent.appendChild(div);

		let span = document.createElement('span');
		span.classList.add('material-icons');
		span.innerHTML = 'question_mark';

		div.appendChild(span);
	}

	createBackCard(parent, imgSrc = '') {
		let div = this.createDivOnly(parent);
		div.classList.add('key', 'view-back');
		parent.appendChild(div);

		let img = document.createElement('img');
		img.src = imgSrc;

		div.appendChild(img);
	}

	createDivOnly(parent) {
		let div = document.createElement('div');
		parent.appendChild(div);
		return div;
	}
}

let cards = [
	{ data: 'apple', src: './imgs/apple.png' },
	{ data: 'bananas', src: './imgs/bananas.png' },
	{ data: 'dragon-fruit', src: './imgs/dragon-fruit.png' },
	{ data: 'orange', src: './imgs/orange.png' },
	{ data: 'passion-fruit', src: './imgs/passion-fruit.png' },
	{ data: 'strawberry', src: './imgs/strawberry.png' },
	{ data: 'vegetables', src: './imgs/vegetables.png' },
	{ data: 'watermelon', src: './imgs/watermelon.png' },
];

let card = new CardManager(cards);
