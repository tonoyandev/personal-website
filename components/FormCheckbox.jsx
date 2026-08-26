import React from 'react'

// Uses the handlers supplied by react-hook-form's register() and sets no `value`
// attribute, so the form state holds a real boolean and unchecking clears it.
const FormCheckbox = React.forwardRef((props, ref) => {
  const { id, label, type = 'checkbox', name, onChange, onBlur } = props

  return (
    <>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        className="h-6 w-6 border-omega-300 text-accent-600 outline-none"
      />
      <label htmlFor={id} className="ml-3 block">
        {label}
      </label>
    </>
  )
})

FormCheckbox.displayName = 'FormCheckbox'

export default FormCheckbox
