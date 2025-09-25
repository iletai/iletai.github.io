"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface InfiniteMovingCard {
  id: string;
  quote: string;
  name: string;
  title: string;
  avatar?: string;
  rating?: number;
}

interface InfiniteMovingCardsProps {
  items: InfiniteMovingCard[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = "",
}: InfiniteMovingCardsProps) {
  const [duplicatedItems, setDuplicatedItems] = useState<InfiniteMovingCard[]>([]);

  useEffect(() => {
    // Duplicate items to create infinite effect
    setDuplicatedItems([...items, ...items]);
  }, [items]);

  const speedMap = {
    fast: 20,
    normal: 40,
    slow: 60,
  };

  const animationDuration = speedMap[speed];

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <div className="flex">
        <motion.div
          className="flex gap-6 pr-6"
          animate={{
            x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
        >
          {duplicatedItems.map((item, index) => (
            <TestimonialCard key={`${item.id}-${index}`} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}

interface TestimonialCardProps {
  item: InfiniteMovingCard;
}

function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <Card className="min-w-[350px] max-w-[350px] bg-gradient-to-br from-muted/50 to-muted/30 border-border/50 backdrop-blur-sm">
      <CardContent className="p-6">
        {/* Quote */}
        <blockquote className="text-sm leading-relaxed mb-4 text-muted-foreground">
          &ldquo;{item.quote}&rdquo;
        </blockquote>

        {/* Rating */}
        {item.rating && (
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < item.rating! ? "text-yellow-400" : "text-muted-foreground/30"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={item.avatar} alt={item.name} />
            <AvatarFallback>{item.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Staggered Infinite Cards Component
interface StaggeredInfiniteCardsProps {
  items: InfiniteMovingCard[];
  className?: string;
}

export function StaggeredInfiniteCards({
  items,
  className = "",
}: StaggeredInfiniteCardsProps) {
  const firstRow = items.slice(0, Math.ceil(items.length / 2));
  const secondRow = items.slice(Math.ceil(items.length / 2));

  return (
    <div className={`space-y-6 ${className}`}>
      <InfiniteMovingCards
        items={firstRow}
        direction="left"
        speed="slow"
      />
      <InfiniteMovingCards
        items={secondRow}
        direction="right"
        speed="normal"
      />
    </div>
  );
}

// Testimonials Grid Component
interface TestimonialsGridProps {
  items: InfiniteMovingCard[];
  className?: string;
}

export function TestimonialsGrid({
  items,
  className = "",
}: TestimonialsGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <TestimonialCard item={item} />
        </motion.div>
      ))}
    </div>
  );
}
