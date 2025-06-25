const baseUrl = "https://api.themoviedb.org/3/movie";
const apiKey = import.meta.env.VITE_API_KEY;

//Petición películas GET

export async function getAllMovies() {
    const url = `${baseUrl}/now_playing?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(error);
        }

        const data = await response.json();
        console.log(data.results);

    } catch(error) {
        console.error(error);
    }
};

