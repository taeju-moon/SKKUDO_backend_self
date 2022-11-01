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

export const getToDoTagsByClubId: Controller = (req, res) => {
  ToDoTag.find({ clubId: req.params.clubId })
    .then((todotags) => {
      if (!todotags)
        res.status(404).json({ status: 'fail', error: 'todotags not found' });
      else res.status(200).json({ status: 'success', data: todotags });
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error,
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

// export const deleteToDoTag: Controller = (req, res) => {
//   const id: string = req.params.id;
//   ToDoTag.findById(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).json({ status: 'fail', error: 'toDoTag not found' });
//       } else {
//         ToDo.find({ clubId: data.clubId }).then((todos) => {
//           const filtered = todos.filter((todo: ToDoInterface) =>
//             todo.tags.includes(data)
//           );
//           if (filtered.length > 0)
//             res.status(403).json({
//               status: 'success',
//               error: {
//                 meesage: '해당 태그를 사용하는 일정이 있습니다.',
//                 data: filtered,
//               },
//             });
//           ToDoTag.findByIdAndDelete(id)
//             .then(() =>
//               res
//                 .status(200)
//                 .json({ status: 'success', data: 'successfully deleted' })
//             )
//             .catch((error) =>
//               res.status(400).json({ status: 'fail', error: error.message })
//             );
//         });
//       }
//     })
//     .catch((error) =>
//       res.status(400).json({ status: 'fail', error: error.message })
//     );
// };

export const deleteToDoTag: Controller = (req, res) => {
  const id: string = req.params.id;
  ToDoTag.findOne({ _id: id })
    .then((data) => {
      if (!data)
        res.status(404).json({ status: 'fail', error: 'todotag not found' });
      else
        data
          .remove()
          .then((data) => res.status(200).json({ status: 'success', data }))
          .catch((error) =>
            res.status(500).json({ status: 'fail', error: error.message })
          );
    })
    .catch((error) =>
      res.status(403).json({ status: 'fail', error: error.message })
    );
};
