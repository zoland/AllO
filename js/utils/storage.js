class StorageManager {
    static FOLDERS_KEY = "allo_folders";
    static CONTACTS_KEY = "allo_contacts";

    static getFolders() {
        const folders = localStorage.getItem(this.FOLDERS_KEY);
        return folders ? JSON.parse(folders) : this.getDefaultFolders();
    }

    static saveFolders(folders) {
        localStorage.setItem(this.FOLDERS_KEY, JSON.stringify(folders));
    }

    static getContacts() {
        const contacts = localStorage.getItem(this.CONTACTS_KEY);
        return contacts ? JSON.parse(contacts) : [];
    }

    static saveContacts(contacts) {
        localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contacts));
    }

    static createFolder(name, icon = "📁") {
        const folders = this.getFolders();
        const newFolder = {
            id: Date.now().toString(),
            name: name,
            icon: icon,
            deviceCount: 0,
            statusOk: 0,
            statusWarning: 0,
            statusError: 0,
            details: [],
            created: new Date().toISOString()
        };
        folders.push(newFolder);
        this.saveFolders(folders);
        return newFolder;
    }

    static deleteFolder(folderId) {
        const folders = this.getFolders().filter(f => f.id !== folderId);
        this.saveFolders(folders);
        this.cleanupContactsFromFolder(folderId);
    }

    static renameFolder(folderId, newName) {
        const folders = this.getFolders();
        const folder = folders.find(f => f.id === folderId);
        if (folder) {
            folder.name = newName;
            this.saveFolders(folders);
        }
    }

    static cleanupContactsFromFolder(folderId) {
        const contacts = this.getContacts();
        const updatedContacts = contacts.map(contact => {
            if (contact.folders && contact.folders.includes(folderId)) {
                contact.folders = contact.folders.filter(id => id !== folderId);
            }
            return contact;
        });
        this.saveContacts(updatedContacts);
    }

    static getDefaultFolders() {
        return [
            {
                id: "all",
                name: "ВСЕ",
                icon: "📁",
                deviceCount: 12,
                statusOk: 3,
                statusWarning: 2,
                statusError: 1,
                details: [],
                system: true
            },
            {
                id: "home",
                name: "Дом",
                icon: "��",
                deviceCount: 5,
                statusOk: 2,
                statusWarning: 1,
                statusError: 0,
                details: ["🌡️25°C", "💧85%", "⚡2"]
            },
            {
                id: "work",
                name: "Работа",
                icon: "📁",
                deviceCount: 3,
                statusOk: 1,
                statusWarning: 0,
                statusError: 1,
                details: ["🔴 Сервер недоступен"]
            }
        ];
    }
}
