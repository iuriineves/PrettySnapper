import Sidebar from './components/sidebar'
import { ThemeProvider } from './components/theme-provider'
import Topbar from './components/topbar'
import light_bg from './assets/bg.png'
import ss from './assets/cropped.png'
import { useState } from 'react'
import { getImage } from './assets/get_image'
const { clipboard } = require('electron')
const fs = require('fs')

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
            <div id="ss_area" className="h-auto w-auto flex items-center justify-center relative">
              <img
                src={background}
                className="w-[-webkit-fill-available] h-auto rounded-md max-h-[37rem]"
              />
              <img
                id="ss"
                src={ss}
                alt=""
                onLoad={async () => {
                  const buffer = clipboard.readImage('clipboard')
                  fs.writeFile('./src/renderer/src/assets/clipboard.png', buffer.toPNG(), (err) => {
                    if (err) console.log(err)
                  })
                  setColor(await getImage())
                }}
                className={'absolute shadow-2xl shadow-black'}
                style={{
                  backgroundClip: 'border-box',
                  borderColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                  borderWidth: `${padding}px`,
                  borderRadius: `${radius}px`,
                  width: `${inset}%`,
                  height: 'auto'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
