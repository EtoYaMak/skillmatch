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

  return (
    <div className="max-w-6xl mx-auto  bg-[#2c3033] h-full  flex flex-col justify-center items-center">
      <section className="text-gray-400 body-font font-Inter mb-8">
        <div className="container px-5 py-5 mx-auto bg-[#1c1f21] rounded-b-xl">
          <div className="flex flex-col text-center w-full mb-4 bg-inherit mt-10 ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 text-[#d4d7d7] bg-inherit font-Inter">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl bg-inherit text-[#aba6a6]">
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
                    className="leading-7 text-xl p-2 text-[#d4d7d7] bg-inherit font-Inter font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    className="input bg-white/10 text-lg text-white/80 w-full leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full  bg-inherit">
                <div className="relative bg-inherit space-y-1">
                  <label
                    htmlFor="email"
                    className="leading-7 text-xl p-2 text-[#d4d7d7]  bg-inherit font-Inter font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="w-full input bg-white/10      text-lg text-white/80             
                      leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full bg-inherit">
                <div className="relative bg-inherit space-y-1">
                  <label
                    htmlFor="message"
                    className="leading-7 text-xl  text-[#d4d7d7]  bg-inherit font-Inter font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full bg-white/10 h-48 leading-6 transition-colors duration-200 ease-in-out text-lg text-white/80"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full bg-inherit">
                <button
                  type="submit"
                  className="btn btn-outline text-[#fff]/80 border-[#d0333c] hover:bg-[#d0333c] hover:border-[#d4d7d7] hover:text-[#d4d7d7]
                   flex mx-auto text-xl font-Inter tracking-widest w-[10em]"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>

            <div className="p-2 w-full pt-8 mt-8 mb-2 border-t border-[#d0333c] text-center bg-inherit">
              <Link className="text-[#d4d7d7]/80 hover:text-[#d0333c] text-xl bg-transparent border-0 tracking-widest">
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
