import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendContactFormAsync,
  resetFormState,
} from "../features/contact/contactSlice";
import DOMPurify from "dompurify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = formData;
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.contact);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize user input
    const sanitizedFormData = {
      name: DOMPurify.sanitize(formData.name),
      email: DOMPurify.sanitize(formData.email),
      message: DOMPurify.sanitize(formData.message),
    };

    dispatch(sendContactFormAsync(sanitizedFormData));
    setFormData({ name: "", email: "", message: "" }); // Reset form fields
  };

  // Reset form state on component unmount or success state
  useEffect(() => {
    return () => {
      dispatch(resetFormState());
    };
  }, [dispatch]);
  if (loading) {
    return (
      <div className="w-full flex-1 flex justify-center items-start h-screen">
        <span className="loading loading-spinner text-error w-14 mt-[10%]"></span>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto  bg-white rounded-3xl h-full  flex flex-col justify-center items-center">
      <h1 className="hiddenHSEO">Skillmatch Contact Page Form</h1>
      <h2 className="hiddenHSEO">
        Contact Skillmatch Support. Ask A Question. Submit Form.
      </h2>
      <section className="text-gray-400 body-font font-Poppins mb-8">
        <div className="container px-5 py-5 mx-auto bg-transparent rounded-b-xl">
          <div className="flex flex-col text-center w-full mb-4 bg-inherit mt-10 ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 text-[#000] bg-inherit font-Poppins">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl bg-inherit text-[#000]">
              Got a Question? Reach out!
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto bg-inherit">
            {success && (
              <p className="text-green-500 mb-4">Message sent successfully!</p>
            )}
            {error && (
              <p className="text-red-500 mb-4">
                Error occurred. Please try again.
              </p>
            )}
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap m-2 bg-inherit"
            >
              <div className="p-2 w-full bg-inherit">
                <div className="relative bg-inherit space-y-1">
                  <label
                    htmlFor="name"
                    className="leading-7 text-xl p-2 text-[#000] bg-inherit font-Poppins font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={handleChange}
                    className="input bg-black/5 text-lg text-black w-full leading-8 transition-colors duration-200 ease-in-out placeholder:text-black/40 "
                  />
                </div>
              </div>
              <div className="p-2 w-full  bg-inherit">
                <div className="relative bg-inherit space-y-1">
                  <label
                    htmlFor="email"
                    className="leading-7 text-xl p-2 text-[#000]  bg-inherit font-Poppins font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="my-email-address@xyz.com"
                    value={email}
                    onChange={handleChange}
                    className="w-full input bg-black/5 text-lg text-black            
                      leading-8 transition-colors duration-200 ease-in-out placeholder:text-black/40"
                  />
                </div>
              </div>
              <div className="p-2 w-full bg-inherit">
                <div className="relative bg-inherit space-y-1">
                  <label
                    htmlFor="message"
                    className="leading-7 text-xl p-2 text-[#000]  bg-inherit font-Poppins font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    placeholder="Your Message"
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full text-black bg-black/5 h-48 leading-6 transition-colors duration-200 ease-in-out text-lg placeholder:text-black/40 "
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full bg-inherit text-center">
                <button
                  type="submit"
                  className="btn btn-lg bg-[#1c1f21] hover:bg-[#d0333c] text-zinc-200 text-lg hover:border-white font-semibold hover:text-white min-w-fit max-w-xs w-full h-fit rounded-3xl uppercase transition-colors duration-300 ease-in-out"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>

            <div className="p-2 w-full pt-8 mt-8 mb-2 border-t border-[#d0333c] text-black/70 font-medium text-center bg-inherit flex flex-col">
              Contact us:
              <Link className="text-[#000] hover:text-[#d0333c] text-xl bg-transparent border-0 tracking-widest">
                skillmintofficial@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
