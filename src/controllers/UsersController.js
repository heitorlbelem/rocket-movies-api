const knex = require("../database/knex");
const { hash } = require("bcryptjs");
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
}

module.exports = UsersController;
