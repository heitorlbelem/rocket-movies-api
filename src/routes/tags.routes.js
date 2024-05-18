const { Router } = require("express");
const tagsRoutes = Router({ mergeParams: true });

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const TagsController = require("../controllers/TagsController");
const tagsController = new TagsController();

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes;
