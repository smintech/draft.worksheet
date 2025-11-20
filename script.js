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
document.getElementById("showName").addEventListener("click", () => {
    let name = document.getElementById("surname").value;
    document.getElementById("result").innerText = "Your name is: " + name;
});