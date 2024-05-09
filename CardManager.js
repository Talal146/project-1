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
	/*
1-This special function gets called automatically when you create
a new CardManager object.
2-It takes an argument cards, which is the array containing
information about each card (picture and data).
3- It doesn't return anything (undefined).
*/
	handleCardsShuffle() {
		let shuffledCards = this.shuffleCards(Array.from(this.cards));
		shuffledCards.forEach((card) => {
			this.container.appendChild(card);
		});
	}
	/*
1- This function shuffles the cards in the cards list using another
function called shuffleCards.
2- It then loops through the shuffled cards and adds them one by
one to the container element on the webpage, making them
visible.
*/
	shuffleCards(cardsArray) {
		let shuffledArray = [];
		while (cardsArray.length > 0) {
			let randIndex = Math.floor(Math.random() * cardsArray.length);
			shuffledArray.push(cardsArray.splice(randIndex, 1)[0]);
		}
		return shuffledArray;
	}
	/*
1-This function takes an array of cards (cardsArray) and shuffles them randomly.
2-It loops through the array and for each card, it randomly picks another card from the
remaining cards and swaps their positions. This continues until all cards are shuffled.
3-It returns a new array containing the shuffled cards.
*/
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
	/*
1-This function takes a specific card element (card) as an argument.
2-It adds a click event listener to the card. This means whenever you click
the card on the webpage, the code inside this function gets executed
3-When the card is clicked, it uses a concept called a closure to access another
function called cardFlip. We'll see what cardFlip does in a moment.
4-It also uses a short delay (1 second) before checking for a match,
allowing you to see the picture.
*/
	cardFlip(card) {
		if (card.classList.contains('is-flipped')) {
			card.classList.remove('is-flipped');
		} else {
			card.classList.toggle('is-flipped');
		}
	}
	/*
1-This function takes a specific card element (card) as an argument.
2-It checks if the card already has a class called "is-flipped". This
class is used to visually show when a card is revealed.
3- If the card isn't flipped, it adds the "is-flipped" class, revealing
the picture. Otherwise, it removes the class, hiding the picture
again.
*/
	reset() {
		this.cards.forEach((card) => {
			card.classList.remove('is-flipped');
			this.handleCardsShuffle();
		});
	}
	/*
1-This function doesn't take any arguments.
2-It loops through all the cards and removes the "is-flipped" class,
hiding all pictures.
3-It then calls the handleCardsShuffle function again to
shuffle the cards and display them in a new random order.
*/
	createCard(cardInfo) {
		let card = this.createDivOnly(this.container);
		card.classList.add('card');
		this.createFrontCard(card);
		this.createBackCard(card, cardInfo.src);

		card.dataset.value = cardInfo.data;

		this.cardClick(card);

		this.cards.push(card);
	}
	/*
	1-This function takes an object called cardInfo as an argument.
This object contains details about a single card, including its
picture source and data value used for matching.
2-t creates a new HTML element called a <div> and adds the class
3- It adds the class "card" to the created <div>, signifying it's a card element.
4- It calls two other functions to create the front and back sides of
the card: createFrontCard and createBackCard.
5-It sets a data attribute on the card (card.dataset.value) 
to store the card's data value used for matching later.
6-It calls the cardClick function to add a click event listener to the newly created card.
7-Finally, it adds the created card element to the internal list of
cards managed by the CardManager class.	
*/
	createDivOnly(parent) {
		let div = document.createElement('div');
		parent.appendChild(div);
		return div;
	}
	/*
1- This function takes a parent element (parent) as an argument.
2- It's a helper function used by other functions to simply create a new
<div> element and append it to the provided parent element. It
doesn't add any specific classes or content.
*/
	createFrontCard(parent) {
		let div = this.createDivOnly(parent);
		div.classList.add('key', 'view-front');
		parent.appendChild(div);

		let span = document.createElement('span');
		span.classList.add('material-icons');
		span.innerHTML = 'question_mark';

		div.appendChild(span);
	}
	/*
1- This function takes a parent element (parent) as an argument,
which is the card itself (div created in createCard).
2-t creates another <div> element and adds the classes "key"
and "view-front" to it. These classes likely style the front side of the card.
3-It appends this new <div> (representing the front side) as a child of the parent element (the card).
4-It creates a <span> element and adds the class
"material-icons" to it. This class might be used for including an
icon on the front side (likely a question mark).
5- Finally, it sets the content of the <span> element to a question
mark icon using HTML (innerHTML: 'question_mark').
*/
	createBackCard(parent, imgSrc = '') {
		let div = this.createDivOnly(parent);
		div.classList.add('key', 'view-back');
		parent.appendChild(div);

		let img = document.createElement('img');
		img.src = imgSrc;

		div.appendChild(img);
	}
}
/*
1-This function takes two arguments: a parent element (parent)
which is the card itself (div created in createCard), and an
optional image source (imgSrc)
2-Similar to createFrontCard, it creates another <div>
element and adds classes ("key" and "view-back") for styling the
back side of the card.
3-It creates an <img> element to display the picture on the back
of the card
4-If an image source (imgSrc) is provided, it sets the src
attribute of the <img> element to that source, displaying the
picture. Otherwise, it leaves the back side blank.
5-Finally, it appends the created image element (<img>) as a
child of the parent element (the card).
*/
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
