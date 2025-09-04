class AllO {
    constructor() {
        console.log("🚀 AllO: Запуск приложения...");
        this.init();
    }

    init() {
        console.log("🔧 AllO: Инициализация компонентов...");
        
        // Создаем компоненты в правильном порядке
        window.modalComponent = new ModalComponent();
        window.headerComponent = new HeaderComponent();
        window.navigationComponent = new NavigationComponent();
        window.foldersComponent = new FoldersComponent();
        
        console.log("✅ AllO: Все компоненты инициализированы");
        
        this.showWelcome();
    }

    showWelcome() {
        setTimeout(() => {
            NotificationManager.show("🏠 AllO готов к работе!", "success");
        }, 1000);
    }
}

// Запускаем приложение после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    console.log("📄 DOM загружен, запускаем AllO...");
    const app = new AllO();
});
