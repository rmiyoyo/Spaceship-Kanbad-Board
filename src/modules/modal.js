export default function createModal(meal) {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = `modal${meal.idMeal}`;
  modal.tabIndex = -1;
  modal.setAttribute('aria-hidden', 'true');

  const modalContent = `
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">${meal.strMeal}</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <img src="${
  meal.strMealThumb
}" class="img-fluid rounded mb-3" alt="Food Image">
              <div class="category-container jumbotron mb-3">
                <h5 class="category-title">Category:</h5>
                <p class="category">${meal.strCategory}</p>
              </div>
              <div class="category-container jumbotron mb-3">
                <h5 class="category-title">Tags:</h5>
                <p class="category">${
  meal.strTags ? meal.strTags.split(',').join(', ') : ''
}</p>
              </div>
              <div class="category-container jumbotron mb-3">
                <h5 class="category-title">YouTube URL:</h5>
                <p class="category">${meal.strYoutube}</p>
              </div>
            </div>
            <div class="col-md-6">

            <div class="category-container jumbotron mb-3">
            <h5 class="category-title">Area:</h5>
            <p class="category">${meal.strArea}</p>
          </div>

              <div id="accordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      Instructions & Ingredients
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion">
                    <div class="accordion-body">
                      <p class="instructionsPar">${meal.strInstructions}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.innerHTML = modalContent;

  return modal;
}
