import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../utils/cn';

  export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Genshin style buttons
    const variants = {
      primary: "bg-gradient-to-r from-genshin-amber to-genshin-gold text-genshin-dark font-bold shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] border border-transparent hover:scale-[1.02]",
      secondary: "bg-genshin-surface text-white hover:bg-white/10 border border-white/10",
      outline: "bg-transparent border-2 border-genshin-gold text-genshin-gold hover:bg-genshin-gold/10",
      ghost: "bg-transparent hover:bg-white/10 text-genshin-light hover:text-white",
      glass: "glass-panel text-white hover:bg-white/10 border-white/20"
    };

    const sizes = {
      sm: "h-8 px-4 text-xs clip-slanted",
      md: "h-10 px-6 py-2 text-sm clip-slanted",
      lg: "h-14 px-8 text-lg uppercase tracking-wide clip-slanted",
      icon: "h-10 w-10 flex items-center justify-center rounded-full"
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genshin-gold disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
