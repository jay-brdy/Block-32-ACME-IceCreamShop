# Block 32 - ACME Ice Cream Shop

See my deployed site [here](https://jaybrdy-acme-icecream.onrender.com/api/flavors)! 

Used curl tool in the terminal to test. The following below are what I used to test my code...

## GET /api/flavors 
`curl localhost:3000/api/flavors`

This command returns an array of flavors sorted by favorite being true. 
```
[{"id":3,"name":"cookies and cream","is_favorite":true,"created_at":"2024-03-01T23:59:08.880Z","updated_at":"2024-03-01T23:59:08.880Z"},
{"id":1,"name":"vanilla","is_favorite":false,"created_at":"2024-03-01T23:59:08.880Z","updated_at":"2024-03-01T23:59:08.880Z"},
{"id":2,"name":"mint","is_favorite":false,"created_at":"2024-03-01T23:59:08.880Z","updated_at":"2024-03-01T23:59:08.880Z"}]
```

## GET /api/flavors/:id
`curl localhost:3000/api/flavors/1`

This command returns a specific flavor, identified via its id.
```
{"id":1,"name":"vanilla","is_favorite":false,"created_at":"2024-03-01T23:59:08.880Z","updated_at":"2024-03-01T23:59:08.880Z"}
```

## POST /api/flavors 
`curl localhost:3000/api/flavors -X POST -d '{"name": "banana foster", "is_favorite": true}' -H "Content-Type:application/json"`

This command creates a flavor and returns the created flavor.
```
{"id":5,"name":"banana foster","is_favorite":true,"created_at":"2024-03-02T02:03:34.363Z","updated_at":"2024-03-02T02:03:34.363Z"}
```

## PUT /api/flavors/:id 
`curl localhost:3000/api/flavors/5 -X PUT -d '{"name": "banana", "is_favorite": false}' -H "Content-Type:application/json"`

This command updates a flavor and returns the updated flavor.
```
{"id":5,"name":"banana","is_favorite":false,"created_at":"2024-03-02T02:03:34.363Z","updated_at":"2024-03-02T02:04:00.576Z"}
```

## DELETE /api/flavors/:id 
`curl -X DELETE localhost:3000/api/flavors/1`

This command deletes a flavor based on their flavor id and returns nothing.
