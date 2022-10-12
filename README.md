## Links
* Deployed App: [Petsgram website](https://main.diaw7mtof8uhl.amplifyapp.com/)

![homepage](/screenshots/homepage.JPG)

## Summary
//TODO

## Installation
1. Go to the project root
2. Run `npm install` to install dependencies
3. Start project on development server with `npm run start:dev`

## Technology
### <u>Client</u>
* Built with create-react-app.
* Uses [react-router](https://reactrouter.com/) for front-end routing
### <u>Server</u>
* Node and Express
### <u>Database</u>
* Hosted by MongoDB
* Files uploaded to AWS S3 Bucket

# Screenshots

## Welcome
![welcome](/screenshots/welcome.JPG)

## Home Screen
![homescreen](/screenshots/home-screen.JPG)

## Register
![register](/screenshots/register.JPG)

## Profile
![profile](/screenshots/profile.JPG)

## Search
![search](/screenshots/search.JPG)


## Documentation for API 
| Route                                | Description                                        | Methods |
| ------------------------------------ | -------------------------------------------------- | ------- |

| /users?userId=id                     | returns a user's details                           | GET     | 
| /users?username=username             | returns a user's details                           | GET     |  
| /users/followers/:userId             | returns a list of followers for a specific user    | GET     |
| /users/:userId/follow	               | updates the followed user's followers list         | PUT     |
| /users/search/:username	            | returns a list of matching usernames               | GET     |
| /users/:userId/img                   | updates the profile photo of the current user      | PUT     |
| /users/following/:userId	            | returns a list of followed users                   | GET     |

| /posts/timeline/all	               | returns a list of all posts                        | GET     |
| /posts/timeline/:id	               | returns a list of followed users's posts           | GET     |
| /posts/profile/:username	            | remove a list of posts of the specified user       | GET     |
| /posts/:postId/like	               | updates the list of likes of the specified post    | PUT     |
| /posts	                              | creates a new post                                 | POST    |
| /posts/:postId/:userId	            | deletes a post                                     | DELETE  |

| /auth/login           	            | verifies user credintials                          | POST    |
| /auth/register                       | registers a user                                   | POST    |

| /comments                 	         | creates a new comment                              | POST    |
| /comments/:postId	                  | returns a list of comments for the specified post  | GET     |

| /upload	                           | uploads a file to the s3 bucket                    | POST    |


## User Example
```
{
    data: {
{
    "_id": "6346056f003f46fccb36ad4d",
    "username": "the-heba",
    "email": "heba@gmail.com",
    "followers": [
        "63460545003f46fccb36ad45"
    ],
    "following": [
        "634604cc003f46fccb36ad38",
        "63460545003f46fccb36ad45"
    ],
    "isAdmin": false,
    "pets": [],
    "profilePicture": "https://petsgram-app.s3.us-west-1.amazonaws.com/m9eXLgnY6-45672425.jpg",
    "coverPhoto": "https://img.freepik.com/free-vector/animal-background-vector-with-cute-pets-illustration_53876-127698.jpg?w=2000",
    "notifications": [],
    "createdAt": "2022-10-12T00:08:15.666Z",
    "__v": 0
}
    }
}
```

## Post Example
```
{
    "_id": "634604f0003f46fccb36ad3c",
    "userId": "634604cc003f46fccb36ad38",
    "desc": "isnt he the cutest?",
    "img": "https://petsgram-app.s3.us-west-1.amazonaws.com/Oqeq1cK96-2a633716cabd5c9613a4e89946c67e7a.jpg",
    "likes": [],
    "comments": 0,
    "createdAt": "2022-10-12T00:06:08.216Z",
    "updatedAt": "2022-10-12T00:06:08.216Z",
    "__v": 0
}
```
