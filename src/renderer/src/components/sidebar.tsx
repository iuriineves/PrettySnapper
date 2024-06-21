import { Separator } from './ui/separator'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Slider } from './ui/slider'
import { Button } from './ui/button'
import light_bg from '../assets/bg.png'
import dark_bg from '../assets/bg.jpg'
import saveSS from '@renderer/assets/save_ss'

// eslint-disable-next-line react/prop-types
export default function Sidebar({ setPadding, setRadius, setInset, setBackground }): JSX.Element {
  return (
    <>
      <div className="h-screen w-[31rem] p-4 pt-12 pr-0">
        <div className="flex w-[-webkit-fill-available] h-[-webkit-fill-available]">
          <div className="w-[-webkit-fill-available] h-[-webkit-fill-available]">
            <div className="flex items-center">
              <Select>
                <SelectTrigger className="mr-3">
                  <SelectValue placeholder="Default Preset 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Presets</SelectLabel>
                    <SelectItem value="apple">Default Preset 1</SelectItem>
                    <SelectItem value="banana">Default Preset 2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="material-symbols-rounded text-neutral-600 text-2xl">delete</div>
            </div>
            <Separator className="my-5 bg-neutral-300 dark:bg-neutral-600/50"></Separator>
            <p className="font-Noto my-5">Size</p>
            <Slider
              defaultValue={[50]}
              min={25}
              max={75}
              onValueChange={(v) => {
                setInset(v)
              }}
            ></Slider>
            <div className="flex w-full gap-3">
              <div className="w-[-webkit-fill-available]">
                <p className="font-Noto my-5">Padding</p>
                <Slider
                  defaultValue={[10]}
                  min={0}
                  max={50}
                  onValueChange={(v) => {
                    setPadding(v)
                  }}
                ></Slider>
              </div>

              <div className="w-[-webkit-fill-available]">
                <p className="font-Noto my-5">Border Radius</p>
                <Slider
                  defaultValue={[10]}
                  min={0}
                  max={20}
                  onValueChange={(v) => {
                    setRadius(v)
                  }}
                ></Slider>
              </div>
            </div>

            <p className="font-Noto my-5">Background</p>
            <div className="w-[-webkit-fill-available] flex flex-wrap gap-1">
              <Button
                className="p-9"
                style={{ background: `url(${light_bg})`, backgroundSize: 'cover' }}
                onClick={() => {
                  setBackground(light_bg)
                }}
              ></Button>
              <Button
                className="p-9"
                style={{ background: `url(${dark_bg})`, backgroundSize: 'cover' }}
                onClick={() => {
                  setBackground(dark_bg)
                }}
              ></Button>
              <Button className="p-9"></Button>
              <Button className="p-9"></Button>
              <Button className="p-9"></Button>
              <Button className="p-9"></Button>
            </div>
            <div className="absolute bottom-5 gap-2 flex">
              <Button className="flex justify-center items-center pr-3 pl-2">
                <div className="material-symbols-rounded text-neutral-500 mr-2 text-[1.3rem]">
                  download
                </div>
                Save
              </Button>
              <Button
                className="flex justify-center items-center pr-3 pl-2"
                onClick={async () => {
                  await saveSS()
                }}
              >
                <div className="material-symbols-rounded text-neutral-500 mr-2 text-[1.3rem]">
                  content_paste
                </div>
                Copy to Clipboard
              </Button>
            </div>
          </div>
          <Separator
            orientation="vertical"
            className="ml-5 bg-neutral-300 dark:bg-neutral-600/50"
          ></Separator>
        </div>
      </div>
    </>
  )
}
