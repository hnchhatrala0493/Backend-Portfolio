import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config() // ✅ Load environment variables

// ✅ Correct Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
;(async function () {
  try {
    // ✅ Upload an image
    const uploadResult = await cloudinary.uploader.upload()

    console.log('Upload Result:', uploadResult)

    // ✅ Optimize delivery
    const optimizeUrl = cloudinary.url('shoes', {
      fetch_format: 'auto',
      quality: 'auto',
    })

    console.log('Optimized URL:', optimizeUrl)

    // ✅ Transform the image: auto-crop
    const autoCropUrl = cloudinary.url('shoes', {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    })

    console.log('Auto-Cropped URL:', autoCropUrl)
  } catch (error) {
    console.error('Error:', error)
  }
})()
