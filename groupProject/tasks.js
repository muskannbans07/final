function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
}


document.addEventListener('DOMContentLoaded', function () {
  const addRow = document.querySelector('.tasks-section #add-row');

  addRow.addEventListener('click', function () {
    const tableBody = document.querySelector('.tasks-table tbody');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="text" placeholder="Enter task..." class="task-input" /></td>
      <td><span class="status-tag status not-started">● Not started</span></td>
      <td><input type="date" class="date-input" /></td>
      <td>Joyce</td>
      <td>${new Date().toLocaleDateString()}</td>
    `;

    const inputField = newRow.querySelector('.task-input');
    const dateInput = newRow.querySelector('.date-input');

    inputField.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') saveRow();
    });

    dateInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') saveRow();
    });

    function saveRow() {
      const taskText = inputField.value.trim();
      const dueDate = dateInput.value;
      if (!taskText || !dueDate) return;

      newRow.innerHTML = `
        <td>
          <span class="task-title">${taskText}</span>
          <input type="text" class="task-title-input hidden" value="${taskText}" />
        </td>
        <td>
          <div class="status-container">
            <span class="status-tag status not-started">● Not started</span>
            <select class="status-dropdown hidden">
              <option value="not-started">Not started</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </td>
        <td>
          <span class="due-date-text">${formatDate(dueDate)}</span>
          <input type="date" class="task-date-input hidden" value="${dueDate}" />
        </td>
        <td>Joyce</td>
        <td class="last-edited">${new Date().toLocaleDateString()}</td>
      `;

      const statusSpan = newRow.querySelector('.status-tag');
      const statusDropdown = newRow.querySelector('.status-dropdown');
      const titleSpan = newRow.querySelector('.task-title');
      const titleInput = newRow.querySelector('.task-title-input');
      const lastEdited = newRow.querySelector('.last-edited');

      titleSpan.addEventListener('click', () => {
        titleSpan.classList.add('hidden');
        titleInput.classList.remove('hidden');
        titleInput.focus();
      });

      titleInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newTitle = titleInput.value.trim();
          if (newTitle) {
            titleSpan.textContent = newTitle;
            titleInput.value = newTitle;
            titleSpan.classList.remove('hidden');
            titleInput.classList.add('hidden');
            lastEdited.textContent = new Date().toLocaleDateString();
          }
        }
      });

      titleInput.addEventListener('blur', () => {
        titleInput.classList.add('hidden');
        titleSpan.classList.remove('hidden');
      });

      statusSpan.addEventListener('click', () => {
        statusSpan.classList.add('hidden');
        statusDropdown.classList.remove('hidden');
        statusDropdown.focus();
      });

      statusDropdown.addEventListener('change', () => {
        const value = statusDropdown.value;
        statusSpan.textContent =
          value === 'in-progress'
            ? '● In progress'
            : value === 'done'
            ? '● Done'
            : '● Not started';

        statusSpan.className = `status-tag status ${value}`;
        statusDropdown.classList.add('hidden');
        statusSpan.classList.remove('hidden');
        lastEdited.textContent = new Date().toLocaleDateString();
      });

      statusDropdown.addEventListener('blur', () => {
        statusDropdown.classList.add('hidden');
        statusSpan.classList.remove('hidden');
      });

      const dueDateSpan = newRow.querySelector('.due-date-text');
      const dueDateInput = newRow.querySelector('.task-date-input');
          
      dueDateSpan.addEventListener('click', () => {
        dueDateSpan.classList.add('hidden');
        dueDateInput.classList.remove('hidden');
        dueDateInput.focus();
      });
      
      dueDateInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newDate = dueDateInput.value;
          if (newDate) {
            dueDateSpan.textContent = formatDate(newDate);
            dueDateInput.value = newDate;
            dueDateSpan.classList.remove('hidden');
            dueDateInput.classList.add('hidden');
            lastEdited.textContent = new Date().toLocaleDateString();
          }
        }
      });
      
      dueDateInput.addEventListener('blur', () => {
        dueDateInput.classList.add('hidden');
        dueDateSpan.classList.remove('hidden');
      });

    }

    tableBody.insertBefore(newRow, addRow);
    inputField.focus();
  });
});
