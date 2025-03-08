import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils"; // Utility for class name concatenation

// Table Component
const Table = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props}>
      {children}
    </table>
  </div>
));
Table.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
Table.displayName = "Table";

// TableHeader Component (Fixed - removed unused children prop)
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("border-b bg-transparent", className)} {...props}>
    <tr>
      <TableHead>Order Id</TableHead>
      <TableHead>Date</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Status</TableHead>
    </tr>
  </thead>
));
TableHeader.propTypes = {
  className: PropTypes.string,
};
TableHeader.displayName = "TableHeader";

// TableBody Component
const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("divide-y", className)} {...props} />
));
TableBody.propTypes = {
  className: PropTypes.string,
};
TableBody.displayName = "TableBody";

// TableFooter Component
const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("border-t bg-muted font-medium", className)} {...props} />
));
TableFooter.propTypes = {
  className: PropTypes.string,
};
TableFooter.displayName = "TableFooter";

// TableRow Component
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("border-b hover:bg-muted", className)} {...props} />
));
TableRow.propTypes = {
  className: PropTypes.string,
};
TableRow.displayName = "TableRow";

// TableHead Component (for column headers)
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th ref={ref} className={cn("px-4 py-2 text-left font-medium text-white", className)} {...props} />
));
TableHead.propTypes = {
  className: PropTypes.string,
};
TableHead.displayName = "TableHead";

// TableCell Component
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("px-4 py-2", className)} {...props} />
));
TableCell.propTypes = {
  className: PropTypes.string,
};
TableCell.displayName = "TableCell";

// TableCaption Component
const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-2 text-sm text-gray-500", className)} {...props} />
));
TableCaption.propTypes = {
  className: PropTypes.string,
};
TableCaption.displayName = "TableCaption";

// Export all components
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};