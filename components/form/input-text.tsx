import { cn } from "@/lib/helpers";

interface InputTextProps {
    className: string
}

export function InputText({
    className,
    ...props
  }: InputTextProps & React.HTMLAttributes<HTMLInputElement>) {

    return (
        <input
            className={cn(
                'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 disabled:cursor-not-allowed',
                className ? className : ''
            )}
            {...props}
        />
    )
}