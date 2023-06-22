<<<<<<< HEAD
export default function PrimaryButton(props: any) {
    return ( 
        <>
        <button
          onClick={props.onClick}
          type="button"
          className="my-3 inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          {props.text}
        </button>
        </>
    )
=======
import React from "react";

interface PrimaryButton extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
}

export default function PrimaryButton({ className, text, ...props }: PrimaryButton) {
  return (
    <>
      <button
        type="button"
        className="my-3 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {text}
      </button>
    </>
  )
>>>>>>> f54f51356301cf8cba0d60d0476fd70dd8da314b
}