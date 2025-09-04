class AllO {
    constructor() {
        console.log("🚀 AllO запущен");
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateSystemInfo();
    }

    bindEvents() {
        document.getElementById("logoBtn").addEventListener("click", () => this.showInfo());
        document.getElementById("settingsBtn").addEventListener("click", () => this.openSettings());
        document.getElementById("infoBtn").addEventListener("click", () => this.showInfo());
        document.getElementById("closeInfoBtn").addEventListener("click", () => this.closeInfo());
        document.getElementById("connectionBtn").addEventListener("click", () => this.openConnection());
        document.getElementById("contactsBtn").addEventListener("click", () => this.openContacts());
        document.getElementById("scanBtn").addEventListener("click", () => this.scanDevices());
        document.getElementById("infoModal").addEventListener("click", (e) => {
            if (e.target.id === "infoModal") this.closeInfo();
        });
    }

    showInfo() {
        document.getElementById("infoModal").classList.add("active");
    }

    closeInfo() {
        document.getElementById("infoModal").classList.remove("active");
    }

    updateSystemInfo() {
        const info = document.getElementById("systemInfo");
        info.textContent = "WiFi: Готов | Устройств: 0 | Статус: Активен";
    }

    openSettings() {
        this.showNotification("Настройки в разработке", "info");
    }

    openConnection() {
        this.showNotification("Настройка связи в разработке", "info");
    }

    openContacts() {
        this.showNotification("Контакты в разработке", "info");
    }

    scanDevices() {
        this.showNotification("Поиск устройств...", "info");
        setTimeout(() => {
            this.showNotification("Устройства не найдены", "warning");
        }, 2000);
    }

    showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.textContent = message;
        const colors = { info: "#667eea", success: "#10dc60", warning: "#ffce00", error: "#f04141" };
        notification.style.cssText = `position:fixed;top:20px;right:20px;background:${colors[type]};color:white;padding:1rem 2rem;border-radius:10px;z-index:2000;box-shadow:0 4px 20px rgba(0,0,0,0.2);`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

const app = new AllO();
