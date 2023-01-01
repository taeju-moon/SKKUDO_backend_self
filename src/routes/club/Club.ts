import express from 'express';
import multer from 'multer';
import {
  getAllClubs,
  getNotAcceptedClubs,
  getOneClub,
  createClub,
  updateClub,
  acceptClub,
  deleteClub,
  addClubUserColumn,
  updateClubUserColumn,
  deleteClubUserColumn,
  uploadImage,
} from '../../controllers/club/Club';
import {
  authByValidationTable,
  auth,
  authBySuperUser,
} from '../../middlewares/auth';
import { refineUsers } from '../../middlewares/refineUser';
import { isApplierExist } from '../../middlewares/club';

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/', //저장할 image의 경로
    filename: function (req, file, cb) {
      //저장할 image의 이름
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

const ClubRouter = express.Router();

ClubRouter.get('/', getAllClubs);

//auth, authBySuperUser: superuser 권한에게만 허용
ClubRouter.get('/notAccepted', getNotAcceptedClubs);

ClubRouter.get('/:clubId', getOneClub);

ClubRouter.post('/', auth, createClub);

ClubRouter.patch('/:clubId', isApplierExist, authByValidationTable, updateClub);

ClubRouter.patch('/accept/:clubId', auth, authBySuperUser, acceptClub);

ClubRouter.delete(
  '/:clubId',
  isApplierExist,
  authByValidationTable,
  deleteClub
);

ClubRouter.post(
  '/userColumn/:clubId',
  authByValidationTable,
  refineUsers,
  isApplierExist,
  addClubUserColumn
);

ClubRouter.patch(
  '/userColumn/:clubId',
  authByValidationTable,
  refineUsers,
  isApplierExist,
  updateClubUserColumn
);

ClubRouter.delete(
  '/userColumn/:clubId',
  authByValidationTable,
  refineUsers,
  isApplierExist,
  deleteClubUserColumn
);

ClubRouter.post(
  '/upload/:clubId',
  authByValidationTable,
  upload.single('image'),
  uploadImage
);

export default ClubRouter;
