import express from 'express'
const router = express.Router()
import educationController from '../controllers/educationController.js'
import { body } from 'express-validator'

router.post(
  '/create',
  // body('degree').not().isEmpty(),
  // body('university').not().isEmpty(),
  // body('startYear').not().isEmpty().isNumeric(),
  // body('endYear').not().isEmpty().isNumeric(),
  educationController.AddEducation,
)
router
  .get('/view', body('_id').not().isEmpty(), educationController.ViewSkill)
  .get('/list', educationController.EducationListing)
// router
//   .delete('/delete', body('_id').not().isEmpty(), educationController.DeleteSkill)
//   .put(
//     '/edit/:id',
//     body('degree').not().isEmpty(),
//     body('university').not().isEmpty(),
//     body('startYear').not().isEmpty(),
//     body('endYear').not().isEmpty(),
//     skillsController.EditSkill,
//   )

export default router
