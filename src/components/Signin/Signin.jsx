import { useState, useRef } from 'react'
import { TextInput } from '../TextInput/TextInput'
import { Button } from '../Button/Button'
import { validateForm } from '../../services/validateForm'

import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'

const inputs = [
  {
    required: true,
    label: 'Email',
    description: 'Ваш email',
    placeholder: 'email',
    iconCode: faAt,
    type: 'email',
    nameInput: 'email',
  },
  {
    required: true,
    label: 'Password',
    description: 'Ваш пароль',
    placeholder: 'password',
    iconCode: faKey,
    type: 'password',
    nameInput: 'password',
  },
]

export const Signin = ({ onSubmit }) => {
  const [errors, setErrors] = useState({})

  const formRef = useRef(null)

  const handleChange = (event) => {
    const { name } = event.target

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(formRef.current)

    const formValues = Object.fromEntries(formData)

    const newErrors = validateForm(inputs, formValues)

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    onSubmit(formValues)

    formRef.current.reset()
  }

  return (
    <div>
      <h1>Signin</h1>
      <form
        noValidate
        onSubmit={handleSubmit}
        onChange={handleChange}
        ref={formRef}
      >
        {inputs.map((input, index) => (
          <TextInput
            key={index}
            error={errors[input.nameInput]}
            {...input}
          />
        ))}
        <Button text="Signin" />
      </form>
    </div>
  )
}
