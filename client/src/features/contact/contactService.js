import axios from "axios";

const SERVER_IP = "16.170.201.227";
/* "http://localhost:4000/api/contact", */
export const sendContactForm = async (formData) => {
  try {
    const response = await axios.post(
      `http://16.170.247.204/api/contact`,

      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
