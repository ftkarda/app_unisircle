const router = require("express").Router();
const companyController = require("../controllers/companyController");

router.post("/", companyController.create);
router.get("/", companyController.companies);
router.get("/:id", companyController.company);
router.put("/:id", companyController.update);
router.delete("/:id", companyController.delete);

module.exports = router;
