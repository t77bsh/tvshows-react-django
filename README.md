# tvshows-react-django

This source code is for the deployed production version only. It will not run on your local host. Please use the live site link below instead.

## Live site: https://t77bsh.github.io/tvshows-react-django/

To test comments on the live site without registering, use:

Email: user@admin.com

Pass: test123

## Demo:

https://user-images.githubusercontent.com/100529283/189950450-6bf9454b-e558-449e-9f53-c718e8d05f84.mov


## Overview
A web app that allows users to browse and discuss their favourite classic TV shows.

### Built with
Frontend: React JS, JavaScript, Firebase, HTML, CSS and SCSS.

Backend: Django (Rest Framework), Python and SQLite.


- Fetched TV Shows data from an external API. Created dynamic URL routes for each show.
- Implemented search functionality using the useState hook to find specific shows.
- Integrated authentication using Firebase and created protected URL routes for the sign-in/register page depending on if the user is already logged in.
- Added a comments section where only logged in users can discuss their favourite shows.
- Created my own REST API using Django Rest Framework and integrated it with an SQLite database.
- Implemented full CRUD functionality for user comments using my API and database. Configured settings such that users could only update/delete their own comments.
- Learned best practices for deploying to production while deploying backend API to Heroku.
- Practiced CSS grid and BEM methodology.
