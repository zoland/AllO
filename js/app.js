class AllO {
    constructor() {
        console.log("🚀 AllO Folders Manager запущен");
        this.init();
    }

    init() {
        window.headerComponent = new HeaderComponent();
        window.navigationComponent = new NavigationComponent();
        window.foldersComponent = new FoldersComponent();
        window.modalComponent = new ModalComponent();
        this.showWelcome();
    }

    showWelcome() {
        setTimeout(() => {
            NotificationManager.show("📁 Управление папками активно", "success");
        }, 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new AllO();
});
