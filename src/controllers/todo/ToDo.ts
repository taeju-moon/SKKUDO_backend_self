import { Controller } from '../../types/common';
import { ToDo } from '../../models/todo/ToDo';

export const getAllToDos: Controller = (req, res) => {
  ToDo.find()
    .then((toDos) =>
      res.status(200).json({
        status: 'success',
        data: toDos,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getOneToDo: Controller = (req, res) => {
  const id: string = req.params.id;
  ToDo.findById(id)
    .then((toDo) => {
      if (!toDo)
        res.status(404).json({ status: 'fail', error: 'toDo not found' });
      res.status(200).json({ status: 'success', data: toDo });
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

export const createToDo: Controller = (req, res) => {
  const toDo = new ToDo(req.body);
  toDo
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const updateToDo: Controller = (req, res) => {
    const id: string = req.params.id;
    ToDo.findOneAndUpdate({ _id: id }, req.body)
      .then((data) => {
        if (!data)
          res.status(400).json({ status: 'fail', error: 'ToDo not found' });
        res.status(200).json({
          status: 'success',
          data,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: 'fail',
          error: error.message,
        })
      );
  };

export const deleteToDo: Controller = (req, res) => {
  ToDo.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
