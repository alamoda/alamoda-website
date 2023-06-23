interface ComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  width?: string
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function PrimaryInput({ className, size, label, ...props }: ComponentProps) {
  return (
    <div className={classNames(size, 'my-2')}>
      <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div>
        <input
          type="text"
          id="text"
          {...props}
          className={classNames(className,
            "block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
          )}
        />
      </div>
    </div>
  )
}
