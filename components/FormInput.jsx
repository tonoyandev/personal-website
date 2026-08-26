import React from 'react'
import classNames from 'clsx'

const FormInput = React.forwardRef((props, ref) => {
  const {
    label,
    placeholder,
    id,
    name,
    autoComplete,
    hasError,
    type = 'text',
    inputType,
    ...rest
  } = props

  const tags = {
    text: 'input',
    textarea: 'textarea',
  }

  const Component = tags[type]
  // Fields declared in contact-form.json carry a name but no id, so derive one
  // value for both ends of the label association.
  const fieldId = id || name

  return (
    <>
      {label && (
        <label htmlFor={fieldId} className="block">
          {label}
        </label>
      )}
      <Component
        type={inputType || type}
        ref={ref}
        id={fieldId}
        name={name}
        autoComplete={autoComplete}
        className={classNames(
          'block w-full border-0 px-4 py-3',
          'border-b bg-omega-700/20  placeholder-omega-400',
          hasError
            ? 'border-red-500 focus:border-0 focus:ring-red-500'
            : 'border-accent focus:ring-accent-500'
        )}
        placeholder={placeholder}
        {...rest}
      />
    </>
  )
})

FormInput.displayName = 'FormInput'

export default FormInput
