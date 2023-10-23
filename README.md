# News Site With Google Authentication

### Set up "posts" table in the "news" database with the following SQL query:
```
CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(30) NOT NULL,
  pictureURL VARCHAR(300),
  title VARCHAR(80) NOT NULL,
  text VARCHAR(600) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

### Install dependencies:
1. Navigate to server folder and run "npm install"
2. Navigate to client folder and run "npm install"

### Run the app:
1. Navigate to server folder and run "nodemon app.js"
2. Navigate to client folder and run "npm start"
3. Open http://localhost:3000 in your browser
