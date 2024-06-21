import Sidebar from './components/sidebar'
import { ThemeProvider } from './components/theme-provider'
import Topbar from './components/topbar'
import light_bg from './assets/bg.png'
import { useState } from 'react'
import Ssarea from './components/ssarea'

function App(): JSX.Element {
  const [padding, setPadding] = useState(10)
  const [radius, setRadius] = useState(10)
  const [inset, setInset] = useState(50)
  const [color, setColor] = useState([])
  const [background, setBackground] = useState(light_bg)

  return (
    <ThemeProvider>
      <div className="w-screen h-screen flex">
        <Topbar></Topbar>
        <Sidebar
          setPadding={setPadding}
          setRadius={setRadius}
          setInset={setInset}
          setBackground={setBackground}
        ></Sidebar>
        <div className="flex w-[-webkit-fill-available] items-center justify-center">
          <div className=" mx-5 mt-8 flex items-center justify-center relative">
            <Ssarea
              padding={padding}
              radius={radius}
              inset={inset}
              color={color}
              setColor={setColor}
              background={background}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
