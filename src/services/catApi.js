import axios from "axios";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const BASE_URL = "https://api.thecatapi.com/v1";

export const fetchRandomCatImage = async (limit = 4) => {
  try {
    const response = await axios.get(`${BASE_URL}/images/search`, {
      params: { limit },
      headers: {
        "x-api-key": API_KEY,
      },
    });

    return response.data.filter((cat) => cat.id && cat.url);
  } catch (error) {
    console.error("Erro au buscar gato:", error);
    return [];
  }
};
