**HacktivOverflow API Documentation**
---
Simple HacktivOverflow app with authenthication and authorization API build using Express, Mongoose, Bcryptjs, Axios, and JSON Web Token in the server side. As for the client side, it was built using Vue, Vuex and Bootstrap Vue.

## List of API Routes

Route | HTTP | Description
----- | ---- | -----------
/register | POST | Route used to create a new account
/login | POST | Route used to let user login to app
/questions | GET | Route used to retrieve all questions in database
/questions | POST | Route used to create a question
/questions/top | GET | Route used to retrieve all questions sorted by views count
/questions/:id | GET | Route used to retrieve one question (based on it's _id)
/questions/:id | PUT | Route used to edit and update a question
/questions/:id | DELETE | Route used to delete a question
/questions/upvote/:id | PATCH | Route used to edit an upvote count from question
/questions/downvote/:id | PATCH | Route used to edit a downvote count from question
/questions/views/:id | PATCH | Route used to increase views count in question
/answers/ | GET | Route used to retrieve all answers
/answers/ | POST| Route used to create an answer
/answers/:id | GET | Route used to retrieve one answer (based on it's _id)
/answers/:id | PATCH | Route used to edit and update an answer
/answers/:id | DELETE| Route used to delete an answer
/answers/upvote/:id | PATCH | Route used to edit an upvote count from question
/answers/downvote/:id | PATCH | Route used to edit a downvote count from question

## Usage

With only npm: 

```javascript
npm install
npm run dev in server folder
npm run serve in client folder
```

**Register**
----
  Register new account to the database and returns a json response if succeeded.

* **URL**

  /register

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

```javascript
{
    "name" : String,
    "password" : String,
    "email" : String
} 
```

* **Success Response:**

  * **Code:** 201 CREATED <br />
  * **Content:** `{ token: token retrieved from server generated using json web token }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Log In**
----
  Verify user's authentication and returns token if data is valid.

* **URL**

  /login

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

```javascript
{
    "email" : String,
    "password" : String
} 
```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ token: token retrieved from server generated using json web token }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Wrong email or password" }`

**Get Questions**
----
  Request to retrieve all questions data

* **URL**

  /questions

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all questions data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`

**Create a question**
----
  Post request to server to create a question.

* **URL**

  /questions

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

```javascript
{
    "title" : String,
    "user" : ObjectId,
    "description" : String,
    "upvotes" : ObjectId,
    "downvotes" : ObjectId,
    "views": Number
} 
```

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ data : post data}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`


**Edit Question**
----
  Edit question and update the existing data in the database.

* **URL**

  /questions/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (edited question)

* **Data Params**

```javascript
{
    "title" : String,
    "description" : String
} 
```

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully updated question }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`


**Delete Question**
----
  Delete question from the database 

* **URL**

  /questions/:id

* **Method:**
  
  `DELETE`

* **URL Params**

  id (deleted question)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully deleted question }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`


**Update Upvotes Count**
----
  Increase upvotes count in question

* **URL**

  /questions/upvote/:id

* **Method:**
  
  `GET`

* **URL Params**

  id (edited question)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`



**Update Downvotes Count**
----
  Increase downvotes count in question

* **URL**

  /questions/downvote/:id

* **Method:**
  
  `GET`

* **URL Params**

  id (edited question)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`

**Update Views Count**
----
  Increase views count in question

* **URL**

  /questions/views/:id

* **Method:**
  
  `GET`

* **URL Params**

  id (edited question)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`


**Get Answers**
----
  Request to retrieve all answers data

* **URL**

  /answers

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all answers data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`

**Create a answer**
----
  Post request to server to create a answer.

* **URL**

  /answers

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

```javascript
{
    "user" : ObjectId,
    "question" : ObjectId,
    "description" : String,
    "upvotes" : ObjectId,
    "downvotes" : ObjectId
} 
```

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ data : post data}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`


**Edit Answer**
----
  Edit answer and update the existing data in the database.

* **URL**

  /answers/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (edited answer)

* **Data Params**

```javascript
{
    "description" : String
} 
```

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully updated answer }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`


**Delete Answer**
----
  Delete answer from the database 

* **URL**

  /answers/:id

* **Method:**
  
  `DELETE`

* **URL Params**

  id (deleted answer)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully deleted answer }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`


**Update Upvotes Count**
----
  Increase Upvotes count in answer

* **URL**

  /answers/upvote/:id

* **Method:**
  
  `GET`

* **URL Params**

  id (edited answer)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`



**Update Downvotes Count**
----
  Increase Downvotes count in answer

* **URL**

  /answers/downvote/:id

* **Method:**
  
  `GET`

* **URL Params**

  id (edited answer)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ err : error object }`




