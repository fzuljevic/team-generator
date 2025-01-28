"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type FallingImageProps = {
  count?: number;
};

type ImagePosition = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  speed: number;
  size: number;
};

export default function FallingImage({ count = 20 }: FallingImageProps) {
  const [images, setImages] = useState<ImagePosition[]>([]);

  useEffect(() => {
    // Initialize random positions for each image
    const initialImages: ImagePosition[] = Array.from(
      { length: count },
      (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -100 - Math.random() * 500, // Start above viewport at different heights
        rotation: Math.random() * 360,
        speed: 2 + Math.random() * 3, // Random speed between 2 and 5
        size: 30 + Math.random() * 40, // Random size between 30 and 70
      })
    );

    setImages(initialImages);

    let animationFrameId: number;
    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed < duration) {
        setImages((prevImages) =>
          prevImages.map((img) => ({
            ...img,
            y: img.y + img.speed,
            rotation: img.rotation + 2,
            x: img.x + Math.sin(elapsed * 0.01) * 0.5, // Add slight horizontal movement
          }))
        );
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [count]);

  return (
    <>
      {images.map((img) => (
        <div
          key={img.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${img.x}px`,
            top: `${img.y}px`,
            transform: `rotate(${img.rotation}deg)`,
            transition: "transform 2s linear",
          }}
        >
          <Image
            src="/zlajo.png"
            alt="Zlajo"
            width={img.size}
            height={img.size}
            className="object-contain"
          />
        </div>
      ))}
    </>
  );
}
