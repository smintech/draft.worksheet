const users = [
    {name: "Alice", age: 20},
    {name: "Bob", age: 25},

document.getElementById("LoadUser").addEventListener("click", () => {
    const ul = document.getElementById("userlist");
    ul.innerHTML = "";
    users.forEach(user => {
        const li = document.createElement("li");
        li.innerText = user.name + " - " + user.age;
        ul.appendChild(li);
    });
});