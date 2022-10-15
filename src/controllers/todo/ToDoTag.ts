import { Controller } from '../../types/common';
import { ToDoTag } from '../../models/todo/ToDoTag';
import { ToDo } from '../../models/todo/ToDo';
import { Types } from 'mongoose';

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
  const id: string = req.params.id;
  let tag: Types.ObjectId | undefined;
  let k: any[] = [];
  ToDoTag.findById(id)
    .then((data) => {
      if (typeof data?._id === 'undefined') {
        res.status(404).json({ status: 'fail', error: 'toDoTag not found'})
      }
      else {
        tag = data._id
        ToDo.find()
          .then((toDos) => {
            for (let i = 0; i < toDos.length; i++) {
              for (let j = 0; j < toDos[i].tags.length; j++) {
                if (typeof toDos[i].tags[j]._id === 'undefined' || typeof tag === 'undefined') {}
                else {
                  if (toDos[i].tags[j]._id.toString() === tag.toString()) {
                    k.push(toDos[i]);
                  }
                }
              }
            }
            if (k.length > 0) {
              res.status(401).json({
                status: 'fail',
                error: {
                  message: '해당 태그를 사용하고 있는 일정이 있습니다.',
                  data: k
                }
              })
            }
            else {
              ToDoTag.findByIdAndDelete(id)
                .then((data2) => res.status(200).json({ status: 'success', data2 }))
                .catch((error) =>
                  res.status(400).json({ status: 'fail', error: error.message })
                );
            }
          });
      }
    })
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

/*
export const deleteToDoTag: Controller = (req, res) => {
  ToDoTag.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
*/