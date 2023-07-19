import axios from "axios";

const SERVER_IP = "13.53.134.165";

export const sendContactForm = async (formData) => {
  try {
    const response = await axios.post(
      `http://${SERVER_IP}/api/contact`,
      /* "http://localhost:4000/api/contact", */
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
