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
| name          | required  | values  |
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

GET /applications/search
#### Parameters
| name          | required  | values  | defaults
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


## /applications/:application_id
### GET
### PUT
### DELETE

## /applications/:application_id/comments
### POST
### GET

## /comments
### GET

## /comments/:comment_id
### GET
### PUT
### DELETE
