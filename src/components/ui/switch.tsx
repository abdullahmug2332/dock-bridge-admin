import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "relative inline-flex items-center rounded-full transition-colors cursor-pointer",

        // SIZE
        "data-[size=default]:h-[20px] data-[size=default]:w-[36px]",
        "data-[size=sm]:h-[16px] data-[size=sm]:w-[28px]",

        // COLORS ✅ FIXED
        "data-[state=checked]:bg-purple-600",
        "data-[state=unchecked]:bg-gray-300",

        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400",
        "disabled:opacity-50 disabled:cursor-not-allowed",

        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "block rounded-full bg-white! border border-gray-200 w-4 h-4 shadow-sm transition-transform",

          // SIZE
          "data-[size=default]:h-4 data-[size=default]:w-4",
          "data-[size=sm]:h-3 data-[size=sm]:w-3",

          // POSITION ✅ THIS FIXES MOVEMENT
          "translate-x-[2px] data-[state=checked]:translate-x-[18px]"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };