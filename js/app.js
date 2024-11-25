const form = document.querySelector("form");
const template = document.querySelector("template");
const tbody = document.querySelector("tbody");
const userCount = document.querySelector("#userCount")

let users = JSON.parse(localStorage.getItem('users'))  ?? [];

const makeUsers = () => {
     tbody.innerHTML = "";
     userCount.textContent = `All Users: ${users.length}`;
     users.forEach((user) => {
          const clone = template.content.cloneNode(true);
          const avatarImage = clone.querySelector(".avatar-image");
          const userName = clone.querySelector(".user-name");
          const age = clone.querySelector(".age");
          const bio = clone.querySelector(".bio");
          const deleteBtn = clone.querySelector(".delete-btn");

          deleteBtn.onclick = () => deleteItem(user.id);

          avatarImage.src = `https://picsum.photos/400?random=${Math.trunc(Math.random() * 1000)}`;
          userName.textContent = user.firstName;
          age.textContent = user.age;
          bio.textContent = `${user.bio.slice(0, 60)}...`;

          tbody.appendChild(clone)
     });
};


const deleteItem = (e) => {
     const filteredUsers = users.filter((user) => user.id !== e);
     users = filteredUsers;
     makeUsers();
     localStorage.setItem("users", JSON.stringify(users));
};


form.addEventListener("submit", (event) => {
     event.preventDefault();
     const firstName = form.firstName.value.trim();
     const age = Number(form.age.value.trim());
     const bio = form.bio.value;
     console.log(!Boolean(firstName), !Boolean(age), !Boolean(bio));
     

     if (!Boolean(firstName) || !Boolean(age) || !Boolean(bio)) {
          alert("Please, fill all fields");
          return;
     };

     users.push({id: Math.random(), firstName, age, bio});
     makeUsers();
     localStorage.setItem("users", JSON.stringify(users));
     form.reset();
});

if (users.length) {
     makeUsers();
};
