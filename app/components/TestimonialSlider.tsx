import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ayodeji Muyiwa Abiodun",
      role: "Project Manager • Access Bank Plc",
      image: "/images/user1.svg",
      content: "Well done bossman!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager • Tech Innovations",
      image: "/images/user2.svg",
      content:
        "Working with this developer was a game-changer for our project. Their technical expertise combined with an eye for design delivered a user interface that exceeded our expectations. Our conversion rates have increased by 35% since launch!",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "CEO • Startup Ventures",
      image: "/images/user3.svg",
      content:
        "I was impressed by the level of professionalism and skill demonstrated throughout our project. The attention to responsive design and accessibility concerns showed a deep understanding of modern web development practices.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    // <div className="w-full max-w-4xl mx-auto">
    //   <div
    //     className="relative bg-emerald-600 text-white rounded-lg p-8 shadow-lg"
    //     onMouseEnter={() => setIsAutoPlaying(false)}
    //     onMouseLeave={() => setIsAutoPlaying(true)}
    //   >
    //     <div className="mb-8">
    //       <h2 className="text-3xl font-bold mb-6">
    //         A master of frontend development with a keen design sensibility
    //       </h2>
    //       <p className="text-lg leading-relaxed">
    //         {testimonials[currentIndex].content}
    //       </p>
    //     </div>

    // <div className="flex items-center">
    //   <div className="flex-shrink-0 mr-4">
    //     <img
    //       src={testimonials[currentIndex].image}
    //       alt={testimonials[currentIndex].name}
    //       className="w-16 h-16 rounded-full object-cover border-2 border-white"
    //     />
    //   </div>
    //   <div>
    //     <h3 className="text-xl font-bold">
    //       {testimonials[currentIndex].name}
    //     </h3>
    //     <p className="text-emerald-200">
    //       {testimonials[currentIndex].role}
    //     </p>
    //   </div>
    // </div>

    //     <div className="absolute bottom-8 right-8 flex items-center space-x-2">
    //       <button
    //         onClick={goToPrevious}
    //         className="p-2 rounded-full bg-emerald-700 hover:bg-emerald-800 transition-colors"
    //         aria-label="Previous testimonial"
    //       >
    //         <ArrowLeft size={20} />
    //       </button>
    //       <button
    //         onClick={goToNext}
    //         className="p-2 rounded-full bg-emerald-700 hover:bg-emerald-800 transition-colors"
    //         aria-label="Next testimonial"
    //       >
    //         <ArrowRight size={20} />
    //       </button>
    //       <button
    //         onClick={toggleAutoPlay}
    //         className={`px-3 py-1 rounded text-sm ${
    //           isAutoPlaying ? "bg-emerald-800" : "bg-emerald-700"
    //         }`}
    //       >
    //         {isAutoPlaying ? "Pause" : "Auto"}
    //       </button>
    //     </div>

    //     <div className="absolute bottom-8 left-8 flex space-x-2">
    //       {testimonials.map((_, index) => (
    //         <button
    //           key={index}
    //           onClick={() => setCurrentIndex(index)}
    //           className={`w-3 h-3 rounded-full ${
    //             index === currentIndex ? "bg-white" : "bg-emerald-300"
    //           }`}
    //           aria-label={`Go to testimonial ${index + 1}`}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="w-full h-full ">
      <div
        className="relative flex flex-col justify-between text-white rounded-lg py-4 px-6 h-full "
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="mb-2 h-full w-full">
          

          <p
            style={{
              color: "var(--resume-foreground)",
            }}
            className="text-[14px] w-full h-full flex items-center justify-center font-[300] leading-relaxed"
          >
            "{testimonials[currentIndex].content}"
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
          </div>
          <div>
            <h3
              style={{
                color: "var(--resume-foreground)",
              }}
              className="text-[16px] font-bold"
            >
              {testimonials[currentIndex].name}
            </h3>
            <p
              style={{
                color: "var(--resume-foreground)",
              }}
              className="text-emerald-200 text-[14px]"
            >
              {testimonials[currentIndex].role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
