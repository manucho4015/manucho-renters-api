const express = require("express");
const router = express.Router();

const {
  getAllLandlords,
  getLandlord,
  createLandlord,
  updateLandlord,
  deleteLandlord,
} = require("../controllers/landlords");

router.route("/").get(getAllLandlords).post(createLandlord);
router
  .route("/:id")
  .get(getLandlord)
  .patch(updateLandlord)
  .delete(deleteLandlord);

module.exports = router;
