const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // selects id and array of genres for selected movie
  const queryText = `
  SELECT "movies"."id", ARRAY_AGG("genres"."name") AS "genres"
	  FROM "movies"
  JOIN "movies_genres"
	  ON "movies_genres"."movie_id" = "movies"."id"
  JOIN "genres"
  	ON "movies_genres"."genre_id" = "genres"."id"
  GROUP BY "movies"."id"
  HAVING "movies"."id" = $1;`

  const queryParams=[
    req.params.id, 
  ];

  pool
    .query(queryText, queryParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error in GET /api/genre/:id`, error);
      res.sendStatus(500);
    });

});

// need all genres for selection in AddMovie form
router.get('/', (req, res) => {
  // get all of the genres from table
  const queryText = `
    SELECT * FROM "genres";
  `
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error in GET /api/genre`, error);
      res.sendStatus(500);
    });

});

module.exports = router;