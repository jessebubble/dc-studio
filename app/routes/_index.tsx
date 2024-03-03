import type { MetaFunction } from "@remix-run/node";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "~/components/Button";

export const meta: MetaFunction = () => {
  return [
    { title: "Digital Canvas Studio" },
    { name: "description", content: "Digital Canvas Studio bridges the gap for K-12 creatives who love to explore the intersection of art and technology. We go beyond traditional after-school programs, offering a unique curriculum focused on Figma and Adobe Creative Cloud" },
  ];
};

export default function Index() {
  const images = [
    "https://res.cloudinary.com/jessebubble/image/upload/v1709503719/dc-studio/pexels-liliana-drew-8506328_hpzrqu.jpg",
    "https://res.cloudinary.com/jessebubble/image/upload/v1709503717/dc-studio/pexels-alexander-grey-1148998_icntmq.jpg",
    "https://res.cloudinary.com/jessebubble/image/upload/v1709503718/dc-studio/pexels-ketut-subiyanto-4473988_gcs701.jpg",
    "https://res.cloudinary.com/jessebubble/image/upload/v1709503719/dc-studio/pexels-rfstudio-3817580_demi0k.jpg",
    "https://res.cloudinary.com/jessebubble/image/upload/v1709503719/dc-studio/pexels-liliana-drew-8506324_fcd6v2.jpg",
    "https://res.cloudinary.com/jessebubble/image/upload/v1709503718/dc-studio/pexels-kamaji-ogino-5093673_qghoqp.jpg",
    "https://res.cloudinary.com/jessebubble/image/upload/v1709503719/dc-studio/pexels-vlada-karpovich-7026053_izr7an.jpg",
  ];

  return (
    <>
      <div className="h-screen w-full relative">
      <ImagesSlider images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 mt-24 sm:mt-32 lg:mt-40 mx-auto max-w-7xl text-center"
        >
          <motion.h1
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.2,
              },
            }}
          >
            <span className="font-display block text-base font-semibold text-white text-balance"
          >
              Digital Canvas Studio
            </span>
            <span className="sr-only"> - </span>

            <span 
              className="mx-auto font-display mt-6 block max-w-5xl text-balance text-5xl font-medium tracking-tight text-white sm:text-6xl"
            >
              From drawing to{" "}
              <span 
                style={{ 
                  WebkitTextStroke: '0.1rem #eee',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 10px #333'
                }}
              >
                design
              </span>
            </span>
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.3,
              },
            }}
            className="mt-6 max-w-3xl text-balance text-xl text-neutral-300 text-center mx-auto"
          >
            Digital Canvas Studio bridges the gap for K-12 creatives who love to explore the intersection of art and technology. 
            We go beyond traditional after-school programs, offering a unique curriculum focused on Figma and Adobe Creative Cloud 
          </motion.p>
          <Button 
            className="mt-8"
            href="#"
            invert={false}
          >
            <span style={{ animation: 'rotate-gradient 5s linear infinite' }}>
            Learn more &rarr;
          </span>
          </Button>
        </motion.div>
      </ImagesSlider>
      <style>
        {`
          @keyframes rotate-gradient {
            0%, 100% {
               background: linear-gradient(to right in oklch, oklch(90% .3 230), oklch(70% .3 340));
               -webkit-background-clip: text;
               color: transparent;
            }
            25% {
               background: linear-gradient(to right in oklch, oklch(87% .4 142), oklch(100% .4 95));
               -webkit-background-clip: text;
               color: transparent;
            }
            50% {
               background: linear-gradient(to right in oklab, oklch(100% .25 160), oklch(75% .5 260));
               -webkit-background-clip: text;
               color: transparent;
            }
            75% {
               background: linear-gradient(to right in oklab, oklch(100% .4 95), oklch(55% .45 350));
               -webkit-background-clip: text;
               color: transparent;
            }
         }
        `}
      </style>
      </div>
    </>
  );
}

const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
 
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };
 
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };
 
  useEffect(() => {
    loadImages();
  }, []);
 
  const loadImages = () => {
    setLoading(true);
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });
 
    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages as string[]);
        setLoading(false);
      })
      .catch((error) => console.error("Failed to load images", error));
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };
 
    window.addEventListener("keydown", handleKeyDown);
 
    // autoplay
    let interval: any;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
 
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, []);
 
  useEffect(() => {}, []);
 
  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };
 
  const areImagesLoaded = loadedImages.length > 0;
 
  return (
    <div
      className={clsx(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{
        backgroundColor: "#333",
      }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div
          className={clsx("absolute inset-0 bg-neutral-950/60 z-40", overlayClassName)}
        />
      )}
 
      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 object-cover object-center"
            alt="collection of children coloring, painting, and drawing on paper and canvas"
          />
        </AnimatePresence>
      )}
    </div>
  );
};