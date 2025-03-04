import mongoose from 'mongoose'

const EducationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    startYear: {
      type: String,
      required: true,
    },
    endYear: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Education = mongoose.model('Education', EducationSchema)

export default Education
