"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Star } from "lucide-react"; // Import the Star icon
import PropTypes from "prop-types"; // Import PropTypes
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

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
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
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
            key={item.name}
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
