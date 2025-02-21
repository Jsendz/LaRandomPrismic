"use client";

import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import SubmitJSON from "submitjson"; // ✅ Use default import
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  message: z.string().min(1, 'Message is required'),
});
type FormData = z.infer<typeof formSchema>;

/**
 * Props for `Contact` Slice.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Contact Form Component using SubmitJSON
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {

  const [isSubmitted, setIsSubmitted] = useState(false);
  


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      reset();
      // Handle success (e.g., show a success message)
    } else {
      // Handle error
    }
  };

  return (
    <section className="relative w-full min-h-screen text-center text-white ">
      <div className="w-full  max-w-7xl mx-auto my-32">
        <div className=" flex flex-row justify-center ">


        <div className="w-1/3 z-10 max-w-2xl px-6 md:px-12 py-12 bg-white bg-opacity-90 rounded-lg shadow-lg text-black">
          {isFilled.richText(slice.primary.title) && (
            <div className="text-3xl md:text-5xl font-bold mb-4 text-left">
              <PrismicRichText field={slice.primary.title} />
            </div>
          )}
          {isFilled.richText(slice.primary.subtitle) && (
            <div className="text-gray-700 text-lg  mb-6 text-left">
              <PrismicRichText field={slice.primary.subtitle} />
            </div>
          )}

          {isSubmitted ? (
            <p className="text-green-600 text-center">Thank you! Your message has been received.</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-20">
            <div>
              <input
                type="text"
                {...register('name')}
                placeholder="Name"
                className="w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-500 outline-none px-2 py-1"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            
            <div>
              <input
                type="email"
                {...register('email')}
                placeholder="Email"
                className="w-full  border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-500 outline-none px-2 py-1"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
    
            <div>
              <textarea
                {...register('message')}
                placeholder="Your message"
                 className="w-full border border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-500 outline-none px-2 py-1"
              ></textarea>
              {errors.message && <p>{errors.message.message}</p>}
            </div>
    
            <button type="submit" className="w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">Send Message</button>
          </form>
          )}
        </div>
        <div className="w-1/2 hidden md:flex items-center justify-center relative p-1 border-4  border-white">
          {isFilled.image(slice.primary.background_image) && (
            <PrismicNextImage
              field={slice.primary.background_image}
              alt=""
              fill
              className="w-full h-full brightness-50 rounded-xl"
            />
          )}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
