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
}