class ModalComponent {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById("closeInfoBtn").addEventListener("click", () => this.close());
        document.getElementById("infoModal").addEventListener("click", (e) => {
            if (e.target.id === "infoModal") this.close();
        });
    }

    close() {
        document.getElementById("infoModal").classList.remove("active");
    }
}
