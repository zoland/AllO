class FoldersComponent {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById("addFolderBtn").addEventListener("click", () => this.addFolder());
        document.getElementById("searchInput").addEventListener("input", (e) => this.searchFolders(e.target.value));
        document.querySelectorAll(".folder-card[data-folder]").forEach(card => {
            card.addEventListener("click", () => this.openFolder(card.dataset.folder));
        });
    }

    openFolder(folderName) {
        NotificationManager.show(`📁 Открытие папки: ${folderName}`, "info");
    }

    addFolder() {
        NotificationManager.show("➕ Создание новой папки...", "info");
    }

    searchFolders(query) {
        if (query.length > 2) {
            NotificationManager.show(`🔍 Поиск: ${query}`, "info");
        }
    }
}
