import { Controller } from '../../types/common';
import { Budget } from '../../models/budget/Budget';

export const getAllBudgets: Controller = (req, res) => {
  Budget.find()
    .then((budgets) =>
      res.status(200).json({
        status: 'success',
        data: budgets,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getBudgetsByClubId: Controller = (req, res) => {
  Budget.find({ clubId: req.params.clubId })
    .then((budgets) => {
      if (!budgets) {
        res.status(404).json({ status: 'fail', error: 'budgets not found' });
      }
      else {
        res.status(200).json({ status: 'success', data: budgets });
      }
    })
    .catch((error) =>
      res.status(500).json({ status: 'fail', error: error.message })
    );
};

export const getOneBudget: Controller = (req, res) => {
  const id: string = req.params.id;
  Budget.findById(id)
    .then((budget) => {
      if (!budget) {
        res.status(404).json({ status: 'fail', error: 'budget not found' });
      }
      else {
        res.status(200).json({ status: 'success', data: budget });
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

export const createBudget: Controller = (req, res) => {
  const budget = new Budget(req.body);
  budget
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const updateBudget: Controller = (req, res) => {
  const id: string = req.params.id;
  Budget.findOneAndUpdate({ _id: id }, req.body)
    .then((budget) => {
      if (!budget) {
        res.status(400).json({ status: 'fail', error: 'budget not found' });
      }
      else {
        res.status(200).json({
          status: 'success',
          budget,
        });
      }
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const deleteBudget: Controller = (req, res) => {
  Budget.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};