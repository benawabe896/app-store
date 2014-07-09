API Spec
====

### GET /api/applications

#### Response
```javascript
[{
  "_id":"<id>",
  "price":12.34,
  "author":"me",
  "description":"Sample Description",
  "name":"Angry Birds",
  "__v":0
}]
```

### POST /api/applications
#### Parameters
| name          | required  | type  |
| ------------- |:-------------:| -----| 
| name     | yes | String | 
| description      | yes      |  String |
| author | yes    |    String |
| price | yes     |   Number |

#### Response
```javascript
{
  "__v": 0
  "price": 12.34
  "author": "me"
  "description": "Sample Description"
  "name": "Angry Birds"
  "_id": "53bca02feab2a10000d20807"
}
```

### GET /api/applications/search

#### Parameters
| name          | required  | type  | defaults
| ------------- |:-------------:| -----|  ---- |
| q     | yes | String |  |
| searchField      | yes      |  String | name |
| sortBy | yes    |    String | name descending |

#### Response
```javascript
[{
  "_id":"<id>",
  "price":12.34,
  "author":"me",
  "description":"Sample Description",
  "name":"Angry Birds",
  "__v":0
}]
```


### GET /api/applications/:application_id

#### Response
```javascript
{
  "__v": 0
  "price": 12.34
  "author": "me"
  "description": "Sample Description"
  "name": "Angry Birds"
  "_id": "53bca02feab2a10000d20807"
}
```


### PUT /api/applications/:application_id

#### Parameters
| name          | required  | type  | 
| ------------- |:-------------:| -----|  
| name     | no | String | 
| description     | no | String | 
| author     | no | String | 
| price     | no | Number | 

#### Response
```javascript
{
  "__v": 0
  "price": 12.34
  "author": "me"
  "description": "Sample Description"
  "name": "Angry Birds"
  "_id": "53bca02feab2a10000d20807"
}
```

### DELETE /api/applications/:application_id

#### Response
```javascript
{
  "message":"Successfully deleted"
}
```

### POST /api/applications/:application_id/upload

#### Response
```javascript
{
  "message":"Binary uploaded!"
}
```

### GET /api/applications/:application_id/download

### POST /api/applications/:application_id/comments

#### Parameters
| name          | required  | type  | 
| ------------- |:-------------:| -----|  
| description     | yes | String | 

#### Response
```javascript
{
  "__v":0,
  "application_id":"53bc99b735e78500005ff250",
  "description":"Test Comment",
  "_id":"53bca4ad62acc3970a321162"
}
```

### GET /api/applications/:application_id/comments

#### Response
```javascript
{
  "__v":0,
  "application_id":"53bc99b735e78500005ff250",
  "description":"Test Comment",
  "_id":"53bca4ad62acc3970a321162"
}
```

### GET /api/comments

#### Response
```javascript
[{
  "__v":0,
  "application_id":"53bc99b735e78500005ff250",
  "description":"Test Comment",
  "_id":"53bca4ad62acc3970a321162"
}]
```

### GET /api/comments/:comment_id

#### Response
```javascript
{
  "__v":0,
  "application_id":"53bc99b735e78500005ff250",
  "description":"Test Comment",
  "_id":"53bca4ad62acc3970a321162"
}
```

### PUT /api/comments/:comment_id

#### Parameters
| name          | required  | type  | 
| ------------- |:-------------:| -----|  
| description     | yes | String | 

#### Response
```javascript
{
  "__v":0,
  "application_id":"53bc99b735e78500005ff250",
  "description":"Test Comment",
  "_id":"53bca4ad62acc3970a321162"
}
```

### DELETE /api/comments/:comment_id

#### Response
```javascript
{
  "message":"Successfully deleted"
}
```

