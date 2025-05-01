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
  }
  
  const carouselContent: carouselProps[] = [
    {
      title: "Card 1",
      description: "This is the description for Card 1",
    },
    {
      title: "Card 2",
      description: "This is the description for Card 2",
    },
    {
      title: "Card 3",
      description: "This is the description for Card 3",
    },
    {
      title: "Card 4",
      description: "This is the description for Card 4",
    },
    {
      title: "Card 5",
      description: "This is the description for Card 5",
    },
    {
      title: "Card 6",
      description: "This is the description for Card 6",

    }
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
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {/* {Array.from({ length: 6 }).map((_, index) => ( */}
          {carouselContent.map((_, index) => (
            // <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            // <CarouselItem key={index} className="md:basis-1/6 lg:basis-1/2">
            <CarouselItem key={index} >
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center bg-boxColor text-white py-24">
                    <span className="text-3xl font-semibold">
                      <h2 className="text-3xl">{_.title}</h2>
                      <p className="text-xl">{_.description}</p>
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default App;