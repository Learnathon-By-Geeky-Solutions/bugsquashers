"use client";

import * as React from "react";
import PropTypes from "prop-types";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils"; // Utility for class name concatenation
import { navigationMenuTriggerStyle } from "./navigation-menu-variants"; // Custom trigger style

// NavigationMenu Component
const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.propTypes = {
  className: PropTypes.string, // Optional className
  children: PropTypes.node, // Optional children
};
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

// NavigationMenuList Component
const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.propTypes = {
  className: PropTypes.string, // Optional className
};
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

// NavigationMenuItem Component (re-exporting Radix UI Item)
const NavigationMenuItem = NavigationMenuPrimitive.Item;

// NavigationMenuTrigger Component
const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle, "group flex items-center space-x-1", className)}
    {...props}
  >
    {children}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true" // Hide from screen readers
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.propTypes = {
  className: PropTypes.string, // Optional className
  children: PropTypes.node, // Optional children
};
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

// NavigationMenuContent Component
const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full bg-muted shadow-md rounded-md p-4 border",
      "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
      "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
      "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
      "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
      "md:absolute md:w-auto",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.propTypes = {
  className: PropTypes.string, // Optional className
};
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

// NavigationMenuLink Component (re-exporting Radix UI Link)
const NavigationMenuLink = NavigationMenuPrimitive.Link;

// NavigationMenuViewport Component
const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-6 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
        "md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.propTypes = {
  className: PropTypes.string, // Optional className
};
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

// NavigationMenuIndicator Component
const NavigationMenuIndicator = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
      "data-[state=visible]:animate-in data-[state=hidden]:animate-out",
      "data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.propTypes = {
  className: PropTypes.string, // Optional className
};
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

// Export all components
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};