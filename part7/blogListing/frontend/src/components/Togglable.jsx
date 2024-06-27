import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ buttonLabel, children, ...props }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const baseClasses =
    'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white items-center shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

  const primaryClasses = 'bg-indigo-600 text-white hover:bg-indigo-700'
  const secondaryClasses = 'bg-gray-200 text-gray-800 hover:bg-gray-300'

  return (
    <div className='flex min-h-full flex-col justify-center p-6 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm'>
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          className={`${baseClasses} ${primaryClasses}`}
          {...props}
        >
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <button
          onClick={toggleVisibility}
          className={`${baseClasses} ${secondaryClasses}`}
          {...props}
        >
          Cancel
        </button>
        {children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
