const express = require('express');
const router = express.Router();

const cc =require("../controllers/collegecontroller")
const ic =require("../controllers/interncontroller")

router.post("/colleges",cc.createCollege)
router.post("/interns",ic.createIntern)
router.get("/collegeDetails",cc.getcollege)
module.exports = router;