API Spec
====

### GET /applications

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

### POST /applications
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

### GET /applications/search

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


### GET /applications/:application_id

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


### PUT /applications/:application_id

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

### DELETE /applications/:application_id

#### Response
```javascript
{
  "message":"Successfully deleted"
}
```

### POST /applications/:application_id/upload

#### Response
```javascript
{
  "message":"Binary uploaded!"
}
```

### GET /applications/:application_id/download

### POST /applications/:application_id/comments

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

### GET /applications/:application_id/comments

#### Response
```javascript
{
  "__v":0,
  "application_id":"53bc99b735e78500005ff250",
  "description":"Test Comment",
  "_id":"53bca4ad62acc3970a321162"
}
```

### GET /comments

#### Response
```javascript
[{
  "__v":0,
  "application_id":"53bc99b735e78500005ff250",
  "description":"Test Comment",
  "_id":"53bca4ad62acc3970a321162"
}]
```

### GET /comments/:comment_id

#### Response
```javascript
{
  "__v":0,
  "application_id":"53bc99b735e78500005ff250",
  "description":"Test Comment",
  "_id":"53bca4ad62acc3970a321162"
}
```

### PUT /comments/:comment_id

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

### DELETE

#### Response
```javascript
{
  "message":"Successfully deleted"
}
```

