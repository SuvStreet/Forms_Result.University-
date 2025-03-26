import { Signin, Signup } from './components'

import './App.css'

function App() {
  const handelSubmit = (data) => {
    console.table(data)

    if (data.name) {
      alert(`Вы успешно зарегистрировались ${data.name.toUpperCase()} `)
    } else {
      alert(`Вы успешно вошли ${data.email.toUpperCase()}`)
    }
  }

  return (
    <>
      <div>
        <Signin
          onSubmit={(data) => {
            handelSubmit(data)
          }}
        />
        <Signup
          onSubmit={(data) => {
            handelSubmit(data)
          }}
        />
      </div>
    </>
  )
}

export default App
