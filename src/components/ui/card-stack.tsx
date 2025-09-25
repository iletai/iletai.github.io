"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface StackCard {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
  image?: string;
}

interface CardStackProps {
  items: StackCard[];
  className?: string;
  stackOffset?: number;
}

export function CardStack({
  items,
  className = "",
  stackOffset = 10,
}: CardStackProps) {
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [cards, setCards] = useState(items);

  const moveToEnd = (from: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const [removed] = newCards.splice(from, 1);
      newCards.push(removed);
      return newCards;
    });
  };

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      {cards.map((card, index) => (
        <CardItem
          key={card.id}
          card={card}
          index={index}
          totalCards={cards.length}
          stackOffset={stackOffset}
          onMoveToEnd={() => moveToEnd(index)}
          isDragged={draggedCardId === card.id}
          onDragStart={() => setDraggedCardId(card.id)}
          onDragEnd={() => setDraggedCardId(null)}
        />
      ))}
    </div>
  );
}

interface CardItemProps {
  card: StackCard;
  index: number;
  totalCards: number;
  stackOffset: number;
  onMoveToEnd: () => void;
  isDragged: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
}

function CardItem({
  card,
  index,
  totalCards,
  stackOffset,
  onMoveToEnd,
  isDragged,
  onDragStart,
  onDragEnd,
}: CardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const springX = useSpring(x);
  const springY = useSpring(y);

  const zIndex = totalCards - index;
  const offset = index * stackOffset;
  const scale = 1 - index * 0.05;

  const handleDragEnd = () => {
    onDragEnd();
    const threshold = 150;
    if (Math.abs(x.get()) > threshold || Math.abs(y.get()) > threshold) {
      onMoveToEnd();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        zIndex,
        scale,
      }}
      initial={{
        y: -offset,
        scale,
        rotateX: 0,
        rotateY: 0,
      }}
      animate={{
        y: isDragged ? 0 : -offset,
        scale: isDragged ? 1.05 : scale,
      }}
      drag
      dragElastic={0.1}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: scale * 1.02 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Card
        className={`w-full h-64 ${card.color || "bg-gradient-to-br from-blue-500 to-purple-600"} border-0 shadow-2xl`}
        style={{
          background: card.color || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <CardContent className="p-6 h-full flex flex-col justify-between text-white">
          <div className="flex items-start justify-between">
            {card.icon && (
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                {card.icon}
              </div>
            )}
            <motion.div
              className="text-xs opacity-60 font-mono"
              animate={{ opacity: isDragged ? 0 : 0.6 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {card.description}
            </p>
          </div>

          {/* Drag Indicator */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-40"
            animate={{
              opacity: isDragged ? 0.8 : 0.4,
              scale: isDragged ? 1.2 : 1,
            }}
          >
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Expandable Card Stack Component
interface ExpandableCardStackProps {
  items: StackCard[];
  className?: string;
}

export function ExpandableCardStack({
  items,
  className = "",
}: ExpandableCardStackProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((card, index) => (
        <motion.div
          key={card.id}
          layout
          className="cursor-pointer"
          onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          whileHover={{ y: -5 }}
        >
          <Card className={`overflow-hidden ${card.color || "bg-gradient-to-br from-blue-500 to-purple-600"} border-0 shadow-lg`}>
            <CardContent className="p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                {card.icon && (
                  <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                    {card.icon}
                  </div>
                )}
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>

              <motion.div
                initial={false}
                animate={{
                  height: expandedIndex === index ? "auto" : "60px",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm opacity-90 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>

              <motion.div
                className="mt-4 text-xs opacity-70"
                animate={{
                  opacity: expandedIndex === index ? 1 : 0.7,
                }}
              >
                {expandedIndex === index ? "Click to collapse" : "Click to expand"}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
