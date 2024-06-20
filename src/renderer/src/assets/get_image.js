/* eslint-disable prettier/prettier */
const Jimp = require('jimp')

function mode(arr) {
  return arr
    .sort((a, b) => arr.filter((v) => v === a).length - arr.filter((v) => v === b).length)
    .pop()
}

export async function getImage() {
  const image = await Jimp.read('./src/renderer/src/assets/clipboard.png')

  let colors = []
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < image.getWidth(); j++) {
      colors.push(image.getPixelColor(j, i * image.getHeight() - i))
      colors.push(image.getPixelColor(i * image.getHeight() - i, j))
    }
  }
  let color = mode(colors)

  let closest_color_l = image.getWidth()
  let closest_color_r = 0
  let closest_color_t = image.getWidth()
  let closest_color_b = 0

  for (let i = 0; i < image.getHeight(); i++) {
    for (let j = 0; j < image.getWidth(); j++) {
      if (image.getPixelColor(j, i) != color) {
        if (j < closest_color_l) {
          closest_color_l = j
        }

        if (j > closest_color_r) {
          closest_color_r = j
        }
      }
    }
  }

  for (let i = 0; i < image.getWidth(); i++) {
    for (let j = 0; j < image.getHeight(); j++) {
      if (image.getPixelColor(i, j) != color) {
        if (j < closest_color_t) {
          closest_color_t = j
        }

        if (j > closest_color_b) {
          closest_color_b = j
        }
      }
    }
  }
  const final_img = image.crop(
    closest_color_l,
    closest_color_t,
    closest_color_r - closest_color_l,
    closest_color_b - closest_color_t
  )
  final_img.write('./src/renderer/src/assets/cropped.png')
  color = Jimp.intToRGBA(color)
  color = [color.r, color.g, color.b]
  return color
}
