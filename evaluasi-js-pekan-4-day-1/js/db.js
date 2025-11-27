const DB = {
    getData: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    saveData: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getUsers: () => {
        return DB.getData('users') || [];
    },
    saveUser: (user) => {
        const users = DB.getUsers();
        users.push(user);
        DB.saveData('users', users);
    },
    getRecipesForUser: (userId) => {
        const allRecipes = DB.getData('recipes') || [];
        return allRecipes.filter(recipe => recipe.userId === userId);
    },
    saveRecipe: (recipe) => {
        const allRecipes = DB.getData('recipes') || [];
        allRecipes.push(recipe);
        DB.saveData('recipes', allRecipes);
    },
    deleteRecipe: (recipeId) => {
        let allRecipes = DB.getData('recipes') || [];
        allRecipes = allRecipes.filter(recipe => recipe.id !== recipeId);
        DB.saveData('recipes', allRecipes);
    },
    updateRecipe: (updatedRecipe) => {
        let allRecipes = DB.getData('recipes') || [];
        const index = allRecipes.findIndex(recipe => recipe.id === updatedRecipe.id);
        if (index !== -1) {
            allRecipes[index] = updatedRecipe;
            DB.saveData('recipes', allRecipes);
        }
    }
};
