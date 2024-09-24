import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

// Fire算力公式
const calculateFirePower = (
  En: number,
  Attr_reputation: number,
  Attr_efficiency: number,
  level: number,
  Rating: number,
  Z: number,
  creditScoreFactor: number,
  rankFactor: number
): number => {
  const baseTokenOutput = En * Math.pow(20 + Attr_reputation, 0.65) * 0.35 * 0.006666667 * Z;
  const efficiencyBonus = Attr_efficiency / (Math.pow(level + 3, 1.45) + 70) * (Math.tanh((Rating - 1) * 1.7) * 0.8 + 0.8);
  const firePower = baseTokenOutput * (1 + efficiencyBonus) * creditScoreFactor * rankFactor;
  return firePower;
};

// 宝箱算力公式
const calculateChestPower = (
  En: number,
  Attr_lucky: number,
  Attr_efficiency: number,
  level: number,
  RSW: number,
  Z: number,
  creditScoreFactor: number,
  rankFactor: number
): number => {
  const baseChestOutput = En * Math.pow(20 + Attr_lucky, 0.65) * 0.35 * 0.006666667 * Z;
  const tacticsBonus = Attr_efficiency / (Math.pow(level + 3, 1.45) + 70) * (Math.tanh((RSW - 1) * 1.7) * 0.8 + 0.8);
  const chestPower = baseChestOutput * (1 + tacticsBonus) * creditScoreFactor * rankFactor;
  return chestPower;
};

// Fire产出数值公式
const calculateFireOutput = (firePower: number, fireDifficulty: number): number => {
  return firePower / fireDifficulty;
};

// 宝箱点数产出公式
const calculateChestOutput = (chestPower: number, chestDifficulty: number): number => {
  return chestPower * 10 / chestDifficulty;
};