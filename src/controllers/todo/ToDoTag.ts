import { Controller } from '../../types/common';
import { ToDoTag } from '../../models/todo/ToDoTag';

export const getAllToDoTags: Controller = (req, res) => {
  ToDoTag.find()
    .then((toDoTags) =>
      res.status(200).json({
        status: 'success',
        data: toDoTags,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getOneToDoTag: Controller = (req, res) => {
  const id: string = req.params.id;
  ToDoTag.findById(id)
    .then((toDoTag) => {
      if (!toDoTag)
        res.status(404).json({ status: 'fail', error: 'toDoTag not found' });
      res.status(200).json({ status: 'success', data: toDoTag });
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

export const createToDoTag: Controller = (req, res) => {
  const toDoTag = new ToDoTag(req.body);
  toDoTag
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const deleteToDoTag: Controller = (req, res) => {
  ToDoTag.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};