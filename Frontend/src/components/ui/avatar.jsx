import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import PropTypes from "prop-types"; // For prop type validation
import { cn } from "../../lib/utils"; // Utility for class name concatenation

// Avatar Component
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));

// Prop type validation for Avatar
Avatar.propTypes = {
  className: PropTypes.string, // Optional className
  children: PropTypes.node.isRequired, // Avatar must contain Image or Fallback
};

// Display name for debugging
Avatar.displayName = AvatarPrimitive.Root.displayName;

// AvatarImage Component
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));

// Prop type validation for AvatarImage
AvatarImage.propTypes = {
  className: PropTypes.string, // Optional className
};

// Display name for debugging
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// AvatarFallback Component
const AvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-transparent",
      className
    )}
    {...props}
  >
    {children} {/* Fallback content */}
  </AvatarPrimitive.Fallback>
));

// Prop type validation for AvatarFallback
AvatarFallback.propTypes = {
  className: PropTypes.string, // Optional className
  children: PropTypes.node.isRequired, // Fallback content is mandatory
};

// Display name for debugging
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Export all components
export { Avatar, AvatarImage, AvatarFallback };