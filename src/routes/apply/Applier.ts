import express from 'express';
import {
  getAllAppliers,
  getApplierByClubId,
  createApplier,
  updateApplier,
  addApplierColumn,
  deleteApplier,
} from '../../controllers/apply/Applier';

const ApplierRouter = express.Router();

ApplierRouter.get('/', getAllAppliers);

ApplierRouter.get('/byClub/:clubId', getApplierByClubId);

ApplierRouter.post('/', createApplier);

ApplierRouter.patch('/:id', updateApplier);

ApplierRouter.patch('/moreColumns/:id', addApplierColumn);

ApplierRouter.delete('/:id', deleteApplier);

export default ApplierRouter;
