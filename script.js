document.getElementById("LoadUser").addEventListener("click", () => {
    fetch("https://raw.githubusercontent.com/smintech/draft.worksheet/main/users.json")
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