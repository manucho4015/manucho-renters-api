const express = require("express");
const router = express.Router();

const {
  getAllCaretakers,
  getCaretaker,
  createCaretaker,
  updateCaretaker,
  deleteCaretaker,
} = require("../controllers/caretakers");

router.route("/").get(getAllCaretakers).post(createCaretaker);
router
  .route("/:id")
  .get(getCaretaker)
  .patch(updateCaretaker)
  .delete(deleteCaretaker);

module.exports = router;
