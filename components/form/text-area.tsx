
interface ComponentProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
  }
  
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function TextAreaInput({ className, label, ...props }: ComponentProps) {
    return (
      <div className="w-96 my-2">
        <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <textarea
            {...props}
            rows={4}
            name="text"
            id="text"
            className={classNames(className,
              "block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
            )}
          />
        </div>
      </div>
    )
  }