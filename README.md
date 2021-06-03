# homelike


/**
 * This repository has the following functions
 * Signup
 * Login
 * Create Apartment
 * Search Apartment
 * Favorite Apartment
 * List Favorites
 * Author: Muthuselvi
 * Created: 03/06/2021
 */

Assumption - Node latest Version & mongo installed
npm install
npm start

POSTMAN collection link https://www.getpostman.com/collections/7de0e5ad72ec6f201e32

1. Sign Up User

Mandatory body params - name, email, password (name minimum five letters, proper email & Password with one small, capital letter, symbol and number)

POST http://localhost:3000/auth/signup

Request Header: content-type →application/json
Request Body:

{"name":"Muthuselvi","email":"muthuselvi2018@gmail.com","password":"Password!2"}

Success Response:

{
    "id": "5fbce17ca9a84f3c1ced0020",
    "message":"",
    "token": "authtoken to be used in subsequent requests"
}

2. Login User

Mandatory body params - email, password 

POST http://localhost:3000/auth/login

Request Header: content-type →application/json
Request Body:

{"email":"muthuselvi2018@gmail.com","password":"Password!2"}

Success Response:

{
    "id": "5fbce17ca9a84f3c1ced0020",
    "message":"",
    "token": "authtoken to be used in subsequent requests"
}


3. Create Apartment

Adds the apartment and links it to user from session information

POST http://localhost:3000/apartment/add

Request Header: content-type →application/json
Request Header: Authorization → token got from signup/login
Request Body:

{"name":"Studio apartment","city":"Berlin","address":"yumxo sjjis","lat":52.5978114,"lon":13.2952603, "noOfRooms":2,"country":"Germany"}

Success Response:

{
    "apartmentId": "60b7ebd60ed0435e2c51dce5"
}

4. Favorite/Unfavorite apartment for the user

Save flag true/false to favorite/unfavorite apartment for the user in session
PUT http://localhost:3000/apartment/favorite


Request Header: content-type →application/json
Request Header: Authorization → token got from signup/login
Request Body:

{
    "apartmentId": "60b7ce7ce663d45b480aadac",
    "save": true
}

Success Response:

200

4. Lists Favorite apartments of the user

Lists Favorite apartments of the user in session
GET http://localhost:3000/apartment/favorite

Request Header: Authorization → token got from signup/login

Success Response:

{
    "apartments": [
        {
            "geo": {
                "coordinates": [
                    12,
                    88
                ],
                "type": "Point"
            },
            "_id": "60b7ce7ce663d45b480aadac",
            "userId": "60b7ce505a6ab555f8cf9e34",
            "name": "Studio apartment",
            "address": "yumxo sjjis",
            "city": "Berlin",
            "country": "Germany",
            "noOfRooms": 2,
            "createdAt": "2021-06-02T18:31:24.326Z",
            "updatedAt": "2021-06-02T18:31:24.326Z"
        }
    ]
}


4. Search apartment

No Mandatory query param
Filters:
city
country
distance,lat,lon - distance filter

GET http://localhost:3000/apartment/search?lat=52.5245351&lon=13.3710013&distance=30&city=berlin&country=germany

Request Header: Authorization → token got from signup/login

Success Response:

{
    "apartments": [
        {
            "geo": {
                "coordinates": [
                    12,
                    88
                ],
                "type": "Point"
            },
            "_id": "60b7ce7ce663d45b480aadac",
            "userId": "60b7ce505a6ab555f8cf9e34",
            "name": "Studio apartment",
            "address": "yumxo sjjis",
            "city": "Berlin",
            "country": "Germany",
            "noOfRooms": 2,
            "createdAt": "2021-06-02T18:31:24.326Z",
            "updatedAt": "2021-06-02T18:31:24.326Z"
        }
    ]
}

