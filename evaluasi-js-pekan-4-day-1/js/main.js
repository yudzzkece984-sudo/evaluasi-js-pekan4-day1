window.deleteRecipeHandler = (recipeId) => {
    DB.deleteRecipe(recipeId);
    const updatedRecipes = DB.getRecipesForUser(AUTH.currentUser.id);
    UI.renderRecipeList(updatedRecipes);
    alert('Resep berhasil dihapus.');
};


document.addEventListener('DOMContentLoaded', () => {
    AUTH.checkLoginStatus();

    document.getElementById('login-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        AUTH.login(username, password);
        event.target.reset();
    });

    document.getElementById('register-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        AUTH.register(username, password);
        event.target.reset();
    });

    document.getElementById('logout-button').addEventListener('click', () => {
        AUTH.logout();
    });

    document.getElementById('toggle-register-button').addEventListener('click', () => {
        UI.toggleAuthMode('register');
    });
    document.getElementById('toggle-login-button').addEventListener('click', () => {
        UI.toggleAuthMode('login');
    });


    document.getElementById('add-recipe-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('recipe-name').value;
        const ingredients = document.getElementById('recipe-ingredients').value;
        
        const newRecipe = {
            id: Date.now().toString(),
            userId: AUTH.currentUser.id,
            name: name,
            ingredients: ingredients,
        };

        DB.saveRecipe(newRecipe);
        const updatedRecipes = DB.getRecipesForUser(AUTH.currentUser.id);
        UI.renderRecipeList(updatedRecipes); 
        event.target.reset();
        alert('Resep berhasil disimpan!');
    });
    document.getElementById('fetch-inspiration-button').addEventListener('click', async () => {
        const meal = await API.fetchRandomInspiration();
        if (meal) {
            UI.renderApiInspiration(meal); 
        } else {
            alert('Gagal mengambil inspirasi API. Coba lagi nanti.');
        }
    });

});

