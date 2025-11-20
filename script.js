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
const password = document.getElementById("password");
const showpassword = document.getElementById("showpassword");

    password.addEventListener("input", () => {
    const words = password.value;
    
    if (words === "") {
        showpassword.innerText = "Start typing your password...";
    } else {
        showpassword.innerText = "your password , " + password + "accepted!";
    }
});