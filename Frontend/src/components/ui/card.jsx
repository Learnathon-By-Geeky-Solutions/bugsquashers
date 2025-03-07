import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils"; // Utility for class name concatenation

// Card Component
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl  bg-card text-card-foreground shadow border border-muted", className)}
    {...props}
  />
));
Card.propTypes = {
  className: PropTypes.string, // Optional className
};
Card.displayName = "Card";

// CardHeader Component
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.propTypes = {
  className: PropTypes.string, // Optional className
};
CardHeader.displayName = "CardHeader";

// CardTitle Component
const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    {children || <span aria-hidden="true"> </span>} {/* Ensure accessible content */}
  </h3>
));
CardTitle.propTypes = {
  className: PropTypes.string, // Optional className
  children: PropTypes.node, // Optional children
};
CardTitle.displayName = "CardTitle";

// CardDescription Component
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.propTypes = {
  className: PropTypes.string, // Optional className
};
CardDescription.displayName = "CardDescription";

// CardContent Component
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props}
  />
));
CardContent.propTypes = {
  className: PropTypes.string, // Optional className
};
CardContent.displayName = "CardContent";

// CardFooter Component
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.propTypes = {
  className: PropTypes.string, // Optional className
};
CardFooter.displayName = "CardFooter";

// Export all components
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };