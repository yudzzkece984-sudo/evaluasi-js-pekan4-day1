const API = {
    fetchRandomInspiration: async () => {
        const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
        try {
            const response = await fetch(URL);
            if (!response.ok) throw new Error('Gagal fetch API');

            const data = await response.json();
            return data.meals ? data.meals[0] : null;

        } catch (error) {
            console.error("Error fetching API:", error);
            return null;
        }
    }
};
