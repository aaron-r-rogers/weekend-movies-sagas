const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

// for stretch...get one movie at a time
// router.get('/:id', (req, res) => {
//   console.log('req.params is:', req.params);
//   const queryText = `
//     SELECT * FROM "movies"
//     WHERE "movies"."id" = $1;
//   `;

//   const queryParams=[
//     req.params.id, 
//   ];

//   pool.query(queryText, queryParams)
//     .then( result => {
//       console.log('result.rows is:', result.rows);
//       res.send(result.rows);
//     })
//     .catch(err => {
//       console.log('Error in GET /api/movies/:id', err);
//       res.sendStatus(500)
//     })
// });


router.post('/', (req, res) => {
  console.log(req.body);
  // first insert is into movies table...
  const moviesQueryText = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  pool
  // query for movies table...
  .query(moviesQueryText, [
    req.body.title, 
    req.body.poster, 
    req.body.description
  ])
  .then(result => {
    // returned id is generated in DB by 
    // default as serial primary key
    const newMovieId = result.rows[0].id

    // query for movies_genres junction table...
    const moviesGenresQueryText = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
    // add relationship referencing id's...
    pool.query(moviesGenresQueryText, [
      newMovieId, 
      req.body.genre_id
    ])
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      // second query catch
      console.log(err);
      res.sendStatus(500)
    })

  // first query catch
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;