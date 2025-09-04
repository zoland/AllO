class HeaderComponent {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById("logoBtn").addEventListener("click", () => this.showInfo());
        document.getElementById("settingsBtn").addEventListener("click", () => this.openSettings());
    }

    showInfo() {
        document.getElementById("infoModal").classList.add("active");
    }

    openSettings() {
        NotificationManager.show("⚙️ Настройки системы", "info");
    }
}
