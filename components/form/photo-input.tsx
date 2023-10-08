import { PhotoIcon } from '@heroicons/react/24/solid'

interface ComponentProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function PhotoInput({...props }: ComponentProps) {
  return (
    <div>
      <div className="mt-2 flex justify-center border border-dashed border-gray-900/25 px-32 py-8">
        <div className="text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white font-semibold text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-2 hover:text-gray-700"
            >
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" {...props} />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  )
}