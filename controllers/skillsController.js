import Skills from '../models/skills.js'

export default {
  AddSkill: async function (req, res, next) {
    const { skill_name, skill_img, skill_percentage } = req.body

    const SkillInfo = {
      skill_name: skill_name,
      skill_img: skill_img,
      skill_percentage: skill_percentage,
    }

    const createSkill = await Skills.create(SkillInfo)

    if (createSkill) {
      res.status(201).send({
        status: '201',
        messages: 'New Skill Created',
        result: 'Pass',
        details: createSkill,
      })
    } else {
      res.send({
        status: '500',
        messages: 'Something went wrong',
        result: 'Fail',
        details: 'Error',
      })
    }
  },
  EditSkill: async function (req, res, next) {
    const { skill_name, skill_img, skill_percentage } = req.body
    const SkillInfo = {
      skill_name: skill_name,
      skill_img: skill_img,
      skill_percentage: skill_percentage,
    }
    const createSkill = await Skills.findByIdAndUpdate(SkillInfo)
  },
  DeleteSkill: async function (req, res, next) {
    console.log(req.body)
  },
  ViewSkill: async function (req, res, next) {
    console.log(req.body)
  },
  SkillListing: async function (req, res, next) {
    const List = await Skills.find().sort({ createdAt: -1 })
    const SkillsList = List.map((skill, index) => ({
      SkillName: skill.skill_name,
      SkillImage: skill.skill_img,
      SkillPercentage: skill.skill_percentage,
    }))
    res.status(201).send({
      status: '201',
      messages: 'List',
      result: 'Pass',
      details: SkillsList,
    })
  },
}
