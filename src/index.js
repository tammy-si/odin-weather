import './style.css';

// not the actual key
const API_KEY = 'OPEN_WEATHER_API_KEY';
const searchButton = document.querySelector('.search-button');

const searchForm = document.querySelector('.city-search>form');
const inputBox = document.querySelector('.city-search>form>input');
const error = document.querySelector('.error');

// this is for selecting the html
const infoDiv = document.querySelector('.info-container');
const main = document.querySelector('.main');
const cityText = document.querySelector('.city');
const mainTemp = document.querySelector('.main-temp');
const humidity = document.querySelector('.humidity');
const tempMin = document.querySelector('.temp-min');
const tempMax = document.querySelector('.temp-max');

// gets data from api based on the city given
async function getWeatherData(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`);
    // invalid city given
    if (response.status !== 200) {
      error.classList.add('active');
      infoDiv.classList.remove('active');
      return;
    }
    error.classList.remove('active');
    infoDiv.classList.add('active');
    const data = await response.json();
    main.textContent = data.weather[0].main;
    cityText.textContent = `${data.name}, ${data.sys.country}`;
    mainTemp.textContent = `${data.main.temp} ${String.fromCharCode(parseInt(2109, 16))}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    tempMin.textContent = `Low: ${data.main.temp_min} ${String.fromCharCode(parseInt(2109, 16))}`;
    tempMax.textContent = `High: ${data.main.temp_max} ${String.fromCharCode(parseInt(2109, 16))}`;
  } catch (e) {
    console.log(e);
  }
}

// clicking on the search button
searchButton.addEventListener('click', () => {
  const inputVal = inputBox.value;
  getWeatherData(inputVal);
});

// for if the user presses enter to try and search
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputVal = inputBox.value;
  getWeatherData(inputVal);
});
