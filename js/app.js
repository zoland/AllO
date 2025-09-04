class AllO {
    constructor() {
        console.log("🚀 AllO Modular запущен");
        this.init();
    }

    init() {
        this.header = new HeaderComponent();
        this.navigation = new NavigationComponent();
        this.folders = new FoldersComponent();
        this.modal = new ModalComponent();
        this.updateStats();
    }

    updateStats() {
        setTimeout(() => {
            NotificationManager.show("📊 Модульная архитектура загружена", "success");
        }, 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new AllO();
});
