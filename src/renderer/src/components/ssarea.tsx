import ss from '../assets/cropped.png'
import { getImage } from '../assets/get_image'
const { clipboard } = require('electron')
import icon from '../../../resources/icon.png'
const fs = require('fs')

export default function SSarea({
  padding,
  radius,
  inset,
  color,
  setColor,
  background
}): JSX.Element {
  if (clipboard.readImage('clipboard').isEmpty()) {
    return <p className="opacity-25">NOT AN IMAGE ON YOUR CLIPBOARD</p>
  }

  return (
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
          console.log(buffer.getSize())
          fs.writeFile('./src/renderer/src/assets/clipboard.png', buffer.toPNG(), (err) => {
            if (err) console.log(err)
          })
          setColor(await getImage())
        }}
        className={'absolute'}
        style={{
          backgroundClip: 'border-box',
          borderColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
          borderWidth: `${padding}px`,
          borderRadius: `${radius}px`,
          width: `${inset * 1.000005}%`
        }}
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
          width: `${inset}%`
        }}
      />
      <div className="flex absolute right-3 bottom-2 items-center opacity-50">
        <p className="font-Noto">Screenshot edited with PrettySnapper</p>
      </div>
    </div>
  )
}
