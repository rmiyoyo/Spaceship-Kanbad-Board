import './style.css';
import fetchMealData from './modules/api.js';
import createCard from './modules/card.js';
// import createModal from './modules/modal.js';

async function fetchAndPopulateCards() {
  const mealData = await fetchMealData();
  const cardsContainer = document.getElementById('cardsContainer');
  let row = document.createElement('div');
  row.classList.add('row');
  mealData.forEach((meal, index) => {
    const card = createCard(meal);
    row.appendChild(card);
    if ((index + 1) % 3 === 0) {
      cardsContainer.appendChild(row);
      row = document.createElement('div');
      row.classList.add('row');
    }
  });
  if (row.childElementCount > 0) {
    cardsContainer.appendChild(row);
  }
}

fetchAndPopulateCards();
