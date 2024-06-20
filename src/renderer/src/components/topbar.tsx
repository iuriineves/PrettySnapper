const { ipcRenderer } = require('electron')
import icon from '../../../../resources/icon.png'

const iconStyle =
  ' material-symbols-rounded text-muted-foreground cursor-pointer select-none icon-variation-settings no-drag px-4 transition-colors hover:opacity-100 hover:text-foreground'

export default function TopBar(): JSX.Element {
  return (
    <div className="w-screen flex top-0 fixed drag content-end justify-end items-center">
      <img src={icon} alt="logo" className="w-6 ml-4 shadow-md" />
      <span className="font-Noto text-neutral-500 dark:text-muted-foreground select-none ml-3 pr-1">
        PrettySnapper
      </span>
      <div className="w-[-webkit-fill-available] drag" />
      <span
        className={iconStyle + ' hover:bg-neutral-700/75 text-xl py-1.5'}
        onClick={() => ipcRenderer.send('minimize')}
      >
        remove
      </span>
      <span
        className={iconStyle + ' hover:bg-neutral-700/75 text-base px-3.5 py-2'}
        onClick={() => ipcRenderer.send('maximize')}
      >
        check_box_outline_blank
      </span>
      <span
        className={iconStyle + ' hover:bg-destructive/75 hover:text-white text-xl py-1.5'}
        onClick={() => ipcRenderer.send('close')}
      >
        close
      </span>
    </div>
  )
}
