const sizeOf = require('image-size')
const sharp = require('sharp');

const image = '';


const resizeImage = (image) => {
  return new Promise((resolve, reject) => {
    const parts = image.split(';');
    const mimType = parts[0].split(':')[1];
    const imageData = parts[1].split(',')[1];
    const img = new Buffer.from(imageData, 'base64');
    const result = sharp(img)
      .resize(1000)
      .toBuffer()
      .then((resizedImageBuffer) => {
        const resizedImageData = resizedImageBuffer.toString('base64');
        const resizedBase64 = `data:${mimType};base64,${resizedImageData}`;
        const buffer = new Buffer.from(resizedBase64.substring(resizedBase64.indexOf(',') + 1));
        resolve(buffer);
      }).catch((err) => {
        reject('ERROR', err);
      });
  });
};


(async () => {
  const buffer = new Buffer.from(image.substring(image.indexOf(',') + 1));
  console.log('------target------')
  console.log("Byte: " + buffer.length);
  console.log("MB: " + buffer.length / 1e+6);
  console.log('------------------')
  
  const resizedBuffer = await resizeImage(image);
  
  console.log('-----resized------')
  console.log("Byte: " + resizedBuffer.length);
  console.log("MB: " + resizedBuffer.length / 1e+6);
  console.log('------------------')
})();
