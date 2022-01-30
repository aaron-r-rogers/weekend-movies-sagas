# Movie List App

## Description

_Duration: 3 day sprint_

This app is a collection of assorted movies.  The main page lists all of the movies in the database with a poster and title.  Clicking on any image lets you view that movie's details.  There is also a button at the top that allows you to add a new movie to the database.

## Screenshot

![App in use:](https://github.com/aaron-r-rogers/weekend-movies-sagas/blob/master/wireframes/MovieAppDemo.gif)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- Other dependencies can be viewed/installed via the accompanying .json files

## Installation

1. Create a database named `saga_movies_weekend`
2. The queries in the `tables.sql` file are set up to create all the tables and populate the data for the app to run properly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. Postico is recommended to run those queries as that was used to create the queries
3. Open up your editor of choice (I'm partial to VS Code) and run an `npm install`
4. Run `npm start` in your terminal
5. In another terminal, run `npm run client` in your terminal to open the app in a new browser tab

## Usage

1. All images are listed on the home page. While scrolling, an icon will appear at the bottom right of the page that returns you to the top.
2. Click on an image to view its details.
3. Click "Back to Movie List" to return to the home page.
4. Click "Add Movie" to go to the form which allows you to add a movie to the database. (Use direct URLs.)
5. Click "Add Movie" on the "Add a Movie" page to submit the movie to the database or "Cancel" to return to the home page.

## Built With

React, Redux, Redux-Saga, JavaScript, HTML, and CSS, with help from MUI for styling and PostgreSQL for the database.

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io), especially Edan and the Woodall Cohort, who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at [rogers.aaron.r@mail.com](mailto:rogers.aaron.r@gmail.com)

