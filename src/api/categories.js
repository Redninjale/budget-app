import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api'; // Adjust the base URL as needed

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const getPurchasesByCategoryAndAccount = async (category, accountId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories/${category}/accounts/${accountId}/purchases`);
        return response.data;
    } catch (error) {
        console.error('Error fetching purchases by category and account:', error);
        throw error;
    }
};

export const getCategoryPurchases = async (category, month, year) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories/${category}/purchases`, {
            params: { month, year },
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching category purchases:', error);
        throw error;
    }
};
