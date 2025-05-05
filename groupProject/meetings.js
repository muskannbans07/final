document.addEventListener("DOMContentLoaded", () => {
    const addRow = document.querySelector(".meetings-table .add-row");

    addRow.addEventListener("click", () => {
        const tbody = addRow.parentNode;
      
        const newRow = document.createElement("tr");
        newRow.classList.add("meetings-row");
      
        newRow.innerHTML = `
          <td><input class="meeting-title" placeholder="New Meeting" /></td>
          <td><input class="meeting-details" type="date" /></td>
          <td>
            <select class="meeting-type">
              <option value="In-Person">In-Person</option>
              <option value="Online">Online</option>
            </select>
          </td>
          <td contenteditable="true" class="objectives">- Objective 1<br>- Objective 2</td>
        `;
      
        tbody.insertBefore(newRow, addRow);
      
        const titleInput = newRow.querySelector(".meeting-title");
        const dateInput = newRow.querySelector(".meeting-details");
        const typeSelect = newRow.querySelector(".meeting-type");
        const objectivesTd = newRow.querySelector(".objectives");

        [titleInput, dateInput].forEach(input => {
            input.addEventListener("keydown", (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitRow();
              }
            });
          });

        objectivesTd.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submitRow();
          }
        });
      
        // Handle type styling
        typeSelect.addEventListener("change", (e) => {
          const span = document.createElement("span");
          span.classList.add("tag");
      
          if (e.target.value === "Online") {
            span.classList.add("online");
            span.textContent = "Online";
          } else {
            span.classList.add("inperson");
            span.textContent = "In-Person";
          }
      
          const td = e.target.parentNode;
          td.innerHTML = "";
          td.appendChild(span);
        });
      
        // ENTER key press handler
        function submitRow() {
            const title = titleInput.value.trim() || "Untitled";
            const date = dateInput.value || "No Date";
            const type = typeSelect.value;
            const objectives = objectivesTd.innerHTML;
        
            const tagClass = type === "Online" ? "online" : "inperson";
            const typeTag = `<span class="tag ${tagClass}">${type}</span>`;
        
            newRow.innerHTML = `
              <td contenteditable="true">${title}</td>
              <td contenteditable="true">${date}</td>
              <td class="mode-toggle">${typeTag}</td>
              <td contenteditable="true" class="objectives-td">${objectives}</td>
            `;

            newRow.querySelector(".mode-toggle .tag").addEventListener("click", function () {
                const tag = this;
                if (tag.textContent.trim().toLowerCase() === "online") {
                  tag.textContent = "In-Person";
                  tag.classList.remove("online");
                  tag.classList.add("inperson");
                } else {
                  tag.textContent = "Online";
                  tag.classList.remove("inperson");
                  tag.classList.add("online");
                }
              });
              
          }
      
          titleInput.focus(); // Set focus so the user can start typing
        
      });      

  });

  document.querySelectorAll(".mode-toggle").forEach(tag => {
    tag.addEventListener("click", () => {
      tag.textContent = tag.textContent.trim().toLowerCase() === "online"
        ? "In-person"
        : "Online";
    });
  });
  
  