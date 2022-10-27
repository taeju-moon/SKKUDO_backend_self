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
  ToDoTag.find().then((tags) => {
    let k: number = 0;
    for (let i = 0; i < toDo.tags.length; i++) {
      for (let j = 0; j < tags.length; j++) {
        if (
          toDo.tags[i].clubId.toString() === tags[j].clubId.toString() &&
          toDo.tags[i].name === tags[j].name
        ) {
          toDo.tags[i]._id = tags[j]._id;
          k++;
          break;
        }
      }
      if (i === k) {
        res.status(404).json({
          status: 'fail',
          error: {
            message: '존재하지 않는 일정 태그입니다.',
            data: toDo.tags[i],
          },
        });
        break;
      }
    }
    if (k === toDo.tags.length) {
      toDo
        .save()
        .then((data) => res.status(200).json({ status: 'success', data }))
        .catch((error) =>
          res.status(400).json({ status: 'fail', error: error.message })
        );
    }
  });
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
