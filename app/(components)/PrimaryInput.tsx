interface ComponentProps {
  name?: string
  label?: string
  value: string
  onChangeMethod?: (e: React.ChangeEvent<HTMLInputElement>) => void 
  placeholder?: string
  size?: string
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function PrimaryInput({name, label, value, onChangeMethod, placeholder, size}: ComponentProps) {
    return (
      <div className={classNames(size, 'my-2')}>
        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <input
            value={value}
            onChange={onChangeMethod}
            type="text"
            name={name || 'text'}
            id="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={placeholder}
          />
        </div>
      </div>
    )
  }
  