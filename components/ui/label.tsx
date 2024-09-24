"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import * as LabelPrimitive from "@radix-ui/react-label"

const labelVariants = () => "label-variants"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className = "", ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label }