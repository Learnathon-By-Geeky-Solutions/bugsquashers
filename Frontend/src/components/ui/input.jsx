import * as React from "react";
import PropTypes from "prop-types"; // Import prop-types
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-full border-input bg-muted px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

// Add propTypes validation
Input.propTypes = {
  className: PropTypes.string, // className is optional and should be a string
  type: PropTypes.oneOf([
    "text",
    "password",
    "email",
    "number",
    "date",
    "time",
    "search",
    "tel",
    "url",
    "file",
  ]), // type is optional but must be one of the specified values
};

export { Input };