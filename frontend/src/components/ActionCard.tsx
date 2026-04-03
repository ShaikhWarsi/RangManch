'use client'

import React, { useEffect, useRef } from "react";
import "../styles/ActionCard.css";
import { gsap } from "gsap";

import Atropos from "atropos/react";
import "atropos/css";

interface ParallaxCardProps {
  images: string;
  title: string;
  delay: number;
  url: string;
  bgColor?: string;
  topPx: string;
  leftPx: string;
  heightSize: string;
  widthSize: string;
}

const ParallaxCard = ({
  images,
  title,
  delay,
  url,
  bgColor = "",
  topPx,
  leftPx,
  heightSize,
  widthSize,
}: ParallaxCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: delay * 0.05,
          ease: "power2.out"
        }
      );
    }
  }, [delay]);

  return (
    <div
      ref={cardRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        cursor: "pointer"
      }}
      onClick={() => {
      if (typeof window !== 'undefined') {
        window.location.href = url;
      }
    }}
    >
      <div className="overlap-2">
        <Atropos
          style={{
            height: "100%"
          }}
        >
          {/* <img
            className={"img"}
            src={Card_BG}
            alt={`Layer 1`}
          /> */}
          <div
            className="img"
            data-atropos-offset={"-2"}
            style={{
              backgroundColor: bgColor,
            }}
          ></div>
          <img
            style={{
              top: topPx,
              left: leftPx,
              height: heightSize,
              width: widthSize,
            }}
            className={"img-inside"}
            src={images}
            alt={`Layer 2`}
            data-atropos-offset={"0"}
          />
          <div className="text-wrapper">{title}</div>
        </Atropos>
      </div>
    </div>
  );
};

export default ParallaxCard;
