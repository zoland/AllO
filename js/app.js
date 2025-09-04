class AllO {
    constructor() {
        console.log("🚀 AllO Touch UI запущен");
        this.activeNavBtn = "connectionBtn";
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDeviceStats();
    }

    bindEvents() {
        document.getElementById("logoBtn").addEventListener("click", () => this.showInfo());
        document.getElementById("settingsBtn").addEventListener("click", () => this.openSettings());
        document.getElementById("closeInfoBtn").addEventListener("click", () => this.closeInfo());
        document.getElementById("addFolderBtn").addEventListener("click", () => this.addFolder());
        document.getElementById("searchInput").addEventListener("input", (e) => this.searchFolders(e.target.value));

        ["connectionBtn", "contactsBtn", "settingsNavBtn", "networkBtn", "voiceBtn"].forEach(id => {
            document.getElementById(id).addEventListener("click", () => this.switchNav(id));
        });

        document.querySelectorAll(".folder-card[data-folder]").forEach(card => {
            card.addEventListener("click", () => this.openFolder(card.dataset.folder));
        });

        document.getElementById("infoModal").addEventListener("click", (e) => {
            if (e.target.id === "infoModal") this.closeInfo();
        });
    }

    switchNav(btnId) {
        document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
        document.getElementById(btnId).classList.add("active");
        this.activeNavBtn = btnId;
        this.handleNavAction(btnId);
    }

    handleNavAction(btnId) {
        const actions = {
            connectionBtn: () => this.showNotification("📶 Проверка соединения...", "info"),
            contactsBtn: () => this.showNotification("👥 Загрузка контактов...", "info"),
            settingsNavBtn: () => this.showNotification("⚙️ Открытие настроек...", "info"),
            networkBtn: () => this.showNotification("🌐 Сканирование сети...", "info"),
            voiceBtn: () => this.showNotification("📝 Голосовые команды готовы", "info")
        };
        actions[btnId]?.();
    }

    openFolder(folderName) {
        this.showNotification(`📁 Открытие папки: ${folderName}`, "info");
    }

    addFolder() {
        this.showNotification("➕ Создание новой папки...", "info");
    }

    searchFolders(query) {
        if (query.length > 2) {
            this.showNotification(`🔍 Поиск: ${query}`, "info");
        }
    }

    showInfo() {
        document.getElementById("infoModal").classList.add("active");
    }

    closeInfo() {
        document.getElementById("infoModal").classList.remove("active");
    }

    openSettings() {
        this.showNotification("⚙️ Настройки системы", "info");
    }

    updateDeviceStats() {
        setTimeout(() => {
            this.showNotification("📊 Статистика обновлена", "success");
        }, 1000);
    }

    showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.textContent = message;
        const colors = {
            info: "#1e3a8a",
            success: "#10dc60",
            warning: "#ffce00",
            error: "#f04141"
        };
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: ${colors[type]};
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            z-index: 2000;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            backdrop-filter: blur(10px);
            font-size: 0.9rem;
            max-width: 90%;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

const app = new AllO();
