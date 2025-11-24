document.getElementById("LoadUser").addEventListener("click", () => {
    fetch("users.json")
        .then(response => response.json())
        .then(data => {
            const ul = document.getElementById("userlist");
            ul.innerHTML = "";
            
            data.forEach(user => {
                const li = document.createElement("li");
                li.innerText = user.name + " - " + user.age;
                ul.appendChild(li);
            });
        });
});
document.getElementById("showNamebtn").addEventListener("click", () => {
    let name = document.getElementById("surname").value;
    if (name=="") {
        document.getElementById("result").innerText ="please enter your name";
    } else {
        document.getElementById("result").innerText = "your name is: " + name;
    }
});
document.getElementById("showAgebtn").addEventListener("click", () => {
    let age = document.getElementById("age").value;
    if (age=="") {
        document.getElementById("ageresult").innerText ="please enter your age";
    } else {
        document.getElementById("ageresult").innerText = "you are: " + age + " years old.";
    }
});
const passwordinput = document.getElementById("password");
const showPassword = document.getElementById("showpassword");

    passwordinput.addEventListener("input", () => {
    const words = passwordinput.value;
    
    if (words === "") {
        showPassword.innerText = "Start typing your password...";
    } else {
        showPassword.innerText = "your password :" + words + " accepted!";
    }
});
const priceDiv = document.getElementById("price");
const weatherDiv = document.getElementById("weather");
const refreshbtn= document.getElementById("refreshDatabtn");
function getPrice(coinId) {
    const together = coinId.join(",");
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${together}&vs_currencies=usd`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
                priceDiv.innerHTML ="Price from CoinGecko: <br>";
                
                coinId.forEach(coin => {
                    if (data[coin] && data[coin].usd) {
                    priceDiv.innerHTML += `${coin} price: $${data[coin].usd} <br>`;
                } else {
                    priceDiv.innerHTML += `Could not find price for ${coin}. <br>`;
                }
            });
        })
        .catch (err => {
           priceDiv.innerText = "Error fetching crypto price!";
    });
}
function fetchWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=6.54433&longitude=3.26379&current_weather=true")
        .then(response => response.json())
        .then(data => {
            temp = data.current_weather.temperature;
            let message = "";
            
            if (temp < 10) {
                message = "overcast! dark sky";
            } else if (temp >= 20) {
                message = "partly cloudy";
            } else if (temp >= 30) {
                message = "its cool and warm! likely sunny";
            } else {
                message = "Hot! hot sun";
            }
            weatherDiv.innerText = "Ikotun lagos weather: " + temp + "°C ~~" + message;
            })
            .catch (err => {
               weatherDiv.innerText = "Error fetching current weather!";
            });
}
document.addEventListener("DOMContentLoaded", function() {
    const coinprices = ['bitcoin','the-open-network'];
    getPrice(coinprices);
    fetchWeather();
    
    refreshDatabtn.addEventListener("click", () => {
    getPrice(coinprices);
    fetchWeather();
    });
});
const menuToggleBtn = document.getElementById("menu-toggle");
const closeMenuBtn = document.getElementById("close-menu");
const sidebarMenu = document.getElementById("sidebar-menu");
const overlay = document.getElementById("overlay2");

function openMenu() {
  sidebarMenu.classList.add('is-open');
  overlay.classList.add('is-visible');
}
function closeMenu() {
  sidebarMenu.classList.remove('is-open');
  overlay.classList.remove('is-visible');
}
menuToggleBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
