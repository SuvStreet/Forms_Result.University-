import { useRef, useState } from 'react'
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

const initialState = {
  email: '',
  password: '',
}

export const Signin = () => {
  const formRef = useRef(null)
  const [formSignin, setFormSignin] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormSignin((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newErrors = validateForm(inputs, formSignin)

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    formRef.current.reset()
    setFormSignin(initialState)

    alert(`Вы успешно вошли ${formSignin.email.toUpperCase()}`)
  }

  return (
    <div>
      <h1>Signin</h1>
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        {inputs.map((input, index) => (
          <TextInput key={index} {...input} error={errors[input.nameInput]} />
        ))}
        <Button text="Signin" />
      </form>
    </div>
  )
}
