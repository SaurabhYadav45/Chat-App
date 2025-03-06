import axios from "axios";


// Delete Message
export const deleteMessage = async (messageId, token) => {
    try {
        const URL = `${import.meta.env.VITE_BASE_URL}/message/delete-message/${messageId}`
        const response = await axios.delete(URL, {
            headers:{Authorization: `Bearer ${token}`}
        });
        console.log("Message deleted:", response);
        return response;
    } catch (error) {
        console.error("Message Deleting API Error..:", error.response || error.message);
    }
};

// handle Delete chat
export const deleteChat = async (recieverId, token) => {
    try {
        const URL = `${import.meta.env.VITE_BASE_URL}/message/delete-chat/${recieverId}`
        const response = await axios.delete(URL, {
            headers:{Authorization : `Bearer ${token}`}
        });

        console.log(" Complete Chat deleted:", response);
        return response;
    } catch (error) {
        console.error("Error deleting chat:", error.response?.data || error.message);
    }
};


// Delete Account

export const deleteAccount = async (token) => {
    try {
        const URL = `${import.meta.env.VITE_BASE_URL}/user/delete-account`
        const response = await axios.delete(URL, {
            headers:{Authorization: `Bearer ${token}`},
            withCredentials:true,
        });
        return response;
    } catch (error) {
        console.error("Delete Account API Errror.....:", error);
    }
};

