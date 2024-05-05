function cardClick() {
	const cards = document.querySelectorAll('.card');
	[...cards].forEach((card) => {
		card.addEventListener('click', function () {
			card.classList.toggle('is-flipped');
		});
	});
}
window.addEventListener('load', cardClick);
