const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.create);
router.get("/", orderController.orders);
router.get("/:id", orderController.order);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);
router.patch("/:id", orderController.patchStatus);

module.exports = router;
