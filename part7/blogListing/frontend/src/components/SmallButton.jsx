const SmallButton = ({ primary, children, ...props }) => {
  const baseClasses =
    'px-4 py-2 rounded-md font-semibold text-xs shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  const primaryClasses = 'bg-indigo-600 text-white hover:bg-indigo-700'
  const secondaryClasses = 'bg-gray-200 text-gray-800 hover:bg-gray-300'

  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : secondaryClasses}`

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

export default SmallButton
