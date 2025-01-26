import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api'; // Adjust the base URL as needed

export const getDailyTask = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/mistral/daily?month=01&year=2024`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching daily task:', error);
        throw error;
    }
};

