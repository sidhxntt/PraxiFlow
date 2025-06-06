"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";
import { Button } from "./button";
import { GlowingEffect } from "./ui/glowing-effect";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function HeroPro() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(" git clone --single-branch --branch pro  https://github.com/sidhxntt/Praxis.git");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const containerRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const parentRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  const { scrollY } = useScroll({
    target: parentRef,
  });

  const translateY = useTransform(scrollY, [0, 100], [0, -20]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.96]);
  const blurPx = useTransform(scrollY, [0, 100], [0, 5]);
  const filterBlurPx = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <div
      id="home2"
      ref={parentRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 md:px-8 md:pt-40 bg-black"
    >
      <Badge variant="secondary">Refining process going on for V2</Badge>
      <div className="text-balance relative z-20 mx-auto mb-4 mt-4 max-w-4xl text-center text-4xl font-semibold tracking-tight text-neutral-300 md:text-7xl">
        <Balancer>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              y: translateY,
              scale,
              filter: filterBlurPx,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              "inline-block bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)]",
              "bg-clip-text text-transparent"
            )}
          >
            Elevate your SaaS backend with{" "}
            <span className="text-green-500">Django</span>
          </motion.h2>
        </Balancer>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.5 }}
        className="relative z-20 mx-auto mt-4 max-w-xl px-4 text-center text-base/6 text-gray-500  sm:text-base"
      >
        Elevate your SaaS platform with Django – a robust, scalable, and secure
        backend framework that accelerates development without compromising on
        power or flexibility.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.7 }}
        className="mb-8 mt-6 sm:mb-10 sm:mt-8 flex w-full flex-col items-center justify-center gap-4 px-4 sm:px-8 sm:flex-row md:mb-20"
      >
        <Button
          onClick={handleCopy}
          variant="primary"
          className="w-full sm:w-40 h-12 rounded-full flex items-center justify-center"
        >
          {copied ? "Copied!" : "Get Started"}
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
        ref={containerRef}
        className="relative mx-auto w-full max-w-7xl p-2 backdrop-blur-lg md:p-4"
      >
        <div className="rounded-[50px] relative">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={5}
            blur={10}
          />
          {/* <Pricing/> */}
          <Image
            src="/api_home.png"
            alt="header"
            width={1920}
            height={1080}
            className="rounded-[20px]  h-auto object-cover w-full"
          />
          <div
            className="absolute inset-0 rounded-[20px]"
            style={{
              background:
                "linear-gradient(179.87deg, rgba(0, 0, 0, 0) 0.11%, rgba(0, 0, 0, 0.8) 69.48%, #000000 92.79%)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
