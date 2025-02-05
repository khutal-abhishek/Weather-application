const cursorTrail = document.querySelector('.cursor-trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;

    cursorDot.style.top = `${mouseY}px`;
});

// Smooth trailing effect
function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;

    cursorTrail.style.left = `${trailX}px`;
    cursorTrail.style.top = `${trailY}px`;

    requestAnimationFrame(animateTrail);
}

// Start the animation loop
animateTrail();


const apikey = "891216b0813b2f428ee554a4e0120741";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchBox = document.querySelector(".search input");
const searchBtn =document.querySelector(".search button");
const weatherIcon= document.querySelector(".weather-icon");

async function checkweather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);

  if(response.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
  else{

  

  var data = await response.json();

  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
  
  if(data.weather[0].main=="Clouds"){
    weatherIcon.src = "images/clouds.png";
  }
  else if(data.weather[0].main=="Clear"){
    weatherIcon.src = "images/clear.png";
  }
  else if(data.weather[0].main=="Rain"){
    weatherIcon.src = "images/rain.png";
  }
  else if(data.weather[0].main=="Drizzle"){
    weatherIcon.src = "images/drizzle.png";
  }
  else if(data.weather[0].main=="Mist"){
    weatherIcon.src = "images/mist.png";
  }



  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
} 
}

searchBtn.addEventListener("click",()=>{
  checkweather(searchBox.value);
})

