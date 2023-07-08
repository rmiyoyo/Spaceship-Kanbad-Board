export default function createCard(meal) {
  const card = document.createElement('div');
  card.classList.add('col-lg-4');
  const cardContent = `
    <div class="card" style="background: linear-gradient(to bottom right, #556B2F, #AFEEEE);">
      <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="Food Image">
      <div class="card-footer d-flex justify-content-between align-items-center">
        <small class="text-white">${meal.strMeal}</small>
        <button type="button" class="btn btn-outline-light btn-icon btn-comment">
          Comment
          <i class="bi bi-chat-text-fill"></i>
        </button>
        <button type="button" class="btn btn-outline-light btn-icon btn-like">
          <i class="bi bi-heart-fill"></i>
          Like
        </button>
        <span class="like-count">0</span>
      </div>
    </div>
  `;
  card.innerHTML = cardContent;
  return card;
}
