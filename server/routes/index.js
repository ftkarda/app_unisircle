const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const userRoute = require("./userRoute");

router.use("/", userRoute);

router.use(authentication)

module.exports = router;
