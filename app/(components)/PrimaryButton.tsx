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
}