const { Router } = require("express");
const moviesRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const MoviesController = require("../controllers/MoviesController");
const moviesController = new MoviesController();

moviesRoutes.use(ensureAuthenticated);

moviesRoutes.get("/", moviesController.index);
moviesRoutes.post("/", moviesController.create);
moviesRoutes.put("/:id", moviesController.update);
moviesRoutes.delete("/:id", moviesController.delete);

module.exports = moviesRoutes;
