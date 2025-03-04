import mongoose from 'mongoose'

const SkillsSchema = new mongoose.Schema(
  {
    skill_name: {
      type: String,
      required: true,
    },
    skill_img: {
      type: String,
      required: true,
    },
    skill_percentage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Skills = mongoose.model('Skills', SkillsSchema)

export default Skills
