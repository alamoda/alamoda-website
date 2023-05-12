export default function PrimaryButton(props: any) {
    return ( 
        <>
        <button
          type="button"
          className="my-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {props.text}
        </button>
        </>
    )
}