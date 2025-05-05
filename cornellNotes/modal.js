document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById("modal");
  const card = document.querySelector(".card");
  const closeBtn = document.getElementById("closeModalBtn");
  const newPageCard = document.getElementById("new-page-card");

  // Handle opening modal when clicking normal cards
  document.querySelectorAll('.card').forEach(card => {
      if (card.id !== 'new-page-card') {
          card.addEventListener('click', function () {
              modal.style.display = 'block';
          });
      }
  });

  //Open modal
  card.onclick = function() {
    modal.style.display = "block";
  }

  // Close modal
  closeBtn.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Editable title functionality
  function addTitleEditFunctionality() {
      const updatedTitle = document.querySelector(".new-page");
      updatedTitle.addEventListener("click", function () {
          const input = document.createElement("input");
          input.type = "text";
          input.value = updatedTitle.innerText;
          input.className = "title-input";

          updatedTitle.replaceWith(input);
          input.focus();

          input.addEventListener("blur", function () {
              const newTitle = input.value.trim() || "Untitled";
              const newTitleElement = document.createElement("h1");
              newTitleElement.className = "new-page";
              newTitleElement.innerText = newTitle;
              input.replaceWith(newTitleElement);
              addTitleEditFunctionality();
          });

          input.addEventListener("keypress", function (e) {
              if (e.key === "Enter") {
                  input.blur();
              }
          });
      });
  }
  addTitleEditFunctionality();
});


