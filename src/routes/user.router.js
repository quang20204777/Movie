const express = require('express');
const upload = require('../utils/multer');
const {userAuth, adminAuth} = require('../middlewares/auth');
const {  createUser,
  createAdmin,
  uploadUserPhoto,
  loginAdmin,
  loginUser,
  loginWithFacebook,
  loginWithGoogle,
  logoutUser,
  logoutAll,
  getUsers,
  getUserProfile,
  getUserById,
  updateUserProfile,
  updateUserById,
  deleteUserById,
  deleteCurrentUser,} = require('../controllers/user.controller.js');

const userRouter = new express.Router();

userRouter.post('/users', createUser);

userRouter.post('/users/createAdmin', createAdmin);

userRouter.post('/users/photo/:id', upload('users').single('file'), uploadUserPhoto);

userRouter.post('/users/login', loginUser);
userRouter.post('/users/loginAdmin', loginAdmin);

userRouter.post('/users/login/facebook', loginWithFacebook);

userRouter.post('/users/login/google', loginWithGoogle);

userRouter.post('/users/logout', userAuth, logoutUser);

userRouter.post('/users/logoutAll', adminAuth, logoutAll);

userRouter.get('/users', adminAuth, getUsers);

userRouter.get('/users/me', userAuth, getUserProfile);

userRouter.get('/users/:id', adminAuth, getUserById);

userRouter.put('/users/me', userAuth, updateUserProfile);

userRouter.put('/users/:id', adminAuth, updateUserById);

userRouter.delete('/users/:id', adminAuth, deleteUserById);

userRouter.delete('/users/me', userAuth, deleteCurrentUser);

module.exports = {userRouter};
