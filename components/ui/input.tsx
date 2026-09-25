import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

export interface InputProps extends React.ComponentProps<typeof InputPrimitive> {
  label?: string
  error?: string
}

function Input({ className, type, label, error, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label className="font-heading text-xs font-bold uppercase block mb-2">
          {label}
        </label>
      )}
      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(
          "flex w-full brutal-border bg-background px-4 py-3 font-mono text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0px_0px] focus:shadow-accent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export { Input }
