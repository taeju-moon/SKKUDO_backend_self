import { Middleware } from '../types/common';
import { User as UserInterface, RegisteredClub } from '../types/user';
import { Validation as ValidationInterface } from '../types/validation';
import { Validation } from '../models/validation/validation';

export const canRetrievePrivateToDos: Middleware = async (req, res, next) => {
  const user: any = req.body.authUser;
  const club: RegisteredClub = user.findByClubId(req.params.clubId);
  const validation: any = await Validation.findOne({
    clubId: req.params.clubId,
  });
  const result: boolean = Validation.validateUser(
    validation.todoWrite,
    club.role
  );
  req.body.private = result;
  next();
};
