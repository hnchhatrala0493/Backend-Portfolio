import express from 'express'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from 'cloudinary'
import skillsController from '../controllers/skillsController.js'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'uploads', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
})

const upload = multer({ storage })

router.post('/create', upload.single('skill_img'), skillsController.AddSkill)

router.get('/view', skillsController.ViewSkill)

router.get('/list', skillsController.SkillListing)

router.delete('/delete/:id', skillsController.DeleteSkill)

router.put('/edit/:id', skillsController.EditSkill)

export default router
