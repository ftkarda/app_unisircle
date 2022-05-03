const router = require("express").Router();
const itemController = require("../controllers/itemController");

router.post("/", itemController.create);
router.get("/", itemController.items);
router.get("/:id", itemController.item);
router.put("/:id", itemController.update);
router.delete("/:id", itemController.delete);

module.exports = router;
