const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const userRoute = require("./userRoute");
const companyRoute = require("./companyRoute");
const itemRoute = require("./itemRoute");
const orderRoute = require("./orderRoute");

router.use("/", userRoute);

router.use(authentication)

router.use("/companies", companyRoute)
router.use("/items", itemRoute)
router.use("/orders", orderRoute)

module.exports = router;
