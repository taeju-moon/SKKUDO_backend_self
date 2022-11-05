import express from 'express';
import {
  getAllAppliers,
  getApplierByClubId,
  createApplier,
  updateApplier,
  deleteApplier,
} from '../../controllers/apply/Applier';
import { isThereAppliedUsers } from '../../middlewares/apply';
import {
  authByValidationTable,
  authBySuperUser,
  auth,
} from '../../middlewares/auth';

const ApplierRouter = express.Router();

ApplierRouter.get('/', getAllAppliers);

ApplierRouter.get('/byClub/:clubId', getApplierByClubId);

ApplierRouter.post('/', authByValidationTable, createApplier);

ApplierRouter.patch(
  '/:clubId',
  isThereAppliedUsers,
  authByValidationTable,
  updateApplier
);

ApplierRouter.delete(
  '/:clubId',
  isThereAppliedUsers,
  authByValidationTable,
  deleteApplier
);

export default ApplierRouter;
