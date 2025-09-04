class HeaderComponent {
    constructor() {
        this.dropdownOpen = false;
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById("logoBtn").addEventListener("click", () => this.showInfo());
        document.getElementById("menuBtn").addEventListener("click", () => this.toggleMenu());
        document.addEventListener("click", (e) => this.handleOutsideClick(e));
    }

    showInfo() {
        document.getElementById("infoModal").classList.add("active");
    }

    toggleMenu() {
        const dropdown = document.getElementById("headerDropdown");
        dropdown.classList.toggle("active");
        this.dropdownOpen = dropdown.classList.contains("active");
    }

    closeMenu() {
        document.getElementById("headerDropdown").classList.remove("active");
        this.dropdownOpen = false;
    }

    handleOutsideClick(e) {
        if (this.dropdownOpen && !e.target.closest(".menu-btn") && !e.target.closest(".dropdown-menu")) {
            this.closeMenu();
        }
    }

    openSettings() {
        NotificationManager.show("⚙️ Настройки системы", "info");
        this.closeMenu();
    }

    exportData() {
        const data = {
            folders: StorageManager.getFolders(),
            contacts: StorageManager.getContacts(),
            exported: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `allo-backup-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        NotificationManager.show("💾 Данные экспортированы", "success");
        this.closeMenu();
    }
}
