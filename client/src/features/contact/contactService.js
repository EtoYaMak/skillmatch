import axios from "axios";

export const sendContactForm = async (formData) => {
  try {
    const response = await axios.post(
      `http://${process.env.SERVER_IP}/api/contact`,
      /* "http://localhost:4000/api/contact", */
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
