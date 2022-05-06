const express = require('express');
const router = express.Router();

const cc =require("../controllers/collegecontroller")
const ic =require("../controllers/interncontroller")

router.post("/functionp/colleges",cc.createCollege)
router.post("/functionp/interns",ic.createIntern)
router.get("/functionup/collegeDetails",cc.getcollege)
module.exports = router;