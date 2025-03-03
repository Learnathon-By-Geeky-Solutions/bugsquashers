"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import PropTypes from "prop-types"; // For prop type validation
import { cn } from "../../lib/utils"; // Utility function for class names
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// Re-exporting Radix UI components for easier access
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

/**
 * SheetOverlay Component
 * Provides a backdrop overlay for the sheet.
 */
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
SheetOverlay.propTypes = {
  className: PropTypes.string, // Optional className for custom styling
};

/**
 * Sheet Variants
 * Defines the styles for different sheet positions (top, bottom, left, right).
 */
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right", // Default position is right
    },
  }
);

/**
 * SheetContent Component
 * The main content area of the sheet.
 */
const SheetContent = React.forwardRef(
  (
    { side = "right", className, children, title, description, ...props },
    ref
  ) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        aria-labelledby="sheet-title"
        aria-describedby="sheet-description"
        {...props}
      >
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-full hover:bg-accent disabled:pointer-events-none data-[state=open]:bg-secondary p-2 bg-muted">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>

        {/* Ensure accessibility by always rendering the title */}
        {title ? (
          <SheetPrimitive.Title id="sheet-title">{title}</SheetPrimitive.Title>
        ) : (
          <VisuallyHidden>
            <SheetPrimitive.Title id="sheet-title">Sheet</SheetPrimitive.Title>
          </VisuallyHidden>
        )}

        {/* Ensure accessibility by always rendering the description */}
        {description ? (
          <SheetPrimitive.Description id="sheet-description">
            {description}
          </SheetPrimitive.Description>
        ) : (
          <VisuallyHidden>
            <SheetPrimitive.Description id="sheet-description">
              No description
            </SheetPrimitive.Description>
          </VisuallyHidden>
        )}

        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);

SheetContent.displayName = SheetPrimitive.Content.displayName;
SheetContent.propTypes = {
  side: PropTypes.oneOf(["top", "bottom", "left", "right"]), // Optional side prop
  className: PropTypes.string, // Optional className for custom styling
  children: PropTypes.node.isRequired, // Children are required
  title: PropTypes.string, // Add title prop validation
  description: PropTypes.string, // Add description prop validation
};

/**
 * SheetHeader Component
 * A header section for the sheet.
 */
const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";
SheetHeader.propTypes = {
  className: PropTypes.string, // Optional className for custom styling
};

/**
 * SheetFooter Component
 * A footer section for the sheet.
 */
const SheetFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";
SheetFooter.propTypes = {
  className: PropTypes.string, // Optional className for custom styling
};

/**
 * SheetTitle Component
 * A title for the sheet.
 */
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
SheetTitle.propTypes = {
  className: PropTypes.string, // Optional className for custom styling
};

/**
 * SheetDescription Component
 * A description for the sheet.
 */
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
SheetDescription.propTypes = {
  className: PropTypes.string, // Optional className for custom styling
};

// Exporting all components
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
