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
curl -X GET http://localhost:8080/api/users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqZXNzQHdoYWxlLmNvbSIsImlhdCI6MTc2NjY3MDU1NSwiZXhwIjoxNzY2Njc0MTU1fQ.u-6VTFkheVWi3W7hzOXTLqavcX5GAiu-35V8rqWMwpE"
```

# Get User Profile

```
curl -X GET http://localhost:8080/api/users/2 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqZXNzQHdoYWxlLmNvbSIsImlhdCI6MTc2NjY3MDM1MywiZXhwIjoxNzY2NjczOTUzfQ.rc0iji9iJnNCk0pBIWe_LsSnOcBSIxvdeRjLpVIO37g"
```

# Delete User

```
curl -X DELETE http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqZXNzQHdoYWxlLmNvbSIsImlhdCI6MTc2NjY3MDM1MywiZXhwIjoxNzY2NjczOTUzfQ.rc0iji9iJnNCk0pBIWe_LsSnOcBSIxvdeRjLpVIO37g"
```
