const courses = {};

function saveCoursesToStorage() {
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


document.addEventListener('click', function(e) {
  // 1. Toggle the EDIT dropdown menu when clicking the EDIT button
  if (e.target.classList.contains('edit-note-btn')) {
    const dropdown = e.target.nextElementSibling;
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    return; // Stop here so it doesn't immediately close the dropdown
  }

  // 3. Delete option clicked
  if (e.target.classList.contains('delete-option')) {
    const row = e.target.closest('tr');
    row.remove();
    return; // Stop here
  }

  // 4. Close any open dropdown if you click outside
  document.querySelectorAll('.edit-dropdown').forEach(dropdown => {
    dropdown.style.display = 'none';
  });
});

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

function finalizeCourseName(e) {
  const input = e.target;
  const courseName = input.value.trim() || "Untitled Course";

  // Replace the input with plain text
  const parent = input.parentElement;
  parent.textContent = courseName;

  // Create entry in courses object
  courses[courseName] = [];

  // Save to localStorage
  saveCoursesToStorage();
}



document.addEventListener('DOMContentLoaded', () => {
  let courses = getCourses();

  const gridContainer = document.querySelector('.grid-container');
  const newPageCard = document.getElementById('new-page-card');
  const addNewButton = document.getElementById('add-new-button');
  const modal = document.getElementById('modal');
  
  const stored = localStorage.getItem('courses');
  if (stored) {
    const parsed = JSON.parse(stored);
    Object.assign(courses, parsed);
    Object.keys(courses).forEach(courseName => {
      createCardFromStorage(courseName);
    });
  }

  function createCardFromStorage(courseName) {
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
      <p class="card-topic">${courseName}</p>
    `;
  
    // Add click handler
    newCard.addEventListener('click', function () {
      openModalForCourse(courseName);
    });
  
    const gridContainer = document.querySelector('.grid-container');
    const newPageCard = document.getElementById('new-page-card');
    gridContainer.insertBefore(newCard, newPageCard);
  }
  

  // When you click inside the grid
  gridContainer.addEventListener('click', function(e) {
    const clickedCard = e.target.closest('.card');

    if (!clickedCard) return; // Clicked outside any card

    if (clickedCard.id === 'new-page-card') {
      // Clicked the "+ New page" card
      createNewCard();
    } else {
      // Clicked any normal card
      modal.style.display = 'block';
    }
  });

  // Also handle the "+ New" button on top
  addNewButton.addEventListener('click', createNewCard);

  const modalNewButton = document.querySelector('.modal-button');
  const notesList = document.querySelector('.notes-list'); 

  modalNewButton.addEventListener('click', function () {
    const today = new Date().toISOString().split('T')[0];
    const newRow = document.createElement('tr');
  
    newRow.innerHTML = `
      <td class="note-title-cell">
        <p class="note-title" contenteditable="true">New Note</p>
        <button class="open-note-btn">OPEN</button>
        <button class="delete-note-btn">DELETE</button>
      </td>
      <td>${today}</td>
      <td>${today}</td>
    `;
    notesList.appendChild(newRow);
  
    newRow.querySelector('.delete-note-btn').addEventListener('click', function () {
      newRow.remove();
    });
  });
  

  // Prevent clicks on edit button and menu from opening modal
  document.addEventListener('click', function(e) {
    if (e.target.closest('.card-edit-container')) {
      e.stopPropagation(); // STOP event before reaching card
    }
  });

  document.querySelectorAll('.card').forEach(card => {
    if (card.id !== 'new-page-card') {
      card.addEventListener('click', function() {
        const topicElement = this.querySelector('.card-topic');
        const courseName = topicElement.textContent.trim();
        openModalForCourse(courseName);
      });
    }
  });

  // NEW: Prevent clicks on Edit button and Edit menu from bubbling
  document.querySelectorAll('.card-edit-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // STOP bubbling
    });
  });

  document.querySelectorAll('.card-edit-menu').forEach(menu => {
    menu.addEventListener('click', function(e) {
      e.stopPropagation(); // STOP bubbling
    });
  });

  // Toggle the edit menu when clicking the 3 dots
  document.querySelectorAll('.card-edit-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // STOP event bubbling
    
      const editMenu = this.nextElementSibling; // Assuming .card-edit-menu is right after button
    
      if (editMenu.style.display === 'block') {
        editMenu.style.display = 'none';
      } else {
        // Close any other open menus first
        document.querySelectorAll('.card-edit-menu').forEach(menu => {
          menu.style.display = 'none';
        });
      
        editMenu.style.display = 'block';
      }
    });
  });

  // Also prevent dropdown menu clicks from bubbling
  document.querySelectorAll('.card-edit-menu').forEach(menu => {
    menu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });

  // Close any open edit menus when clicking anywhere else
  document.querySelectorAll('.card-edit-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // Important
  
      const editMenu = this.nextElementSibling;
  
      // Close other menus first
      document.querySelectorAll('.card-edit-menu').forEach(menu => {
        menu.style.display = 'none';
      });
  
      // Toggle this menu
      if (editMenu.style.display === 'block') {
        editMenu.style.display = 'none';
      } else {
        editMenu.style.display = 'block';
  
        // Attach listeners each time menu opens
        attachDropdownListeners(editMenu);
      }
    });
  });
  


  // Handle clicks on the Edit Menu options
  document.addEventListener('click', function(e) { 

    if (e.target.classList.contains('delete-course')) {
      // Delete option clicked
      const card = e.target.closest('.card');
      card.remove();
    
    } else if (e.target.classList.contains('change-image')) {
      // Change Image option clicked
      const card = e.target.closest('.card');
      const imageElement = card.querySelector('.card-header-image');
    
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
    
      fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            imageElement.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    
      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
    }
  });


  function attachDropdownListeners(editMenu) {
    const deleteBtn = editMenu.querySelector('.delete-course');
    const changeImageBtn = editMenu.querySelector('.change-image');
  
    deleteBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.card');
      card.remove();
    });
  
    changeImageBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.card');
      const imageElement = card.querySelector('.card-header-image');
  
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
  
      fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            imageElement.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
  
      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
  
      // Close menu after action
      editMenu.style.display = 'none';
    });
  }
});

document.addEventListener('click', function (event) {
document.querySelectorAll('.card-edit-menu').forEach(menu => {
  const btn = menu.parentElement.querySelector('.card-edit-btn');
  if (!menu.contains(event.target) && !btn.contains(event.target)) {
    menu.style.display = 'none';
  }
});
});


document.addEventListener("click", function (e) {
if (e.target && e.target.classList.contains("open-note-btn")) {
  const noteContent = e.target.dataset.noteContent;

  // Open the side panel
  const sidePanel = document.getElementById("sidePanel");
  const sidePanelContent = document.getElementById("sidePanelContent");

  sidePanelContent.innerHTML = `
  <h1>${e.target.dataset.noteTitle || 'Untitled Note'}</h1>
  <p><strong>Created:</strong> ${e.target.dataset.noteCreated || 'N/A'}</p>
  <p><strong>Last Updated:</strong> ${e.target.dataset.noteUpdated || 'N/A'}</p>
  <div class="main-content">
    <div contenteditable="true" placeholder="Start typing here..."></div>
  </div>
`;

  sidePanel.classList.add("open");
}
});

document.getElementById("closeSidePanel").addEventListener("click", function () {
document.getElementById("sidePanel").classList.remove("open");
});

  
