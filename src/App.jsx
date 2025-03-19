import { TextInput } from './components'

import { faAt } from '@fortawesome/free-solid-svg-icons'

import './App.css'

function App() {
  return (
    <>
      <div>
        <TextInput
          required
          label="Input label"
          description="Input description"
          placeholder="Input placeholder"
          // error="Input error message"
          iconCode={faAt}
          size="lg"
        />
      </div>
    </>
  )
}

export default App
