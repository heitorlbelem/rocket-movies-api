const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userExists = await knex("users").where({ email }).first();
    if(userExists) {
      throw new AppError("E-mail já está registrado para outro usuário");
    }

    const hashedPassword = await hash(password, 0);

    await knex("users").insert({ name, email, password: hashedPassword });

    response.status(201).json();
  }

  async update(request, response) {
    const id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const user = await knex("users").where({ id }).first();
    if(!user) {
      throw new AppError("Usuário não encontrado");
    }

    const otherUserWithEmail = await knex("users").where({ email }).first();

    if(otherUserWithEmail && (otherUserWithEmail.id !== user.id)) {
      throw new AppError("E-mail já registrado para outro usuário");
    }

    if(password && !old_password) {
      throw new AppError("Você deve fornecer a senha atual para definir uma nova senha");
    }

    if(password && old_password) {
      const passwordMatch = await compare(old_password, user.password);
      if(!passwordMatch) {
        throw new AppError("Senha fornecida não confere");
      }

      user.password = await hash(password, 0);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    await knex("users")
      .where({ id })
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
      });

    delete user.password;
    response.json(user);
  }
}

module.exports = UsersController;
