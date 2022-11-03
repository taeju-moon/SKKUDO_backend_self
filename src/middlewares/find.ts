import { Middleware } from '../types/common';
import { User } from '../models/user/User';
import { User as UserInterface } from '../types/user';
import { RegisteredClub } from '../types/user';

export const findUsersByClubId: Middleware = (req, res, next) => {
  const clubId: string = req.params.clubId;
  const refine = (registeredClubs: RegisteredClub[], clubId: string) => {
    let found = 0;
    registeredClubs.forEach((club) => {
      if (String(club.clubId) === clubId) found = 1;
    });
    return found;
  };
  User.find()
    .then(async (users: UserInterface[]) => {
      const refinedUsers: UserInterface[] = await users.filter((user) => {
        return refine(user.registeredClubs, clubId);
      });
      if (!refinedUsers)
        res.status(404).json({ status: 'fail', error: '404 not found' });
      req.body.refinedUsers = refinedUsers;
      next();
    })
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
