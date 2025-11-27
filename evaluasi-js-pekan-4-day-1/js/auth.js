const AUTH = {
    currentUser: null, 
    register: (username, password) => {
        const users = DB.getUsers();
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            alert("Username sudah terdaftar!");
            return false;
        }
        const newUser = {
            id: Date.now().toString(),
            username: username,
            password: password
        };
        DB.saveUser(newUser);
        alert("Registrasi berhasil! Silakan login.");
        return true;
    },

    login: (username, password) => {
        const users = DB.getUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            AUTH.currentUser = user;
            DB.saveData('session', user.id);
            UI.setWelcomeMessage(user.username);
            UI.toggleViews(true);
            return true;
        } else {
            alert("Username atau password salah.");
            return false;
        }
    },

    logout: () => {
        AUTH.currentUser = null;
        DB.saveData('session', null);
        UI.setWelcomeMessage("Tamu");
        UI.toggleViews(false);
    },

    checkLoginStatus: () => {
        const userId = DB.getData('session');
        const users = DB.getUsers();
        
        if (userId) {
            AUTH.currentUser = users.find(u => u.id === userId);
            if (AUTH.currentUser) {
                UI.setWelcomeMessage(AUTH.currentUser.username);
                UI.toggleViews(true);
                const userRecipes = DB.getRecipesForUser(userId);
                UI.renderRecipeList(userRecipes);
                return true;
            }
        }
        UI.toggleViews(false);
        return false;
    }
};
