const express = require('express');
const router = express.Router();

// @route    POST api/users/
// @desc     Register user
// @access   Public
router.get(
  '/',
  async (req, res) => {

    console.log(req.body)

  }
);




module.exports = router;