import './style.css';
import createCard from './modules/card.js';
import createModal from './modules/modal.js';

// Step 1: Create a function to send a like to the API
async function sendLike(item_id) {
  try {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/msuftdwyyKcBLk/likes/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Error sending like to API.');
    }
  } catch (error) {
    console.error('Error sending like:', error);
  }
}

export default async function fetchMealData() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
    if (!response.ok) {
      throw new Error('Error! Unable to fetch meal data.');
    }
    const data = await response.json();
    return data.meals.slice(0, 9); // Retrieve the first 6 meals from the response
  } catch (error) {
    throw new Error(error.message);
  }
}

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

    const modal = createModal(meal);
    document.body.appendChild(modal);
    const commentButton = card.querySelector('.btn-comment');
    commentButton.addEventListener('click', () => {
      const modalId = `modal${meal.idMeal}`;
      const modalElement = document.getElementById(modalId);
      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.show();
    });

    // Step 2: Add event listener to the like button
    const likeButton = card.querySelector('.btn-like');
    likeButton.addEventListener('click', async () => {
      await sendLike(meal.idMeal);
      const likeCountElement = card.querySelector('.like-count');
      const currentLikeCount = parseInt(likeCountElement.innerText);
      const newLikeCount = currentLikeCount + 1;
      likeCountElement.innerText = newLikeCount;
    });
  });
  if (row.childElementCount > 0) {
    cardsContainer.appendChild(row);
  }
}

fetchAndPopulateCards();
