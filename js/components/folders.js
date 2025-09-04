class FoldersComponent {
    constructor() {
        this.folders = StorageManager.getFolders();
        this.activeDropdown = null;
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        document.getElementById("addFolderBtn").addEventListener("click", () => this.showCreateDialog());
        document.getElementById("searchInput").addEventListener("input", (e) => this.searchFolders(e.target.value));
        document.addEventListener("click", (e) => this.handleOutsideClick(e));
    }

    render() {
        const foldersList = document.querySelector(".folders-list");
        const addFolderBtn = document.getElementById("addFolderBtn");
        foldersList.innerHTML = "";

        this.folders.forEach(folder => {
            const folderCard = this.createFolderCard(folder);
            foldersList.appendChild(folderCard);
        });

        foldersList.appendChild(addFolderBtn);
    }

    createFolderCard(folder) {
        const card = document.createElement("div");
        card.className = "folder-card";
        card.dataset.folder = folder.id;

        const hasActions = !folder.system;
        const statusBadges = this.createStatusBadges(folder);
        const details = folder.details && folder.details.length > 0 ? 
            `<div class="folder-details">${folder.details.map(d => `<span class="detail-item">${d}</span>`).join("")}</div>` : "";

        card.innerHTML = `
            <div class="folder-header">
                <div class="folder-info">
                    <span class="folder-icon">${folder.icon}</span>
                    <span class="folder-name">${folder.name} (${folder.deviceCount})</span>
                </div>
                <div class="status-badges">${statusBadges}</div>
            </div>
            ${details}
            ${hasActions ? this.createFolderActions(folder.id) : ""}
        `;

        card.addEventListener("click", (e) => {
            if (!e.target.closest(".folder-actions")) {
                this.openFolder(folder.id);
            }
        });

        return card;
    }

    createStatusBadges(folder) {
        let badges = "";
        if (folder.statusOk > 0) badges += `<span class="status-badge status-ok">${folder.statusOk}</span>`;
        if (folder.statusWarning > 0) badges += `<span class="status-badge status-warning">${folder.statusWarning}</span>`;
        if (folder.statusError > 0) badges += `<span class="status-badge status-error">${folder.statusError}</span>`;
        return badges;
    }

    createFolderActions(folderId) {
        return `
            <div class="folder-actions">
                <button class="folder-menu-btn" data-folder="${folderId}">⋯</button>
                <div class="folder-dropdown" id="dropdown-${folderId}">
                    <button class="folder-dropdown-item" onclick="foldersComponent.renameFolder('${folderId}')">
                        <span>✏️</span> Переименовать
                    </button>
                    <button class="folder-dropdown-item danger" onclick="foldersComponent.deleteFolder('${folderId}')">
                        <span>🗑️</span> Удалить
                    </button>
                </div>
            </div>
        `;
    }

    showCreateDialog() {
        const name = prompt("Введите название папки:");
        if (name && name.trim()) {
            const newFolder = StorageManager.createFolder(name.trim());
            this.folders = StorageManager.getFolders();
            this.render();
            NotificationManager.show(`📁 Папка "${name}" создана`, "success");
        }
    }

    renameFolder(folderId) {
        const folder = this.folders.find(f => f.id === folderId);
        if (folder) {
            const newName = prompt("Новое название папки:", folder.name);
            if (newName && newName.trim() && newName !== folder.name) {
                StorageManager.renameFolder(folderId, newName.trim());
                this.folders = StorageManager.getFolders();
                this.render();
                NotificationManager.show(`✏️ Папка переименована в "${newName}"`, "success");
            }
        }
        this.closeDropdowns();
    }

    deleteFolder(folderId) {
        const folder = this.folders.find(f => f.id === folderId);
        if (folder && confirm(`Удалить папку "${folder.name}"?\n\nВсе связи контактов с этой папкой будут удалены.`)) {
            StorageManager.deleteFolder(folderId);
            this.folders = StorageManager.getFolders();
            this.render();
            NotificationManager.show(`🗑️ Папка "${folder.name}" удалена`, "success");
        }
        this.closeDropdowns();
    }

    openFolder(folderId) {
        const folder = this.folders.find(f => f.id === folderId);
        if (folder) {
            NotificationManager.show(`📁 Открытие папки: ${folder.name}`, "info");
        }
    }

    searchFolders(query) {
        if (query.length > 2) {
            NotificationManager.show(`🔍 Поиск: ${query}`, "info");
        }
    }

    handleOutsideClick(e) {
        if (e.target.matches(".folder-menu-btn")) {
            const folderId = e.target.dataset.folder;
            this.toggleDropdown(folderId);
        } else if (!e.target.closest(".folder-dropdown")) {
            this.closeDropdowns();
        }
    }

    toggleDropdown(folderId) {
        this.closeDropdowns();
        const dropdown = document.getElementById(`dropdown-${folderId}`);
        if (dropdown) {
            dropdown.classList.add("active");
            this.activeDropdown = folderId;
        }
    }

    closeDropdowns() {
        document.querySelectorAll(".folder-dropdown").forEach(dropdown => {
            dropdown.classList.remove("active");
        });
        this.activeDropdown = null;
    }
}
