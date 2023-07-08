import './style.css';
import fetchMealData from './modules/api.js';
import createCard from './modules/card.js';
import createModal from './modules/modal.js';

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

    /**
     * Cards are rendered with images, names and like buttons successfully.
     * Since there's only 10 pictures in the array, we only need 6 or nice if we wanna be fancy.
     * Below is a 'mock implementation of the adding comments button and modal.
     */

    const modal = createModal(meal);
    document.body.appendChild(modal);

    const commentButton = card.querySelector('.btn-comment');

    // Add click event listener to open the modal
    commentButton.addEventListener('click', () => {
      // We're getting the modal based on the meal id
      const modalId = `modal${meal.idMeal}`;
      const modalElement = document.getElementById(modalId);

      /* Open the modal with show method.
      //referencing the bootstrap library, for the modals
      */
      const bootstrapModal = new bootstrap.Modal(modalElement);

      bootstrapModal.show();
    });
  });

  // Adding a row every after 3 items have been rendered
  if (row.childElementCount > 0) {
    cardsContainer.appendChild(row);
  }
}

fetchAndPopulateCards();
