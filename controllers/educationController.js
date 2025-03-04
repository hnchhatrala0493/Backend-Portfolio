import Education from '../models/education.js'

export default {
  AddEducation: async function (req, res, next) {
    const { degree, university, startYear, endYear } = req.body

    const EducationInfo = {
      degree: degree,
      university: university,
      startYear: startYear,
      endYear: endYear,
    }

    const createEducation = await Education.create(EducationInfo)

    if (createEducation) {
      res.status(201).send({
        status: '201',
        messages: 'New Education Created',
        result: 'Pass',
        details: createEducation,
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
    console.log('asdasda:', req.body)
  },
  DeleteSkill: async function (req, res, next) {
    console.log(req.body)
  },
  ViewSkill: async function (req, res, next) {
    console.log(req.body)
  },
  EducationListing: async function (req, res, next) {
    const List = await Education.find().sort({ createdAt: -1 })

    const EducationList = List.map((education, index) => ({
      degree: education.degree,
      university: education.university,
      startYear: education.startYear,
      endYear: education.endYear,
    }))
    res.status(201).send({
      status: '201',
      messages: 'List',
      result: 'Pass',
      details: EducationList,
    })
  },
}
