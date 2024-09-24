import * as React from "react";
import { cn } from "@/lib/utils"; // 确保路径正确

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={cn("card", className)} {...props} />
));

Card.displayName = "Card";

const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...props }) => (
  <div className={cn("card-header", className)} {...props} />
);

const CardTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...props }) => (
  <div className={cn("card-title", className)} {...props} />
);

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...props }) => (
  <div className={cn("card-content", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardContent };