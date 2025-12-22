

# User Service API

# Register User
```
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "Jessica", "email": "jess@whale.com", "password": "MinhaForte123!"}'
```

# Login User
```
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "jess@whale.com", "password": "MinhaForte123!"}'
```

# Get Users 
```
curl -X GET http://localhost:8080/api/users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlbnpvQHdoYWxlLmNvbSIsImlhdCI6MTc2NjM0NjY2OCwiZXhwIjoxNzY2MzUwMjY4fQ.NGRHpbaGbCLGNyud6gHj_j3F1w3oUbI8kE-OLxidd8E"
```

# Get User Profile
```
curl -X GET http://localhost:8080/api/users/2 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlbnpvQHdoYWxlLmNvbSIsImlhdCI6MTc2NjM0NjY2OCwiZXhwIjoxNzY2MzUwMjY4fQ.NGRHpbaGbCLGNyud6gHj_j3F1w3oUbI8kE-OLxidd8E"
```

# Delete User 
```
curl -X DELETE http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlbnpvQHdoYWxlLmNvbSIsImlhdCI6MTc2NjM0NjY2OCwiZXhwIjoxNzY2MzUwMjY4fQ.NGRHpbaGbCLGNyud6gHj_j3F1w3oUbI8kE-OLxidd8E"
```


