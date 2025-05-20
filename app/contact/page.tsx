"use client";

import React, { useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Image from "next/image";
import { toast } from "sonner"; // Using sonner instead of react-hot-toast
import { sendContactMessage } from "./_actions/contact";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    // Use Sonner's promise toast
    toast.promise(
      sendContactMessage(formData),
      {
        loading: 'Sending your message...',
        success: (result) => {
          if (result.success) {
            // Reset form on success
            setFormData({ name: "", email: "", message: "" });
            return 'Message sent successfully! I\'ll get back to you soon.';
          } else {
            throw new Error(result.message || 'Failed to send message');
          }
        },
        error: (err) => `${err.message || 'Something went wrong. Please try again later.'}`,
      }
    );
  } catch (error) {
    // Fallback error handling
    toast.error('Failed to send message. Please try again.');
    console.error("Error in toast handling:", error);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Layout>
      <div className="pt-[6rem] pb-[2rem] px-[2rem] w-full flex gap-6 ">
        <Card className="w-full h-[calc(100vh-8rem)] ">
          <div className="px-[2rem] h-full py-[2rem] flex flex-col">
            <div className=" w-full h-full flex items-center gap-4">
              <div className="w-[60%] z-10 flex flex-col gap-[1rem] h-full ">
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                  className="text-[1.5rem] "
                >
                  Get In Touch!
                </span>

                <form onSubmit={handleSubmit} className="w-full">
                  <div className="w-full flex flex-col mb-4">
                    <label
                      style={{
                        color: "var(--resume-foreground)",
                      }}
                      htmlFor="name"
                      className="mb-1"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`h-[2rem] w-full rounded-[8px] glass-card px-3 border ${errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="w-full flex flex-col mb-4">
                    <label
                      style={{
                        color: "var(--resume-foreground)",
                      }}
                      htmlFor="email"
                      className="mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`h-[2rem] w-full rounded-[8px] glass-card px-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="w-full flex flex-col mb-[1rem]">
                    <label
                      style={{
                        color: "var(--resume-foreground)",
                      }}
                      htmlFor="message"
                      className="mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full py-2 min-h-[5rem] rounded-[8px] glass-card px-3 border ${errors.message ? "border-red-500" : "border-gray-300"
                        }`}
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`px-4 py-2 cursor-pointer hover:scale-102 bg-[#a2bdf2] rounded-[8px] transition-all ${isSubmitting ? "opacity-70" : ""
                      }`}
                    disabled={isSubmitting}
                  >
                    <span className="text-black">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                  </button>
                </form>
              </div>
              <div className="relative w-[40%] h-full flex items-center justify-center">
                <Image
                  src="/images/me.png"
                  alt="me"
                  width={200}
                  height={200}
                  className="scale-x-[-1] absolute top-[10%]"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Contact;