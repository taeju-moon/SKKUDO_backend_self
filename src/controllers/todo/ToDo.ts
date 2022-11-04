import { Controller } from '../../types/common';
import { ToDo } from '../../models/todo/ToDo';
import { ToDoTag } from '../../models/todo/ToDoTag';

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

export const getToDosByClubId: Controller = (req, res) => {
  ToDo.find({ clubId: req.params.id })
    .then((todos) => {
      if (!todos)
        res.status(404).json({ status: 'fail', error: 'todos not found' });
      res.status(200).json({ status: 'success', data: todos });
    })
    .catch((error) =>
      res.status(500).json({ status: 'fail', error: error.message })
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
  req.body.writer = req.body.authUser.name;
  const toDo = new ToDo(req.body);
  toDo
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const updateToDo: Controller = (req, res) => {
  req.body.writer = req.body.authUser.name;
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
