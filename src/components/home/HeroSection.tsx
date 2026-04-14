import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop",
    title: "Explore the World",
    subtitle: "Discover amazing destinations with Natours",
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    title: "Adventure Awaits",
    subtitle: "Experience nature like never before",
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&h=1080&fit=crop",
    title: "Create Memories",
    subtitle: "Join our guided tours worldwide",
  },
];

export default function HeroSection() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHeroIndex ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src={image.url}
            alt={image.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
              {image.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl">
              {image.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/tours"
                className={buttonVariants({
                  size: "lg",
                  className: "bg-primary-600 hover:bg-primary-700!",
                })}
              >
                Explore Tours
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
