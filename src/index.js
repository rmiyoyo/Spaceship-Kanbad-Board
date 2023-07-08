import './style.css';
import {
  fetchFoodInfo,
  enterMeals,
  oneLike,
  fetchInfo,
  showInfo,
  mealsnumber,
  showMeals,
  expandedCard,
  warningArea,
  opinionCount,
  fetchOpinions,
  fillOpinions,
  opinionsNumber,
  opinionQty,
} from './modules/card.js';

const foodDescr = await fetchFoodInfo();
const metricsInfo = await fetchInfo();
enterMeals(foodDescr);
const opinionsNo = await mealsnumber();
showMeals(opinionsNo);
foodDescr.forEach((element) => {
  showInfo(metricsInfo, `M${element.idMeal}`);
});

const mealArea = document.querySelector('.menu');
mealArea.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target && e.target.matches('i.heart')) {
    const uniqueID = e.target.id;
    await oneLike(uniqueID);
    const metricsInfo = await fetchInfo();
    showInfo(metricsInfo, uniqueID);
  } else if (e.target && e.target.matches('button.comment')) {
    const uniqueID = e.target.id;
    const idMeal = uniqueID.replace('opinionFtr', '');
    expandedCard(foodDescr, idMeal);
    const metricID = uniqueID.replace('opinionFtr', 'M');
    const nbComments = await opinionsNumber(metricID);
    opinionQty(nbComments);
    const commentData = await fetchOpinions(metricID);
    if (commentData.length) {
      fillOpinions(commentData);
    }
    const submitCommentBtn = document.querySelector('button.your-opionion');
    submitCommentBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const userName = document.querySelector('input.user-name').value;
      const insights = document.querySelector('textarea.insights').value;
      if (!userName || !insights) {
        warningArea(userName, insights);
      }
      await opinionCount(metricID, userName, insights);
      document.querySelector('input.user-name').value = '';
      document.querySelector('textarea.insights').value = '';
      document.querySelector('div.opinion-scn').innerHTML = '';
      const commentData = await fetchOpinions(metricID);
      fillOpinions(commentData);
      const nbComments = await opinionsNumber(metricID);
      opinionQty(nbComments);
    });
  }
});
const popupWindow = document.querySelector('.popup-window');
popupWindow.addEventListener('click', (e) => {
  if (e.target && e.target.matches('i.minimize-card')) {
    popupWindow.innerHTML = '';
  }
});
