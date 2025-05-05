const newPersonDiv = document.getElementById("new-person");

function createInputRow() {
  newPersonDiv.innerHTML = `
    <div class="people-input">
        <input type="text" placeholder="Name" required>
        <input type="tel" placeholder="Phone" required pattern="\\d{10,}">
        <input type="email" placeholder="Email" required>
    </div>
  `;

  const inputs = newPersonDiv.querySelectorAll("input");
  inputs[0].focus();

  inputs.forEach(input => {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const name = inputs[0].value.trim();
        const phone = inputs[1].value.trim();
        const email = inputs[2].value.trim();

        if (!name || !phone || !email) {
          alert("All fields are required!");
          return;
        }

        const person = { name, phone, email };

        // Save to localStorage
        let people = JSON.parse(localStorage.getItem("people") || "[]");
        people.push(person);
        localStorage.setItem("people", JSON.stringify(people));

        // Render on screen
        renderPerson(person);
        resetNewPersonInput();

      }
    });
  });
}

function enableInlineEditing() {
  document.querySelectorAll('.person-row').forEach((row, index) => {
    const nameEl = row.querySelector('.name');
    const phoneEl = row.querySelector('.ph-no');
    const emailEl = row.querySelector('.email');

    [nameEl, phoneEl, emailEl].forEach((el) => {
      el.addEventListener('blur', () => {
        const updatedName = nameEl.textContent.trim();
        const updatedPhone = phoneEl.textContent.trim();
        const updatedEmail = emailEl.textContent.trim();

        const people = JSON.parse(localStorage.getItem("people") || "[]");
        people[index] = { name: updatedName, phone: updatedPhone, email: updatedEmail };
        localStorage.setItem("people", JSON.stringify(people));
      });
    });
  });
}


function resetNewPersonInput() {
  newPersonDiv.innerHTML = `<div class="add-new-people">+ New</div>`;
}

newPersonDiv.addEventListener("click", () => {
  if (newPersonDiv.querySelector("input")) return; // Already editing
  createInputRow();
});

function submitPerson() {
    const name = document.getElementById("name-input").value.trim();
    const phone = document.getElementById("phone-input").value.trim();
    const email = document.getElementById("email-input").value.trim();
  
    if (!name || !phone || !email) {
      alert("Please fill out all fields.");
      return;
    }
  
    const person = { name, phone, email };
  
    // Save to localStorage
    let people = JSON.parse(localStorage.getItem("people") || "[]");
    people.push(person);
    localStorage.setItem("people", JSON.stringify(people));
  
    renderPerson(person);
  
    newPersonDiv.innerHTML = `<span class="add-new">+ New</span>`;
  }

  function renderPerson(person) {
    const newRow = document.createElement("div");
    newRow.classList.add("person-row");
    newRow.innerHTML = `
      <div class="docs-row">
        <div class="name" contenteditable="true" spellcheck="false">${person.name}</div>
        <div class="info">
          <div class="ph-no" contenteditable="true" spellcheck="false">${person.phone}</div>
          <div class="email" contenteditable="true" spellcheck="false">${person.email}</div>
        </div>
      </div>
    `;
    newPersonDiv.before(newRow);
    enableInlineEditing(); // 👈 Add this line
  }
  
  
  // Load saved people
  window.addEventListener("DOMContentLoaded", () => {
    const people = JSON.parse(localStorage.getItem("people") || "[]");
    people.forEach(renderPerson);
  });
  
