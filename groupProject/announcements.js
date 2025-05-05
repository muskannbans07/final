document.addEventListener('DOMContentLoaded', () => {
  const newButton = document.querySelector('.announcements-button');
  const inputForm = document.querySelector('.input-form');
  const inputField = document.querySelector('.announcement-input');
  const announcementsMain = document.querySelector('.announcements-main');

  // Show input form
  newButton.addEventListener('click', () => {
    inputForm.style.display = 'block';
    inputField.focus();
  });

  // Add new announcement on Enter
  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = inputField.value.trim();
      if (text !== '') {
        addAnnouncement(text);
        saveToLocalStorage();
        inputField.value = '';
        inputForm.style.display = 'none';
      }
    }
  });

  // Hide input form if clicked outside
  document.addEventListener('click', (e) => {
    if (
      inputForm.style.display === 'block' &&
      !inputForm.contains(e.target) &&
      e.target !== newButton
    ) {
      inputForm.style.display = 'none';
      inputField.value = '';
    }
  });

  // Click to edit text inline
  document.querySelector('.announcements-main').addEventListener('click', (e) => {
    const span = e.target.closest('.announcement-text');
    if (!span || span.isContentEditable) return;

    const originalText = span.textContent;
    span.contentEditable = true;
    span.classList.add('editing');
    span.focus();

    const finish = () => {
      span.contentEditable = false;
      span.classList.remove('editing');
      saveToLocalStorage();
    };

    const handleKey = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        finish();
      } else if (e.key === 'Escape') {
        span.textContent = originalText;
        finish();
      }
    };

    span.addEventListener('blur', finish, { once: true });
    span.addEventListener('keydown', handleKey);
  });

  // Load on page load
  loadFromLocalStorage();

  function addAnnouncement(text) {
    const wrapper = document.createElement('p');
    wrapper.classList.add('announcement-item');

    const pinImg = document.createElement('img');
    pinImg.src = './icons/pin-icon.svg'; // Adjust this path if needed
    pinImg.alt = 'Pin';
    pinImg.className = 'pin-icon';

    const span = document.createElement('span');
    span.textContent = text;
    span.classList.add('announcement-text');

    wrapper.appendChild(pinImg);
    wrapper.appendChild(span);
    announcementsMain.appendChild(wrapper);
  }

  function saveToLocalStorage() {
    const texts = Array.from(document.querySelectorAll('.announcement-text')).map(span => span.textContent);
    localStorage.setItem('announcements', JSON.stringify(texts));
  }

  function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('announcements') || '[]');
    data.forEach(text => addAnnouncement(text));
  }
});
