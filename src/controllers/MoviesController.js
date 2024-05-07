const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MoviesController {
  async create(request, response) {
    const { user_id } = request.params;
    const { title, description, rating } = request.body;

    if(!title) {
      throw new AppError("Título do filme é obrigatório");
    }

    await knex("movies").insert({ title, description, rating, user_id });

    return response.status(201).json();
  }
}

module.exports = MoviesController;
