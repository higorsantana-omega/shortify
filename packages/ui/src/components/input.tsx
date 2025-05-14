import * as React from 'react';

import { cn } from '../lib'
import { X } from 'lucide-react';

interface InputProps extends React.ComponentProps<'input'> {
  name: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, name, error, placeholder, ...props }, ref) => {
    return (
      <div className='relative w-full'>
        <input
          {...props}
          name={name}
          id={id ?? name}
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            error && '!border-red-900',
            className
          )}
          placeholder={placeholder}
          ref={ref}
        />

        {error && (
          <div className='flex gap-1 items-center mt-2 text-red-900'>
            <X className='size-3' />
            <span className='text-xs'>{error}</span>
          </div>
        )}
      </div>

    );
  }
);
Input.displayName = 'Input';

export { Input };
