export const fetchFoodInfo = async () => {
  const request = new Request('https://themealdb.com/api/json/v1/1/search.php?f=c');
  const response = await fetch(request);
  const data = await response.json();
  return data.meals;
};

export const enterMeals = async (foodDescr) => {
  const mealArea = document.querySelector('.menu');
  foodDescr.forEach((element) => {
    const mealAccrdn = document.createElement('div');
    mealAccrdn.classList.add('food-card', 'scn-scn');
    mealAccrdn.innerHTML = `<div class = 'image-box'><img src = '${element.strMealThumb}' alt = 'meal'></div>
                          <div class = 'ncs-ncs ppup-area'>
                            <h2 class = 'expand-id'>${element.strMeal}</h2>
                            <i id ="M${element.idMeal}" class="fa-sharp fa-solid fa-heart heart" style="color: red;"></i><span id ="L${element.idMeal}" class ="likes">0 Likes</span>
                          </div>
                          <div class = "press-feature ncs-ncs">
                            <button id = "opinionFtr${element.idMeal}" class = 'comment'>Comments</button>
                          </div>
                          <hr>
                          `;
    mealArea.appendChild(mealAccrdn);
  });
};

export const createInstance = async () => {
  const request = new Request('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/');
  await fetch(request, {
    method: 'POST',
  });
};

export const oneLike = async (uniqueID) => {
  const request = new Request('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IJ8iLiH4qdPujPaGR8ab/likes/');
  await fetch(request, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      item_id: uniqueID,
    }),
  });
};

export const fetchInfo = async () => {
  const request = new Request('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IJ8iLiH4qdPujPaGR8ab/likes/');
  const response = await fetch(request);
  const data = await response.json();
  return data;
};

export const showInfo = async (metricsInfo, metricID) => {
  metricsInfo.forEach((element) => {
    if (element.item_id === metricID) {
      const likeUnique = metricID.replace('M', 'L');
      const span = document.querySelector(`#${likeUnique}`);
      span.textContent = `${element.likes} likes`;
    }
  });
};

export const mealsnumber = async () => {
  const request = new Request('https://themealdb.com/api/json/v1/1/search.php?f=c');
  const response = await fetch(request);
  const data = await response.json();
  return data.meals.length;
};

export const showMeals = (opinionsNo) => {
  const li = document.querySelector('li.meals-num');
  li.textContent = `Meals(${opinionsNo})`;
};

export const expandedCard = (data, id) => {
  const expandCard = document.querySelector('.popup-window');
  data.forEach((element) => {
    if (element.idMeal === id) {
      expandCard.innerHTML = `<div class = "card-enclose scn-scn">
                              <i class="fa-solid fa-xmark minimize-card"></i>
                              <section class = "food-drn scn-scn">
                                <div class = 'expand-box scn-scn'>
                                  <img class = "expand-photo" src = '${element.strMealThumb}' alt = 'meal'>
                                  <h2 class = "expand-id">${element.strMeal}</h2>
                                </div>
                                <div class = "food-dscrptn">
                                  <div><span>Area:</span> ${element.strArea}</div>
                                  <div><span>Category:</span> ${element.strCategory}</div>
                                  <div class = "recipeArea"><span>Instructions:</span> ${element.strInstructions}</div>
                                </div>
                              </section>
                              <hr>
                              <section class = "opinion-area scn-scn">
                                <h2 class = "opinion-header">Comments (0)</h2>
                                <div class = "opinion-scn scn-scn"></div>
                              </section>
                              <hr>
                              <section class = "add-opinion scn-scn">
                                <h2 class = "enter-opinion">Add a comment</h2>
                                <form class = "enter-opinion scn-scn">
                                  <label for = "userName"></label>
                                  <input id = "userName" class = "user-name" type = "text", required, placeholder = "Your name">
                                  <p class = "wrong-name"></p>
                                  <label for = "textArea"></label>
                                  <textarea id = "textarea" class = "insights" required, placeholder = "Your insights"></textarea>
                                  <p class = "insights-error"></p>
                                  <button class = "your-opionion">Comment</button>
                                </form>
                              </section>
                            </div>
                            `;
    }
  });
};

export const warningArea = (userName, insights) => {
  const p1 = document.querySelector('p.wrong-name');
  const p2 = document.querySelector('p.insights-error');
  if (!userName) {
    p1.innerHTML = 'required field';
    p1.style.color = 'orange';
    p1.style.fontSize = '1rem';
  } else {
    p1.innerHTML = '';
  }
  if (!insights) {
    p2.innerHTML = 'required field';
    p2.style.color = 'orange';
    p2.style.fontSize = '1rem';
  } else {
    p2.innerHTML = '';
  }
};

export const opinionCount = async (id, userName, insights) => {
  const request = new Request('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IJ8iLiH4qdPujPaGR8ab/comments');
  await fetch(request, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: userName,
      comment: insights,
    }),
  });
};

export const fetchOpinions = async (id) => {
  const request = new Request(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IJ8iLiH4qdPujPaGR8ab/comments?item_id=${id}`);
  const response = await fetch(request);
  const data = await response.json();
  return data;
};

export const fillOpinions = (data) => {
  const opinionFld = document.querySelector('div.opinion-scn');
  data.forEach((element) => {
    if (element.creation_date && element.username && element.comment) {
      const p = document.createElement('p');
      p.textContent = `${element.creation_date} ${element.username}: ${element.comment}`;
      opinionFld.appendChild(p);
    }
  });
};

export const opinionsNumber = async (id) => {
  const request = new Request(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IJ8iLiH4qdPujPaGR8ab/comments?item_id=${id}`);
  const response = await fetch(request);
  const data = await response.json();
  let a = 0;
  if (data.length) {
    data.forEach((element) => {
      if (element.creation_date && element.username && element.comment) {
        a += 1;
      }
    });
  }
  return a;
};

export const opinionQty = (opinionsNo) => {
  const h2 = document.querySelector('h2.opinion-header');
  h2.textContent = `Number of Comments (${opinionsNo})`;
};