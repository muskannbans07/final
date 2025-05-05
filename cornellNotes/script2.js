function saveCourses() {
    localStorage.setItem('courses', JSON.stringify(courses));
}
  
function getCourses() {
    return JSON.parse(localStorage.getItem('courses')) || [];
}

function openModalForCourse(courseName) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-course-title');
    const notesList = document.getElementById('notes-list');
  
    modalTitle.textContent = courseName;
    notesList.innerHTML = ""; // Clear old notes
  
    const notes = courses[courseName] || [];
  
    notes.forEach(note => {
      const row = document.createElement('tr');
      row.innerHTML = 
      `<td class="note-title-cell">
          <p class="note-title" contenteditable="true">${note.title}
          <button class="open-note-btn" data-note-content="${note.title}">OPEN</button>
          <button class="delete-note-btn">delete</button>
        </td>
        <td>${note.created}</td>
        <td>${note.lastUpdated}</td>
        `;
      notesList.appendChild(row);
    });
  
    modal.style.display = 'block';
}


document.addEventListener('DOMContentLoaded', function() {

    let courses = getCourses(); // Get the courses from local storage or initialize empty array.

    if (courses.length === 0) {
        courses = [
            { title: "Data Structures" },
            { title: "Discrete Mathematics"},
            { title: "System Programming"}
        ];
    saveCourses();
    }

    function createNewCard() {
        const newCard = document.createElement('div');
        newCard.className = 'card';
      
        newCard.innerHTML = `
          <div class="card-edit-container">
            <button class="card-edit-btn">⋯</button>
            <div class="card-edit-menu">
              <div class="card-edit-option delete-course">Delete</div>
              <div class="card-edit-option change-image">Change Image</div>
            </div>
          </div>
          <img class="card-header-image" src="./pictures/notes-header.jpg">
          <p class="card-topic">
            <input type="text" class="new-course-input" placeholder="Enter course name..." />
          </p>
        `;
      
        const gridContainer = document.querySelector('.grid-container');
        const newPageCard = document.getElementById('new-page-card');
        gridContainer.insertBefore(newCard, newPageCard);
      
        // Handle course name input
        const input = newCard.querySelector('.new-course-input');
        input.focus();
        input.addEventListener('blur', finalizeCourseName);
        input.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') input.blur();
        });
      
        // Edit menu toggle
        const editButton = newCard.querySelector('.card-edit-btn');
        const editMenu = newCard.querySelector('.card-edit-menu');
      
        editButton.addEventListener('click', function(e) {
          e.stopPropagation();
          document.querySelectorAll('.card-edit-menu').forEach(menu => {
            if (menu !== editMenu) menu.style.display = 'none';
          });
          editMenu.style.display = editMenu.style.display === 'block' ? 'none' : 'block';
        });
      
        // Delete card
        const deleteBtn = newCard.querySelector('.delete-course');
        deleteBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          newCard.remove();
      
          const courseName = card.querySelector('.card-topic').textContent.trim();
          delete courses[courseName];
          saveCoursesToStorage();
          card.remove();
        });
      
      
        // Change image
        const changeImageBtn = newCard.querySelector('.change-image');
        changeImageBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'image/*';
          fileInput.style.display = 'none';
          fileInput.addEventListener('change', function() {
            const file = fileInput.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function(event) {
                newCard.querySelector('.card-header-image').src = event.target.result;
              };
              reader.readAsDataURL(file);
            }
          });
          document.body.appendChild(fileInput);
          fileInput.click();
          document.body.removeChild(fileInput);
        });
      
        newCard.addEventListener('click', function () {
          const topicElement = newCard.querySelector('.card-topic');
          const courseName = topicElement.textContent.trim();
          openModalForCourse(courseName);
        });
        
    }

    

});