import { useState } from 'react'
import { validateForm } from '../../services/validateForm'
import { Button } from '../Button/Button'
import { TextInput } from '../TextInput/TextInput'

const inputs = [
  {
    required: true,
    label: 'Имя',
    description: 'Ваше имя',
    placeholder: 'имя',
    type: 'text',
    nameInput: 'name',
  },
  {
    label: 'Никнейм',
    description: 'Ваш никнейм',
    placeholder: 'никнейм',
    type: 'text',
    nameInput: 'nickname',
  },
  {
    required: true,
    label: 'Почта',
    description: 'Ваша почта',
    placeholder: 'email',
    type: 'email',
    nameInput: 'email',
  },
  {
    required: true,
    label: 'Пол',
    type: 'radio',
    nameInput: 'sex',
  },
  {
    required: true,
    label: 'Пароль',
    description: 'Ваш пароль',
    placeholder: 'password',
    type: 'password',
    nameInput: 'password',
  },
  {
    required: true,
    label: 'Подтверждение пароля',
    description: 'Подтвердите пароль',
    placeholder: 'password',
    type: 'password',
    nameInput: 'passwordConfirm',
  },
]

const initialState = {
  name: '',
  nickname: '',
  email: '',
  sex: '',
  password: '',
  passwordConfirm: '',
}

export const Signup = () => {
  const [formValues, setFormValues] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((prevState) => ({
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

    const newErrors = validateForm(inputs, formValues)

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    alert(`Вы успешно зарегистрировались ${formValues.name.toUpperCase()} `)
  }

  return (
    <div>
      <form noValidate onSubmit={handleSubmit} onChange={handleChange}>
        <h1>Signup</h1>
        {inputs.map((input, index) => (
          <TextInput key={index} {...input} error={errors[input.nameInput]} />
        ))}
        <Button text="Signup" />
      </form>
    </div>
  )
}
