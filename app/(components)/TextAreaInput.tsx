type ComponentProps = {
  label?: string
  value: string
  onChange: (value: any) => void
}

export default function TextAreaInput({label, value, onChange}: ComponentProps) {
    return (
      <div className="w-96 my-2">
        <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <textarea
            value={value}
            onChange={onChange}
            rows={4}
            name="text"
            id="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    )
  }
  