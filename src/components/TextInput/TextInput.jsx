import { Icon } from '../Icon/Icon'

import './TextInput.css'

export const TextInput = (dependencies) => {
  const {
    variant = 'default',
    required,
    label,
    description,
    placeholder,
    error,
    iconCode,
    size = 'sm',
    radius = 'sm',
    type = 'text',
    nameInput = 'input',
  } = dependencies

  const hiddenError = () => {
    if (error) {
      return 'error'
    } else {
      return ''
    }
  }

  return (
    <div className="root_container" data-size={size}>
      <label className="label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <small className="description">{description}</small>
      <div
        data-variant={variant}
        className={`wrapper ${hiddenError()} radius-${radius}`}
      >
        {iconCode && (
          <div className={`icon ${hiddenError()}`}>
            <Icon iconCode={iconCode} />
          </div>
        )}
        <input
          type={type}
          name={nameInput}
          className={`input ${hiddenError()} `}
          placeholder={placeholder}
        />
      </div>
      {error && <div className="error errorMessage">{error}</div>}
    </div>
  )
}
