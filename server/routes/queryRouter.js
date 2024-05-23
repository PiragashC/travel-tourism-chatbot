const router = require("express").Router();

const { creatingQueryResponse, gettingQueryResponses } = require("../controller/queryController");

// Define routes for user operations

router.post("/create-query-response", creatingQueryResponse);

router.post("/find-matching-response", gettingQueryResponses);

module.exports = router;
