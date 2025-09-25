"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface HeroVideoDialogProps {
  animationStyle?: "from-left" | "from-right" | "from-center" | "fade";
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className = "",
}: HeroVideoDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const animationVariants = {
    "from-left": {
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -100, opacity: 0 },
    },
    "from-right": {
      initial: { x: 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 100, opacity: 0 },
    },
    "from-center": {
      initial: { scale: 0.5, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.5, opacity: 0 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  const variant = animationVariants[animationStyle];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          className={`relative cursor-pointer group ${className}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={thumbnailSrc}
              alt={thumbnailAlt}
              width={800}
              height={450}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 group-hover:bg-white/30 transition-colors duration-300"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </motion.div>
            </div>

            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-full h-auto p-0 border-0">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="relative"
              initial={variant.initial}
              animate={variant.animate}
              exit={variant.exit}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Video Container */}
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  </div>
                )}

                <video
                  src={videoSrc}
                  className={`w-full h-full object-cover ${
                    isVideoLoaded ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}
                  controls
                  autoPlay
                  onLoadedData={() => setIsVideoLoaded(true)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

// Hero Video Section Component
interface HeroVideoSectionProps {
  title: string;
  description: string;
  videoSrc: string;
  thumbnailSrc: string;
  className?: string;
}

export function HeroVideoSection({
  title,
  description,
  videoSrc,
  thumbnailSrc,
  className = "",
}: HeroVideoSectionProps) {
  return (
    <section className={`relative py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <HeroVideoDialog
            videoSrc={videoSrc}
            thumbnailSrc={thumbnailSrc}
            animationStyle="from-center"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
