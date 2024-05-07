const { Router } = require("express");
const moviesRoutes = Router({ mergeParams: true });

const MoviesController = require("../controllers/MoviesController");
const moviesController = new MoviesController();

moviesRoutes.post("/", moviesController.create);

module.exports = moviesRoutes;
