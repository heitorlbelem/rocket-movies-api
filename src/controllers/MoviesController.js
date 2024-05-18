const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MoviesController {
  async index(request, response) {
    const user_id = request.user.id;
    const { title, tags } = request.query;

    let movies;

    if(tags) {
      const filterTags = tags.split(",").map(tag => tag.trim());

      movies = await knex("tags")
        .select(["movies.id", "movies.title", "movies.user_id"])
        .whereIn("tags.name", filterTags)
        .whereLike("movies.title", `%${title}%`)
        .where("movies.user_id", user_id)
        .innerJoin("movies", "movies.id", "tags.movie_id")
        .orderBy("movies.title");
    } else {
      movies = await knex("movies")
        .whereLike("title", `%${title}%`)
        .where({ user_id })
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });
    const moviesWithTags = movies.map(movie => {
      const movieTags = userTags.filter(tag => tag.movie_id === movie.id);
      return({
        ...movie,
        tags: movieTags,
      });
    });

    return response.json(moviesWithTags);
  }

  async create(request, response) {
    const user_id = request.user.id;
    const { title, description, rating, tags } = request.body;

    if(!title) {
      throw new AppError("Título do filme é obrigatório");
    }

    if(rating && (rating < 0 || rating > 5)) {
      throw new AppError("Avaliação deve estar entre 0 e 5 pontos");
    }

    const [movie_id] = await knex("movies")
      .insert({ title, description, rating, user_id });

    const tagsInsert = tags.map(tag => {
      return({
        movie_id,
        name: tag,
        user_id,
      });
    });

    await knex("tags").insert(tagsInsert);

    return response.status(201).json();
  }

  async update(request, response) {
    const { id } = request.params;
    const { title, description, rating } = request.body;
    const user_id = request.user.id;

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

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const movie = await knex("movies").where({ id, user_id }).first();

    if(!movie) {
      throw new AppError("Filme não encontrado", 404);
    }

    await knex("movies").where({ id: movie.id }).delete();

    return response.status(204).json();
  }
}

module.exports = MoviesController;
