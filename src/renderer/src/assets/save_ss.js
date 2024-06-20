const { clipboard, nativeImage } = require('electron')
var htmlToImage = require('html-to-image')

export default async function saveSS() {
  var node = document.getElementById('ss_area')
  htmlToImage
    .toPng(node)
    .then(function (dataUrl) {
      clipboard.writeImage(nativeImage.createFromDataURL(dataUrl))
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error)
    })
}
