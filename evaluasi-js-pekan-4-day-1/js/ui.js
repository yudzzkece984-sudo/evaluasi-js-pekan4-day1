const UI = {
    authView: document.getElementById('auth-view'),
    dashboardView: document.getElementById('dashboard-view'),
    welcomeMessage: document.getElementById('welcome-message'),
    logoutButton: document.getElementById('logout-button'),
    recipeList: document.getElementById('recipe-list'),
    apiInspirationArea: document.getElementById('api-inspiration-area'),
    authTitle: document.getElementById('auth-title'),

    toggleViews: (isLoggedIn) => {
        if (isLoggedIn) {
            UI.authView.style.display = 'none';
            UI.dashboardView.style.display = 'block';
            UI.logoutButton.style.display = 'inline-block';
        } else {
            UI.authView.style.display = 'block';
            UI.dashboardView.style.display = 'none';
            UI.logoutButton.style.display = 'none';
        }
    },

    setWelcomeMessage: (username) => {
        UI.welcomeMessage.textContent = `Halo, ${username}!`;
    },

    renderRecipeList: (recipes) => {
        UI.recipeList.innerHTML = '';
        if (recipes.length === 0) {
            UI.recipeList.innerHTML = '<p>Belum ada resep. Tambahkan resep pertama Anda!</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card'); 
            recipeCard.innerHTML = `
                <div>
                    <h3>${recipe.name}</h3>
                    <p>${recipe.ingredients}</p>
                </div>
                <div>
                    <button onclick="deleteRecipeHandler('${recipe.id}')">Hapus</button>
                    <!-- TODO: Tambahkan tombol edit di sini -->
                </div>
            `;
            UI.recipeList.appendChild(recipeCard);
        });
    },

    renderApiInspiration: (meal) => {
        UI.apiInspirationArea.innerHTML = `
            <div class="inspiration-card">
                <h4>Inspirasi Hari Ini: ${meal.strMeal}</h4>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>Kategori: ${meal.strCategory}</p>
                <a href="${meal.strSource}" target="_blank">Lihat Sumber Resep Asli</a>
            </div>
        `;
    },

    toggleAuthMode: (mode) => {
        if (mode === 'register') {
            document.getElementById('register-form').style.display = 'block';
            document.getElementById('login-form').style.display = 'none';
            UI.authTitle.textContent = 'Register Akun Baru';
        } else {
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            UI.authTitle.textContent = 'Login ke Akun Anda';
        }
    }
};
