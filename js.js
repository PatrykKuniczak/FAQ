
if (document.body.classList.contains('page-template-faq')) {
	const rightInner = document.querySelector('.aq__right-inner');
	let previousHeight = rightInner.offsetHeight;

const updateRightInnerHeight = (answerHeight, nextSiblingAfterClick, isPlusBtnClicked) => {
	let answerHeightNumber = parseInt(answerHeight);
	const firstBlock = document.querySelector('.aq__block.first');
	const nextSibling = firstBlock.nextElementSibling;

	if (firstBlock && nextSibling) {
		const firstBlockHeight = firstBlock.offsetHeight;
		const nextSiblingHeight = nextSibling.offsetHeight;
		const newTotalHeight = firstBlockHeight + nextSiblingHeight;

		rightInner.style.height = `${newTotalHeight}px`;

		if (nextSiblingAfterClick) {
            const nextSiblingAfterClickHeight = nextSiblingAfterClick.offsetHeight;
            console.log(isPlusBtnClicked);
			if (!isPlusBtnClicked) {
				 console.log('kliknięto w plus');
				const newTotalHeight = firstBlockHeight + nextSiblingAfterClickHeight + answerHeightNumber;
				rightInner.style.transition = 'height 0.5s ease';
				rightInner.style.height = `${newTotalHeight}px`;
			} else {
				 console.log('kliknięto w minus');
				const newTotalHeight = firstBlockHeight + nextSiblingAfterClickHeight;
				rightInner.style.height = `${newTotalHeight}px`;
			}
		}

		rightInner.previousHeight = newTotalHeight;

		answerHeightNumber = 0;

		if (window.innerWidth < 767) {
			rightInner.style.height = 'auto';
		}

		return newTotalHeight;
	}
	return 0;
};
const downloadQuestionHeight = () => {
	const answerBtns = document.querySelectorAll('.aq__block-item-sign');
	const answers = document.querySelectorAll('.aq__block-item .aq__block-item-bottom');

	answerBtns.forEach(answerBtn => {
		answerBtn.classList.add('plus');
		answerBtn.addEventListener('click', () => {
			const minusBtn = answerBtn.classList.contains('minus');
			if (minusBtn) {
				answerBtn.classList.remove('minus');
				answerBtn.classList.add('plus');
				console.log('dodaje klase plus');
			} else {
				answerBtn.classList.remove('plus');
				answerBtn.classList.add('minus');
				console.log('dodaje klase minus');
			}
			answers.forEach(answer => {
				answer.style.display = 'block';
			});
			const answerBtnArray = Array.from(answerBtns);
			const clickedIndex = answerBtnArray.indexOf(answerBtn);
			const clickedAnswer = window.getComputedStyle(answers[clickedIndex]).height;
			answers.forEach(answer => {
				answer.style.display = '';
			});
			const firstBlock = document.querySelector('.aq__block.first');
			const nextSiblingAfterClick = firstBlock.nextElementSibling;
			updateRightInnerHeight(clickedAnswer, nextSiblingAfterClick, minusBtn);
		});
	});
};

	window.addEventListener('resize', () => {
		updateRightInnerHeight();
	});

	const moveBlocksHandler = btn => {
		const questionBtns = document.querySelectorAll('.aq__btn');
		const questionBlocks = document.querySelectorAll('.aq__block');
		const btnID = btn.getAttribute('id');
		const blockToMove = document.querySelector(`.aq__block[data-btn-id="${btnID}"]`);
		const newPosition = -blockToMove.offsetTop;
		rightInner.style.transition = 'height 0.5s ease, transform 0.5s ease';
		rightInner.style.transform = `translateY(${newPosition}px)`;

		questionBtns.forEach(button => {
			button.classList.remove('active-faq-btn');
		});
		btn.classList.add('active-faq-btn');

		questionBlocks.forEach(block => {
			const questionBlockAtrr = block.getAttribute('data-btn-id');
			if (questionBlockAtrr === btnID) {
				block.classList.add('first');
			} else {
				block.classList.remove('first');
			}
		});

		updateRightInnerHeight();
	};

	const questionsBtnHandler = () => {
		const firstBtn = document.querySelector('.aq__left-inner .aq__btn');
		if (firstBtn) {
			firstBtn.classList.add('active-faq-btn');
		}
		const questionBtns = document.querySelectorAll('.aq__btn');
		console.log('????');
		questionBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const anwserItems = document.querySelectorAll('.aq__block-item-bottom');
				const anwserBtns = document.querySelectorAll('.aq__block-item-sign');
				console.log('test');
				console.log(anwserBtns);
				let hasActiveItem = false;

				anwserItems.forEach(item => {
					if (item.classList.contains('active')) {
						hasActiveItem = true;
						anwserBtns.forEach(btn => {
							btn.classList.remove('active');
						});
						item.classList.remove('active');
					}
				});

				if (hasActiveItem) {
					setTimeout(() => {
						moveBlocksHandler(btn);
					}, 400);
				} else {
					moveBlocksHandler(btn);
				}
			});
		});
	};
	document.addEventListener('DOMContentLoaded', () => {
		questions();
		questionsBtnHandler();
		downloadQuestionHeight();
		updateRightInnerHeight();
	});
}


