export default function PrimaryInput(props: any) {
    return (
      <div className="w-96 my-2">
        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
          {props.label}
        </label>
        <div className="mt-2">
          <input
            value={props.value}
            onChange={props.onChange}
            type="text"
            name="text"
            id="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={props.placeholder}
          />
        </div>
      </div>
    )
  }
  