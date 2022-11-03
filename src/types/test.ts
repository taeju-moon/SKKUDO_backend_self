import { RegisteredClub } from './user';

interface registeredClubs {
  [key: string]: RegisteredClub;
}

const a: registeredClubs = {
  id: {
    clubId: 'aa',
  },
};
