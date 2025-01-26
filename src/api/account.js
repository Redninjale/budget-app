import axios from 'axios';

const getPurchasesByAccount = async (accountId, month, year) => {
    try {
        const response = await axios.get(`/accounts/${accountId}/purchases`, {
            params: { month, year }
        });

        if (response.status !== 200) {
            throw new Error('Failed to get purchases');
        }

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default getPurchasesByAccount;