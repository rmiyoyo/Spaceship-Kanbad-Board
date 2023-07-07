export default function createCard(meal) {
  const card = document.createElement('div');
  card.classList.add('col-lg-4');
  const cardContent = `
  <div class="card" style="background: linear-gradient(to bottom right, #556B2F, #AFEEEE);">
    <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="Food Image">
    <div class="card-footer d-flex justify-content-between align-items-center">
      <small class="text-white">${meal.strMeal}</small>
      <button type="button" class="btn btn-outline-light btn-icon btn-open-modal">
        <i class="bi bi-heart-fill"></i>
        Like
      </button>
    </div>
  </div>
`;
  card.innerHTML = cardContent;
  return card;
}