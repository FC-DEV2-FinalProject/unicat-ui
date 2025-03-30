import * as React from "react";
import { cn } from "@/src/utils/cn";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...props} />
	)
);
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("p-3 pt-0", className)} {...props} />
	)
);
CardContent.displayName = "CardContent";

export { Card, CardContent };
