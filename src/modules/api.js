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