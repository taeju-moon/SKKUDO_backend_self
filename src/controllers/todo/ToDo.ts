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
  ToDo.find({ clubId: req.params.clubId })
    .then((todos) => {
      if (!todos) {
        res.status(404).json({ status: 'fail', error: 'todos not found' });
        return;
      }
      if (req.body.private !== true) {
        res.status(200).json({ status: 'success', data: todos });
      } else {
        const elems = todos.filter((todo) => todo.private === false);
        res.status(200).json({ status: 'success', data: elems });
      }
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
  if (new Date(req.body.startTime) >= new Date(req.body.endTime)) {
    res.status(400).json({
      status: 'fail',
      error: '일정의 끝나는 시간이 시작 시간보다 앞설 수 없습니다.',
    });
  } else {
    toDo
      .save()
      .then((data) => res.status(200).json({ status: 'success', data }))
      .catch((error) =>
        res.status(400).json({ status: 'fail', error: error.message })
      );
  }
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
