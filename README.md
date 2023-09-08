# Lotus

<img src="/front/public/favicon.jpg" alt="Lotus Logo" width="200" height="200">
**Lotus** is a social media web application built using the MERN stack (MongoDB, Express, React, Node.js) along with various other technologies. It empowers users to effortlessly share, comment, like, edit, delete, and search for content.

## Features

- Share posts with text, images, links, and more.
- Engage with posts through comments and likes/dislikes.
- Conveniently edit or delete your own posts.
- Search for posts by title or content.
- Categorize posts with tags for easy discovery.
- Secure user authentication and authorization system.
- User registration via email or Google.
- Streamline image uploads with a handy preview feature.
- Responsive design for seamless access on any device.

## Built With

- [React](https://reactjs.org/) - Front-end framework
- [Redux](https://redux.js.org/) - State management
- [Redux Toolkit](https://redux-toolkit.js.org/) - Simplifies Redux code
- [React Router](https://reactrouter.com/) - Routing
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Express](https://expressjs.com/) - Web framework for Node.js
- [Node.js](https://nodejs.org/) - Runtime environment
- CSS - Styling
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) - Async Redux logic
- [Axios](https://axios-http.com/) - Promise-based HTTP client
- [BCrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [JWT](https://jwt.io/) - Stateless user authentication
- [React File Base64](https://www.npmjs.com/package/react-file-base64) - Image uploads
- [React Moment](https://www.npmjs.com/package/react-moment) - Date formatting

## Getting Started

To get started with Lotus, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/lotus.git
   ```

   2. Navigate to the project directory in your terminal of choice (iTerm, Terminal):

   ```bash
   cd lotus
   ```

   3. Install dependencies for the server:

   ```bash
   cd server && npm install
   ```

   4. Install dependencies for the client:

   ```bash
   cd ../client && npm install
   ```

   5. Create an .env file at both the root level as well as inside /server folder. Add the following variables into it:

   ```bash
    CONNECTION_URL =
    PORT =
    JWT_SECRET=
   ```
   6. Run `npm start` from both the `/server/` and `/client/` directories concurrently.

   7.Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Prerequisites

You will need Node >= 8 on your local development machine as well as a MongoDB database running locally or remotely. You can find installation instructions



### Acknowledgments
We extend our heartfelt gratitude to the open-source community and the developers behind the libraries and tools that made this project possible.

### Author
<Mmnsrti> - <Mmnsrti@gmail.com>.

### Questions and Support 
If you have any questions or need support please contact me at [<Mmnsrti@gmail.com>](mmnsrti:Mmnsrti@gmail.com)
