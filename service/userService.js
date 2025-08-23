const { users } = require('../model/userModel');

function registerUser({ username, password, favorecidos = [] }) {
  if (!username || !password) return { error: 'Usuário e senha obrigatórios.' };
  if (users.find(u => u.username === username)) return { error: 'Usuário já existe.' };
  const user = { username, password, favorecidos };
  users.push(user);
  return { user };
}

function loginUser({ username, password }) {
  if (!username || !password) return { error: 'Usuário e senha obrigatórios.' };
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return { error: 'Usuário ou senha inválidos.' };
  return { user };
}

function getUsers() {
  return users;
}

function getUser(username) {
  return users.find(u => u.username === username);
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
};
