const { Router } = require("express");
const tagsRoutes = Router({ mergeParams: true });

const TagsController = require("../controllers/TagsController");
const tagsController = new TagsController();

tagsRoutes.get("/", tagsController.index);

module.exports = tagsRoutes;
