import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import PropTypes from "prop-types"; // Import PropTypes
import { cn } from "../../lib/utils";

const Progress = React.forwardRef(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

// Add PropTypes validation for the Progress component
Progress.propTypes = {
  className: PropTypes.string, // Validate className as an optional string
  value: PropTypes.number, // Validate value as an optional number
  indicatorClassName: PropTypes.string, // Validate indicatorClassName as an optional string
};

export { Progress };