const express = require('express');
const {
  register,
  registerAdmin,
  loginUser,
  loginAdmin,
  logout,
  logoutAll,
  getAllUsers,
  getUserById,
  getUserInfo,
  updateUserById,
  updateUser,
  deleteUserById,
} = require('../controller/user.controller.js');
const { userAuth, adminAuth } = require('../middlewares/auth.js');
const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/registerAdmin', registerAdmin);
userRouter.post('/loginAdmin', loginAdmin);
userRouter.post('/loginGuest', loginUser);
userRouter.post('/logout', userAuth, logout);
userRouter.post('/logoutAll', adminAuth, logoutAll);
userRouter.get('/getAllUsers', adminAuth, getAllUsers);
userRouter.get('/getUserById/:id', adminAuth, getUserById);
userRouter.get('/getUserInfo', userAuth, getUserInfo);
userRouter.put('/updateUserById/:id', adminAuth, updateUserById);
userRouter.put('/updateUser', userAuth, updateUser);
userRouter.delete('/deleteUserById/:id', adminAuth, deleteUserById);

module.exports = {
  userRouter,
};
