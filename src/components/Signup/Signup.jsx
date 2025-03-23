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
      { label: 'Мужской', value: 'male' },
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

const initialState = {
  name: '',
  nickname: '',
  email: '',
  sex: '',
  password: '',
  passwordConfirm: '',
}

export const Signup = () => {
  const formRef = useRef(null)
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

    formRef.current.reset()
    setFormValues(initialState)

    alert(`Вы успешно зарегистрировались ${formValues.name.toUpperCase()} `)
  }

  return (
    <div>
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <h1>Signup</h1>
        {inputs.map((input, index) => (
          <TextInput key={index} {...input} error={errors[input.nameInput]} />
        ))}
        <Button text="Signup" />
      </form>
    </div>
  )
}
