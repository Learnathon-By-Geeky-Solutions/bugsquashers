import { cn } from "../../lib/utils";
import PropTypes from "prop-types"; // Import PropTypes

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

// Add PropTypes validation
Skeleton.propTypes = {
  className: PropTypes.string, // Validate className as a string
};

export { Skeleton };