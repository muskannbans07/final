document.addEventListener('click', function (event) {
    // Handle click on dynamically added Open button
    if (event.target.classList.contains('open-note-btn')) {
      const sidePanel = document.getElementById('mySidePanel');
      if (sidePanel) {
        sidePanel.classList.add('open');
      }
    }
  
    // Handle click on close button inside the panel
    if (event.target.classList.contains('close-panel-btn')) {
      const sidePanel = document.getElementById('mySidePanel');
      if (sidePanel) {
        sidePanel.classList.remove('open');
      }
    }
  });

  window.openSidePanel = function (contentHtml) {
    const sidePanel = document.getElementById("mySidePanel");
    const panelContent = document.getElementById("panelContent");
  
    if (panelContent) {
      panelContent.innerHTML = contentHtml;
    }
  
    if (sidePanel) {
      sidePanel.classList.add("open");
    }
  };
  