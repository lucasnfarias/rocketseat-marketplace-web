import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          'text-body-md placeholder:text-gray-200 border-b-[1px] border-gray-100 bg-white focus-visible:border-b-2 focus-visible:border-gray-300',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
