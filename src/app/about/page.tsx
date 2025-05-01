"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import "./styles.css";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Register GSAP plugins
gsap.registerPlugin(Draggable);

const App: React.FC = () => {
  // Refs with type annotations
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Initialize the wheel layout
    const setup = () => {
      const wheel = wheelRef.current;
      const images = imagesRef.current;

      if (!wheel || images.some((img) => !img)) return;

      const radius = wheel.offsetWidth / 2;
      const center = radius;
      const slice = 360 / images.length;
      const DEG2RAD = Math.PI / 180;

      gsap.set(images, {
        x: (i: number) => center + radius * Math.sin(i * slice * DEG2RAD),
        y: (i: number) => center - radius * Math.cos(i * slice * DEG2RAD),
        rotation: (i: number) => i * slice,
        xPercent: -50,
        yPercent: -50,
      });
    };

    // Initial setup
    setup();

    // Recalculate positions on window resize
    window.addEventListener("resize", setup);

    // Make the wheel draggable with rotation
    Draggable.create(wheelRef.current!, {
      allowContextMenu: true,
      type: "rotation",
      trigger: wheelRef.current!,
      inertia: true,
      snap: {
        rotation: gsap.utils.snap(360 / imagesRef.current.length),
      },
    });

    // Optional: Add a smooth rotation animation for visual effect
    gsap.to(wheelRef.current!, {
      rotation: -360,
      ease: "none",
      duration: imagesRef.current.length,
      repeat: -1, // Infinite rotation
    });

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("resize", setup);
    };
  }, []);

  interface carouselProps {
    title: string;
    description: string;
    description1: string;
    description2: string;
  }
  
  const carouselContent: carouselProps[] = [
    {
      title: "Message from the Captain of the Starship 1",
      description: "Led by our visionary founder, Simo Berrada, with over 25 years of cosmic experience in the UAE market, we're fueled by a passion for innovation and driven by a singular mission: to help businesses like yours ascend to cosmic greatness.",
      description1: "Thank you for considering SMB DigitalZone for your digital odyssey. We're thrilled to embark on this cosmic journey with you and guide your business toward the stars.",
      description2: "Contact us today to learn more about our services and how we can help you reach your objectives. Unlock the full potential of your online presence with SMB DigitalZone, your cosmic companion in the digital universe.",
    },
    {
      title: "Message from the Captain of the Starship 2",
      description: "Led by our visionary founder, Simo Berrada, with over 25 years of cosmic experience in the UAE market, we're fueled by a passion for innovation and driven by a singular mission: to help businesses like yours ascend to cosmic greatness.",
      description1: "Thank you for considering SMB DigitalZone for your digital odyssey. We're thrilled to embark on this cosmic journey with you and guide your business toward the stars.",
      description2: "Contact us today to learn more about our services and how we can help you reach your objectives. Unlock the full potential of your online presence with SMB DigitalZone, your cosmic companion in the digital universe.",
    },
    {
      title: "Message from the Captain of the Starship 3",
      description: "Led by our visionary founder, Simo Berrada, with over 25 years of cosmic experience in the UAE market, we're fueled by a passion for innovation and driven by a singular mission: to help businesses like yours ascend to cosmic greatness.",
      description1: "Thank you for considering SMB DigitalZone for your digital odyssey. We're thrilled to embark on this cosmic journey with you and guide your business toward the stars.",
      description2: "Contact us today to learn more about our services and how we can help you reach your objectives. Unlock the full potential of your online presence with SMB DigitalZone, your cosmic companion in the digital universe.",
    },
  ]

interface cardString {
  tag: string;
  title: string;
  img?: string;
}

  const cards: cardString[] = [
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEO",
      // img: "https://assets.codepen.io/756881/amys-6.jpg",
    },
  ]

  // Image URLs
  const imageUrls: string[] = [
    "https://assets.codepen.io/756881/amys-1.jpg",
    "https://assets.codepen.io/756881/amys-2.jpg",
    "https://assets.codepen.io/756881/amys-3.jpg",
    "https://assets.codepen.io/756881/amys-4.jpg",
    "https://assets.codepen.io/756881/amys-5.jpg",
    "https://assets.codepen.io/756881/amys-6.jpg",
    "https://assets.codepen.io/756881/amys-7.jpg",
    "https://assets.codepen.io/756881/amys-8.jpg",
    "https://assets.codepen.io/756881/amys-9.jpg",
    "https://assets.codepen.io/756881/amys-10.jpg",
    "https://assets.codepen.io/756881/amys-11.jpg",
    "https://assets.codepen.io/756881/amys-12.jpg",
    "https://assets.codepen.io/756881/amys-13.jpg",
    "https://assets.codepen.io/756881/amys-14.jpg",
    "https://assets.codepen.io/756881/amys-15.jpg",
    "https://assets.codepen.io/756881/amys-16.jpg",
    "https://assets.codepen.io/756881/amys-17.jpg",
    "https://assets.codepen.io/756881/amys-18.jpg",
    "https://assets.codepen.io/756881/amys-19.jpg",
    "https://assets.codepen.io/756881/amys-20.jpg",
    "https://assets.codepen.io/756881/amys-21.jpg",
    "https://assets.codepen.io/756881/amys-22.jpg",
    // "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    // "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9",
    // "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    // "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    // "https://images.unsplash.com/photo-1538370965046-79c0d6907d47",
    // "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    // "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9",
    // "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    // "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    // "https://images.unsplash.com/photo-1538370965046-79c0d6907d47"
  ];

  return (
    <div className="slider-section">
      <div className="wheel" ref={wheelRef}>
        {cards.map((card, index) => (
          <div
            className="wheel__card"
            key={index}
            ref={(el) => {
              imagesRef.current[index] = el; // Assign the element to the array
            }}
          >
            { card.img ? <img src={card.img} alt={`Card ${index}`} /> : ""}
            <div className="card-content bg-gray-800 py-16 px-2 rounded-lg shadow-md shadow-white">
              <h2 className="text-white">{card.title}</h2>
              <p>{card.tag}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4"> */}
      <div className="flex justify-center items-center h-screen">
        <Carousel
        opts={{
          align: "start",
          loop: true, // Enable infinite looping
        }}
        // className="w-full max-w-sm"
        className="w-full max-w-lg"
      >
        <CarouselContent>
          {/* {Array.from({ length: 6 }).map((_, index) => ( */}
          {carouselContent.map((_, index) => (
            // <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            // <CarouselItem key={index} className="md:basis-1/6 lg:basis-1/2">
            <CarouselItem key={index} >
              <div className="w-full">
                <Card>
                  <CardContent className="flex items-center justify-center text-white py-24 w-full">
                    <span className="text-center">
                      <h2 className="text-sm uppercase pb-5 w-full font-semibold">{_.title}</h2>
                      <span className="space-y-2">
                        <p className="text-xs text-center font-extralight">{_.description}</p>
                        <p className="text-xs text-center font-extralight">{_.description1}</p>
                        <p className="text-xs text-center font-extralight">{_.description2}</p>
                      </span>
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
         <CarouselPrevious />
        <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default App;