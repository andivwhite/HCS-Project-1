//create Template for JSON to populate

function createCard(card, index) {
  const cardTemplate = `
       <div class="column is-half">
                <div class="card">
                  <header class="card-header">
                    <p class="card-header-title">${card.city}</p>
                    <button data-index="${index}" class="delete is-small"></button>
                    <div class="card-image">
                  </header>
                  <div class="card-content">
                    <div class="content">
                      ${card.htmlContent}
                      </br>${card.tags}</div>
                      <div>
                        <time datetime="2022-1-1">${card.date}</time>
                      </div>
                      <div class="card">
                    
                      <div class="location">
                      <div id="weatherField-${card.city}">loading...</div>
                        <img class= "weatherIcon-${card.city}" src="${card.thumbnail}"/>
                    
                  </div>
                </div>
                <footer class="card-footer">
                    <a href="" class="card-footer-item"></a>
                  </footer>
                `;
  return cardTemplate;
}

let cards = [];

function renderCards() {
  cardContainer.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    cardContainer.innerHTML += createCard(card, i);
    fetchWeather(card.city);
  }
}

const cardContainer = document.querySelector("#cardContainer");
const weatherTemp = document.querySelector("#weatherTemp");
const weatherIcon = document.querySelector(".weatherIcon");

fetch("./data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    cards = result;
    renderCards();
  })
  .catch(function (error) {
    console.log(error);
    //alert("FFS Andi!");
  });

function fetchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b58e436ecc3483186c5452dde18fcb90&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      const icon = result.weather[0].icon;
      const weatherIcon = document.querySelector(`weatherIcon-${city}`);
      weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const weatherTemp = document.querySelector(`#weatherTemp-${city}`);
      weatherTemp.innerHTML = `${result.name}, ${result.weather[0].main}, temp ${result.main.temp}`;
    })
    .catch(function (error) {
      console.log(error);
    });
}
