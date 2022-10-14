import { Validation } from '../../models/validation/validation';
import { Controller } from '../../types/common';

export const createValidation: Controller = (req, res) => {
  const token = req.cookies.x_auth;
};
