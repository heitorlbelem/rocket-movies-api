const { Router } = require("express");
const usersRoutes = require("./users.routes");
const moviesRoutes = require("./movies.routes");
const tagsRoutes = require("./tags.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/users/:user_id/movies", moviesRoutes);
routes.use("/users/:user_id/tags", tagsRoutes);

module.exports = routes;
