class NavigationComponent {
    constructor() {
        this.activeBtn = "connectionBtn";
        this.bindEvents();
    }

    bindEvents() {
        ["connectionBtn", "contactsBtn", "settingsNavBtn", "networkBtn", "voiceBtn"].forEach(id => {
            document.getElementById(id).addEventListener("click", () => this.switchNav(id));
        });
    }

    switchNav(btnId) {
        document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
        document.getElementById(btnId).classList.add("active");
        this.activeBtn = btnId;
        this.handleNavAction(btnId);
    }

    handleNavAction(btnId) {
        const actions = {
            connectionBtn: () => NotificationManager.show("📶 Проверка соединения...", "info"),
            contactsBtn: () => NotificationManager.show("👥 Загрузка контактов...", "info"),
            settingsNavBtn: () => NotificationManager.show("⚙️ Открытие настроек...", "info"),
            networkBtn: () => NotificationManager.show("🌐 Сканирование сети...", "info"),
            voiceBtn: () => NotificationManager.show("📝 Голосовые команды готовы", "info")
        };
        actions[btnId]?.();
    }
}
