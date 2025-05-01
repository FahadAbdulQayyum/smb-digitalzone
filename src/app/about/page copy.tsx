"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./styles.css";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

    // Scroll-based rotation logic
    const handleScroll = (event: WheelEvent) => {
        const wheel = wheelRef.current;
        if (!wheel) return;
      
        // Safely retrieve the current rotation and ensure it's a number
        const currentRotation = parseFloat(gsap.getProperty(wheel, "rotation") as string) || 0;
      
        // Update rotation based on scroll direction
        const newRotation = currentRotation - event.deltaY * 0.5; // Adjust sensitivity with multiplier
      
        // Animate the rotation smoothly
        gsap.to(wheel, {
          rotation: newRotation,
          duration: 0.5, // Smooth animation duration
          ease: "power2.out",
        });
      };

    // Add scroll event listener
    const wheel = wheelRef.current;
    wheel?.addEventListener("wheel", handleScroll);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("resize", setup);
      wheel?.removeEventListener("wheel", handleScroll);
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
      description:
        "Led by our visionary founder, Simo Berrada, with over 25 years of cosmic experience in the UAE market, we're fueled by a passion for innovation and driven by a singular mission: to help businesses like yours ascend to cosmic greatness.",
      description1:
        "Thank you for considering SMB DigitalZone for your digital odyssey. We're thrilled to embark on this cosmic journey with you and guide your business toward the stars.",
      description2:
        "Contact us today to learn more about our services and how we can help you reach your objectives. Unlock the full potential of your online presence with SMB DigitalZone, your cosmic companion in the digital universe.",
    },
    {
      title: "Message from the Captain of the Starship 2",
      description:
        "Led by our visionary founder, Simo Berrada, with over 25 years of cosmic experience in the UAE market, we're fueled by a passion for innovation and driven by a singular mission: to help businesses like yours ascend to cosmic greatness.",
      description1:
        "Thank you for considering SMB DigitalZone for your digital odyssey. We're thrilled to embark on this cosmic journey with you and guide your business toward the stars.",
      description2:
        "Contact us today to learn more about our services and how we can help you reach your objectives. Unlock the full potential of your online presence with SMB DigitalZone, your cosmic companion in the digital universe.",
    },
    {
      title: "Message from the Captain of the Starship 3",
      description:
        "Led by our visionary founder, Simo Berrada, with over 25 years of cosmic experience in the UAE market, we're fueled by a passion for innovation and driven by a singular mission: to help businesses like yours ascend to cosmic greatness.",
      description1:
        "Thank you for considering SMB DigitalZone for your digital odyssey. We're thrilled to embark on this cosmic journey with you and guide your business toward the stars.",
      description2:
        "Contact us today to learn more about our services and how we can help you reach your objectives. Unlock the full potential of your online presence with SMB DigitalZone, your cosmic companion in the digital universe.",
    },
  ];

  interface cardString {
    tag: string;
    title: string;
    img?: string;
  }

  const cards: cardString[] = [
    {
      tag: "reach more customers with our smart SEO.",
      title: "Social Media Marketing",
      img: "/images/social.svg",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "Social Media Marketing",
      img: "/images/social.svg",
    },
    {
      tag: "reach more customers with our",
      title: "smart SEO",
    },
    {
      tag: "reach more customers with our smart SEO.",
      title: "SEOO",
      img: "/images/seo.svg",
    },
    {
        tag: "grow your traffic with our",
        title: "expert SEO services.",
    },
    {
        tag: "reach more customers with our smart SEO.",
        title: "Content Marketing",
        img: "/images/content.svg",
    },
    {
        tag: "reach more customers with our smart SEO.",
        title: "Content Marketing",
        img: "/images/content.svg",
    },
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
            {card.img ? <img src={card.img} alt={`Card ${index}`} /> : ""}
            <div className="card-content bg-gray-800 py-16 px-2 rounded-lg shadow-md shadow-black-200">
              <h2 className="text-white">{card.title}</h2>
              <p>{card.tag}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center h-screen">
        <Carousel
          opts={{
            align: "start",
            loop: true, // Enable infinite looping
          }}
          className="w-full max-w-lg"
        >
          <CarouselContent>
            {carouselContent.map((_, index) => (
              <CarouselItem key={index}>
                <div className="w-full">
                  <Card>
                    <CardContent className="flex items-center justify-center text-white py-24 w-full">
                      <span className="text-center">
                        <h2 className="text-sm uppercase pb-5 w-full font-semibold">
                          {_.title}
                        </h2>
                        <span className="space-y-2">
                          <p className="text-xs text-center font-extralight">
                            {_.description}
                          </p>
                          <p className="text-xs text-center font-extralight">
                            {_.description1}
                          </p>
                          <p className="text-xs text-center font-extralight">
                            {_.description2}
                          </p>
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