const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MoviesController {
  async create(request, response) {
    const { user_id } = request.params;
    const { title, description, rating } = request.body;

    if(!title) {
      throw new AppError("Título do filme é obrigatório");
    }

    if(rating && (rating < 0 || rating > 5)) {
      throw new AppError("Avaliação deve estar entre 0 e 5 pontos");
    }

    await knex("movies").insert({ title, description, rating, user_id });

    return response.status(201).json();
  }

  async update(request, response) {
    const { user_id, id } = request.params;
    const { title, description, rating } = request.body;

    const movie = await knex("movies").where({ id, user_id }).first();
    if(!movie) {
      throw new AppError("Filme não encontrado", 404);
    }

    if(rating && (rating < 0 || rating > 5)) {
      throw new AppError("Avaliação deve estar entre 0 e 5 pontos");
    }

    movie.title = title ?? movie.title;
    movie.description = description ?? movie.description;
    movie.rating = rating ?? movie.rating;

    await knex("movies").where({ id }).update({
      title: movie.title,
      description: movie.description,
      rating: movie.rating,
    });

    return response.status(200).json(movie);
  }
}

module.exports = MoviesController;
