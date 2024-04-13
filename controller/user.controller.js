const { User } = require("../model/user.js");

//registerUser
const register = async (req, res) => {
  try {
    const { role } = req.body;
    if (role) throw new Error("You cannot set role property.");
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

//Register Admin
const registerAdmin = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

//Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(401).send(`Invalid user or password`);
  }
};

//Login admin
const loginAdmin = async (req, res) => {
  const { username, password } = req.body
  try{
    const user = await User.findSuperAdminByCredentials(username, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  }catch(e) {
    res.status(401).send(`Invalid user or password`);
  }
}

//Logout user
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send(`Logout user success!`);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Logout all
const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send(`Logout all device success!`);
  } catch (e) {
    res.status(400).send(e);
  }
};

//User information
const getUserInfo = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Edit/ update user by user
const updateUser = async (req, res) => {
  // Tạo mảng updates chứa tất cả các keys trong req.body
  const updates = Object.keys(req.body);
  // Chứa các trường được phép cập nhật
  const allowedUpdates = ["name", "phone", "username", "email", "password"];
  // Kiểm tra các phần tử trong updates có nằm trong allowedUpdates hay không.
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const { user } = req;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Get all users --admin
const getAllUsers = async (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(400).send(`Only admin can see all the users!`);

  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Get user by id -- admin
const getUserById = async (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(400).send(`Only admin can see all the users!`);
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send(`User not found`);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Update user by ID --admin
const updateUserById = async (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(400).send(`Only admin can update the users by ID!`);
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "phone",
    "username",
    "email",
    "password",
    "role",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) return res.status(404).send(`User not found`);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Delete by id --admin
const deleteUserById = async (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(400).send(`Only admin can update the users by ID!`);

  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) return res.status(404).send(`User not found`);
    res.status(200).send(`User deleted!`);
  } catch (e) {
    res.status(400).send(e);
  }
};
module.exports = {
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
};
