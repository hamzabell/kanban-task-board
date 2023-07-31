import { useState } from 'react'
import './App.scss'
import Button from './components/button'
import useModal from './hooks/useModal'


const text = () => <h1>Hello World!</h1>


const Page = ({ menu }) => {
    const { ModalContent, toggle }  = useModal(text, menu)
    return (
        <>
            <button onClick={() => toggle()}>Open Modal</button>

            <ModalContent />
        </>
    )
}

function App() {
  const [theme, setTheme] = useState('light')
  const { ModalContent, toggle } = useModal(Page)
  return (
    <>
      <div>
        <Button primary onClick={() => {
          const currentTheme = theme == 'light' ? 'dark': 'light';
          document.documentElement.className = currentTheme;
          setTheme(currentTheme);

        }}>Switch theme</Button>


        <Button onClick={() => toggle()}>Open Modal</Button>
      </div>

      <ModalContent />
    </>
  )
}

export default App
