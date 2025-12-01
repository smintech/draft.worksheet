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
    const coinprices = [];
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

const allrowInputBtn = document.getElementById("allrowinputbtn");
let editMode = false;
  allrowInputBtn.addEventListener("click", () => {
    editMode = !editMode;
    const cells = document.querySelectorAll("#timetable tbody tr.editable td");
    cells.forEach(cell => {
      cell.contentEditable = editMode ? "true" : "false";
      if (editMode) cell.classList.add("edit");
      else cell.classList.remove("edit");
    });
    allrowInputBtn.innerText = editMode ? "Stop Editing" : "Edit All Rows";
 });
let selectedColumn = null;
let previousHeader = null;

document.querySelectorAll(".columnheader").forEach(header => {
    header.addEventListener("click", function () {

        if (previousHeader) {
            previousHeader.style.backgroundColor = "";
        }
        selectedColumn = this.dataset.column;
        previousHeader = this;
        this.style.backgroundColor = "grey";

        console.log("Selected column:", selectedColumn);
    });
});
document.getElementById("appllytoall").addEventListener("click", function () {

    if (!selectedColumn) {
        alert("Select a column first.");
        return;
    }

    const inputField = document.getElementById("tablerowinput");
    const values = inputField.value.split(",").map(v => v.trim());

    const targetInputs = document.querySelectorAll("." + selectedColumn);

    if (values.length < targetInputs.length) {
        alert("Not enough values for all rows!");
        return;
    }

    targetInputs.forEach((input, i) => {
        input.value = values[i] || "";
    });

    alert("Column updated successfully!");
});
const table = document.getElementById('timetable');
const saveBtn = document.getElementById("savebtn");
const resetBtn = document.getElementById("resetbtn");
saveBtn.addEventListener("click", () => {
    const inputs = document.querySelectorAll("#timetable input");
    const hasValue = Array.from(inputs).some(input => {
        const val = input.value.trim();
        return val !== "" && val !== "Add" && val !== "BREAK";
    });

    if (!hasValue) {
        alert("Cannot save an empty or default table.");
        return;
    }
    inputs.forEach(input => input.setAttribute("value", input.value));

    localStorage.setItem('savedTableHTML', table.innerHTML);
    alert('Saved successfully!');
})
resetBtn.addEventListener("click", () => {
    const saved = localStorage.getItem("savedTableHTML");
    if (!saved) {
        alert("No saved timetable yet.");
        return;
    }
    table.innerHTML = saved;
    alert("Restored successfully!");
})


const fileInput = document.getElementById('fileinput');
const previewImg = document.getElementById('previewimg');
const previewVid = document.getElementById('previewvid');
const placeholderText = document.getElementById('placeholdertext');
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    previewImg.style.display = 'none';
                    previewVid.style.display = 'none';
                    placeholderText.style.display = 'none';
                    
                    if (file.type.startsWith('image/')) {
                        
                        previewImg.src = e.target.result;
                        previewImg.style.display = 'block';
                    } else if (file.type.startsWith('video/')) {
                        
                        previewVid.src = e.target.result;
                        previewVid.style.display = 'block';
                        previewVid.load();
                    };

                reader.readAsDataURL(file);

            } else {
                previewImg.style.display = 'none';
                previewVid.style.display = 'none';
                placeholderText.textContent = 'Preview area. Select a file above.';
                placeholderText.style.display = 'block';
            }
});