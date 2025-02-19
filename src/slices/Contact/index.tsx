"use client"


import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    }
  };
  return (
    <section
    className="relative w-full min-h-screen text-center text-white"
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
  >
    {/* Background Image */}
    <div className="w-full flex flex-row">
      <div className="w-1/3 h-[550px] relative mt-3 border-4 border-white  ">
    {isFilled.image(slice.primary.background_image) && (
      <PrismicNextImage
        field={slice.primary.background_image}
        alt=""
        fill
        className=" w-full h-full brightness-50"
      />
    )}
    </div>

    {/* Contact Form Content */}
    <div className="w-full z-10 max-w-2xl mx-auto px-6 md:px-12 lg:px-20 py-12 bg-white bg-opacity-90 rounded-lg shadow-lg text-black">
      {isFilled.richText(slice.primary.title) && (
        <div className="text-3xl md:text-5xl font-bold mb-4 ">
          <PrismicRichText field={slice.primary.title} />
        </div>
      )}
      {isFilled.richText(slice.primary.subtitle) && (
        <div className="text-gray-700 text-lg text-center mb-6">
          <PrismicRichText field={slice.primary.subtitle} />
        </div>
      )}

      {/* Contact Form */}
      {isSubmitted ? (
            <p className="text-green-600 text-center">Thank you! Your message has been sent.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-lime-500"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-lime-500"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-lime-500"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-cyan-600 transition"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
    </div>
    </div>
  </section>
  );
};

export default Contact;
