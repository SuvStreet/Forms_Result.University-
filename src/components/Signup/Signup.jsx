import { useRef, useState } from 'react'
import { validateForm } from '../../services/validateForm'
import { Button } from '../Button/Button'
import { TextInput } from '../TextInput/TextInput'

import { faFaceSmileBeam, faKey, faAt } from '@fortawesome/free-solid-svg-icons'

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
    iconCode: faFaceSmileBeam,
  },
  {
    required: true,
    label: 'Почта',
    description: 'Ваша почта',
    placeholder: 'email',
    type: 'email',
    nameInput: 'email',
    iconCode: faAt,
  },
  {
    required: true,
    label: 'Пол',
    description: 'Ваш пол',
    type: 'radio',
    nameInput: 'sex',
    options: [
      { label: 'Мужской', value: 'male', defaultChecked: true },
      { label: 'Женский', value: 'female' },
    ],
  },
  {
    required: true,
    label: 'Пароль',
    description: 'Ваш пароль',
    placeholder: 'пароль',
    type: 'password',
    nameInput: 'password',
    iconCode: faKey,
  },
  {
    required: true,
    label: 'Подтверждение пароля',
    description: 'Подтвердите пароль',
    placeholder: 'повторите пароль',
    type: 'password',
    nameInput: 'passwordConfirm',
    iconCode: faKey,
  },
]

export const Signup = ({ onSubmit }) => {
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

    const fromData = new FormData(formRef.current)

    const formValues = Object.fromEntries(fromData)

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
      <form
        noValidate
        onSubmit={handleSubmit}
        onChange={handleChange}
        ref={formRef}
      >
        <h1>Signup</h1>
        {inputs.map((input, index) => (
          <TextInput key={index} error={errors[input.nameInput]} {...input} />
        ))}
        <Button text="Signup" />
      </form>
    </div>
  )
}
