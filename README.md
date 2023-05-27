# ScreenWave - Movie Streaming Application

## Project Details

A movie and web series streaming website using **MERN** stack. User can see movies based on different categories. User can add **reviews** or comments to the movies and also add them to **favorites** after signing in.

Api used - [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)

### Live Link - [https://sreenwave.netlify.app/](https://sreenwave.netlify.app/)

## Tools

ReactJS(React-Router, Axios, Redux-Toolkit), MUI, NodeJS, ExpressJS, MongoDB

## How To Run Locally

Just copy all the files and then create an **.env** files in [server](./server/) directory. For reference use this [.env.example](./server/) file.

In [client](./client/) directory go to [private.client.js](./client/src/api/client/private.client.js) file and [public.client.js](./client/src/api/client/public.client.js) file and change the baseURL to `http://127.0.0.1:<YourPortNumber>/api/v1/` in line no. 4. Use the port number you used in the **.env** file from the server directory.

Then run these following commands -

> In both directory server and client run these below command to install all the dependencies -

```bash
npm i
```

> Then in server directory run these below command to start the backend -

```bash
npm start
```

> Then in client directory run these below command to start the frontend

```bash
npm run dev
```
