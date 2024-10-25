'use client';
import React, { useState, useEffect, useCallback, FC } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Slide } from '@/types/Slides';
import { Button } from '../ui/Button';
import Arrow from '@/assets/icons/Arrow';
import { TextSection } from '../ui/TextSection';
import { Dots } from '../ui/Dots';

interface CarouselProps {
  slides: Slide[];
}

export const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragDirection, setDragDirection] = useState<number>(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  }, [slides.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  }, [slides.length]);

  const handleDragEnd = useCallback(
    (event: PointerEvent, info: PanInfo) => {
      const swipeThreshold = 50;
      const velocity = 0.5;

      if (Math.abs(info.velocity.x) > velocity && Math.abs(info.offset.x) > swipeThreshold) {
        if (info.offset.x > 0) {
          setDragDirection(-1);
          handlePrevious();
        } else {
          setDragDirection(1);
          handleNext();
        }
      }
    },
    [handleNext, handlePrevious],
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const startInterval = () => {
      timeoutId = setInterval(handleNext, 3000);
    };

    if (!isPaused) {
      startInterval();
    }

    return () => {
      if (timeoutId) {
        clearInterval(timeoutId);
      }
    };
  }, [isPaused, handleNext]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative w-full  overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative  h-[100dvh]  md:h-[100vh] w-[100vw]">
        <AnimatePresence initial={false} custom={dragDirection}>
          <motion.div
            key={currentIndex}
            custom={dragDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            onDragStart={() => setIsPaused(true)}
          >
            <div className="relative w-full h-full flex justify-center">
              <div className="w-[100vw] object-cover relative">
                <Image
                  src={slides[currentIndex].imageUrl}
                  alt={slides[currentIndex].title}
                  className="object-cover h-screen w-screen opacity-80 "
                  onDragStart={(e) => e.preventDefault()}
                  loading="lazy"
                />
                <TextSection
                  title={slides[currentIndex].title}
                  description={slides[currentIndex].description}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="block">
          <Button styles="left-4 rotate-180" onClick={handlePrevious}>
            <Arrow />
          </Button>
          <Button styles="right-4" onClick={handleNext}>
            <Arrow />
          </Button>
        </div>

        <Dots length={slides.length} action={setCurrentIndex} currentIndex={currentIndex} />
      </div>
    </div>
  );
};
