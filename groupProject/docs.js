document.addEventListener("DOMContentLoaded", () => {
    const newDocBtn = document.getElementById("new-doc");
    const docsList = document.getElementById("docs-list");

    newDocBtn.addEventListener("click", () => {
        const newRow = document.createElement("div");
        newRow.className = "docs-row";

        const titleInput = document.createElement("input");
        titleInput.className = "doc-title-input";
        titleInput.placeholder = "Enter title";

        const linkInput = document.createElement("input");
        linkInput.type = "file";
        linkInput.id = `file-${Date.now()}`;
        linkInput.className = "doc-link-input";

        const fileLabel = document.createElement("label");
        fileLabel.className = "custom-file-label";
        fileLabel.setAttribute("for", linkInput.id);
        fileLabel.textContent = "Choose File";

        const tagsInput = document.createElement("input");
        tagsInput.className = "doc-tags-input";
        tagsInput.placeholder = "Tags (comma separated)";

        const submitButton = document.createElement("button");
        submitButton.textContent = "Add";
        submitButton.className = "doc-submit";

        submitButton.addEventListener("click", () => {
            const title = titleInput.value.trim();
            const file = linkInput.files[0];
            const tags = tagsInput.value.split(",").map(tag => tag.trim()).filter(Boolean);

            if (!title || !file) {
                alert("Title and file are required.");
                return;
            }

            const link = URL.createObjectURL(file);

            const docRow = document.createElement("div");
            docRow.className = "docs-row";

            const titleLinkWrapper = document.createElement("div");
            titleLinkWrapper.className = "title-link-wrapper";

            const titleDiv = document.createElement("div");
            titleDiv.className = "doc-title";
            titleDiv.textContent = title;

            const linkAnchor = document.createElement("a");
            linkAnchor.href = link;
            linkAnchor.target = "_blank";
            linkAnchor.className = "doc-link";
            linkAnchor.title = "Open document";

            const linkImg = document.createElement("img");
            linkImg.src = "./icons/link_icon.svg";
            linkImg.alt = "Link";
            linkImg.className = "link-img";

            linkAnchor.appendChild(linkImg);
            titleLinkWrapper.appendChild(titleDiv);
            titleLinkWrapper.appendChild(linkAnchor);

            const tagContainer = document.createElement("div");
            tagContainer.className = "doc-tags";
            tags.forEach(tag => {
                const tagSpan = document.createElement("span");
                tagSpan.className = "doc-tag";
                tagSpan.textContent = tag;
                tagContainer.appendChild(tagSpan);
            });

            docRow.appendChild(titleLinkWrapper);
            docRow.appendChild(tagContainer);

            newRow.replaceWith(docRow);
        });

        const fileWrapper = document.createElement("div");
        fileWrapper.className = "file-upload-wrapper";
        fileWrapper.appendChild(linkInput);
        fileWrapper.appendChild(fileLabel);

        newRow.appendChild(titleInput);
        newRow.appendChild(fileWrapper);
        newRow.appendChild(tagsInput);
        newRow.appendChild(submitButton);

        docsList.insertBefore(newRow, newDocBtn.parentElement);
    });
});
