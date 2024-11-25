const eventList = document.querySelector('#event-list');
const eventInput = document.querySelector('#event-input');
const addEventBtn = document.querySelector('#add-event-btn')

//Lägg till en händelse i kalender
addEventBtn.addEventListener('click', addEvent)

function addEvent() {
  const eventText = eventInput.value.trim(); //tar bort whitespace tecken
  console.log(eventText)

  if (eventText) {
    const li =  document.createElement('li'); //skapar list-element
    li.textContent = eventText;
    eventList.style.background = 'lightgrey'

    //lägger till ta-bort knapp
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.style.marginLeft = '20px';

    //Lägger till funktion för att kunnna ta bort händelsen. 
    removeBtn.addEventListener('click', () => {
      li.remove();
    });

    li.appendChild(removeBtn); //lägger till ta-bort knapp vid list-elementet
    eventList.appendChild(li); //Lägger till listelement.
    eventInput.value = ''; //Tömmer fältet
  }
  else {
    alert('Du måste skriva något för att kunna lägga till en händelse')
  }
}

function updateClockAndDate() {
  const now = new Date(); // Hämtar aktuell tid och datum
  
  //Hämta tid
  const hours = String(now.getHours()).padStart(2, '0'); 
  const minutes = String(now.getMinutes()).padStart(2, '0'); 
  const seconds = String(now.getSeconds()).padStart(2, '0'); 

  const timeString = `${hours}:${minutes}:${seconds}`; // Bygger tidssträngen
  document.querySelector('#clock').textContent = timeString; // Uppdaterar klockan i HTML

  //Hämta datum
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); //Månader
  const day = String(now.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });

  document.querySelector('#date').textContent = `${weekday}, ${dateString}`;

  updateBackgroundAndGreeting(); //Anropar funnktion för att byta bakgrundsfärg
}

// Uppdaterar klockan och datum varje sekund 
setInterval(updateClockAndDate, 1000);

// Startar klockan direkt
updateClockAndDate();

//Ändra bakgrundsfärg beroende tid på dygnet
function updateBackgroundAndGreeting() {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 6 && hours < 12) { //Ger ljusblå färg om klockan är mellan 6-12
    document.body.style.background = 'radial-gradient(#a1c3f2, #5073af)';
    document.querySelector('#greeting').textContent = 'God morgon!'
  }
  else if (hours >= 12 && hours < 18) { //Ger blå färg om klockan är mellan 12-18
    document.body.style.background = 'radial-gradient(#a1c3f2, #1f7ee0)';
    document.querySelector('#greeting').textContent = 'God eftermiddag!'
  }
  else { //Ger mörkblå färg övrig tid
    document.body.style.background = 'radial-gradient(#a1c3f2, #07266d)';
    document.querySelector('#greeting').textContent = 'God kväll!'
  }
}

//Väderintegration
const apiKey = '//apinyckel';
const city = 'Göteborg';

function fetchWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sv`)
    .then(response => response.json())
    .thenn(data => {
      const weather = `${data.weather[0].description}, ${data.main.temp}°C`;
      document.querySelector('#weather').textContent = `Vädret i ${city}: ${weather}`;
     })
}

fetchWeather();