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
function getPrice(coin) {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd")
        .then(response => response.json())
        .then(data => {
             document.getElementById("price").innerText = 
            coin + " price: $ " + data.[coin].usd;
        })
        .catch (err => {
           priceDiv.innerText = "Error fetching crypto price!";
        });
}
function fetchWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&current_weather=true")
        .then(response => response.json())
        .then(data => {
             weatherDiv.innerText = "London temp: " + data.current_weather.temperature + "°C";
        })
        .catch (err => {
           weatherDiv.innerText = "Error fetching current weather!";
        });
}
getPrice("Bitcoin");
getPrice("Toncoin");
fetchWeather();
refreshDatabtn.addEventListener("click", () => {
    getPrice("Bitcoin");
    getPrice("Toncoin");
    fetchWeather();
});