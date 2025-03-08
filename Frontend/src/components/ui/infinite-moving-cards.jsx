"use client";

import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { Star } from "lucide-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate items for seamless scrolling
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      let animationDuration;

      switch (speed) {
        case "fast":
          animationDuration = "20s";
          break;
        case "normal":
          animationDuration = "40s";
          break;
        case "slow":
          animationDuration = "80s";
          break;
        default:
          animationDuration = "40s";
      }

      containerRef.current.style.setProperty(
        "--animation-duration",
        animationDuration
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-b flex-shrink-0 border-secondary px-8 py-6 md:w-[450px] bg-[#FCF5E1] dark:bg-[#221c0a]"
            key={`${item.name}-${idx}`} // Use a unique key combining item.name and index
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-sm leading-[1.6] text-foreground font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center gap-4">
                {/* Avatar */}
                <Avatar className="w-12 h-12">
                  <AvatarImage src={item.avatar} alt={item.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {item.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-foreground font-semibold">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-muted-foreground font-normal">
                    {item.title}
                  </span>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={`${item.name}-star-${i}`} // Use a unique key combining item.name and index
                        className={cn(
                          "w-4 h-4",
                          i < item.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

// PropTypes for type checking
InfiniteMovingCards.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      title: PropTypes.string,
      rating: PropTypes.number,
    })
  ).isRequired,
  direction: PropTypes.oneOf(["left", "right"]),
  speed: PropTypes.oneOf(["slow", "normal", "fast"]),
  pauseOnHover: PropTypes.bool,
  className: PropTypes.string,
};