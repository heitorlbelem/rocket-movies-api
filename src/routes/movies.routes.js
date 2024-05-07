const { Router } = require("express");
const moviesRoutes = Router({ mergeParams: true });

const MoviesController = require("../controllers/MoviesController");
const moviesController = new MoviesController();

moviesRoutes.post("/", moviesController.create);
moviesRoutes.put("/:id", moviesController.update);

module.exports = moviesRoutes;
