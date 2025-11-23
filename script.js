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
                priceDiv.innerHTML ="";
                
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
    fetch("https://api.open-meteo.com/v1/forecast?latitude=6.54433&longitude=-3.26379&current_weather=true")
        .then(response => response.json())
        .then(data => {
             weatherDiv.innerText = "Ikotun lagos weather: " + data.current_weather.temperature + "°C";
        })
        if (weather >= 15) {
            weatherDiv.innerText = "comfortable";
        } else if (weather <= 30) {
            weatherDiv.innerText = "its cool and warm! likely sunny";
        } else (weather >= 45) {
            weatherDiv.innerText = "Hot! hot sun";
        }
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
