const sizeOf = require('image-size')
const sharp = require('sharp');

const image = '';


const resizeImage = (image) => {
  const parts = image.split(';');
  const mimType = parts[0].split(':')[1];
  const imageData = parts[1].split(',')[1];
  const img = new Buffer.from(imageData, 'base64');
  sharp(img)
    .resize(1000)
    .toBuffer()
    .then((resizedImageBuffer) => {
      const resizedImageData = resizedImageBuffer.toString('base64');
      const resizedBase64 = `data:${mimType};base64,${resizedImageData}`;
      const buffer = new Buffer.from(resizedBase64.substring(resizedBase64.indexOf(',') + 1));
      console.log('-----resized------')
      console.log("Byte: " + buffer.length);
      console.log("MB: " + buffer.length / 1e+6);
      console.log('------------------')
    })
    .catch((err) => {
      console.error('ERROR', err);
    })
}


const buffer = new Buffer.from(image.substring(image.indexOf(',') + 1));
console.log('------target------')
console.log("Byte: " + buffer.length);
console.log("MB: " + buffer.length / 1e+6);
console.log('------------------')

resizeImage(image);