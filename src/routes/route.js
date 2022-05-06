const express = require('express');
const router = express.Router();

const cc =require("../controllers/collegecontroller")
const ic =require("../controllers/interncontroller")

router.post("/functionUp/colleges",cc.createCollege)
router.post("/functionUp/interns",ic.createIntern)
router.get("/functionUp/collegeDetails",cc.getcollege)
module.exports = router;