import './styles/Reset.css'
import './styles/Fonts.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'


function App() {

  return (
    <ChakraProvider>
      <main className="main-wrapper">
        <Header/>
        <Outlet/>
      </main>
    </ChakraProvider>
  )
}

export default App
