const { User } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create User
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {new: true, runValidators: true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // add friend to a user
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true })
      .populate({ path: 'friends', select: ('-__v') })
      .select('-__v')
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No User found with this ID' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => res.json(err));
  },

  // Delete a friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No User found with this ID' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = userController;
