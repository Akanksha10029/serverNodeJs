# REST API Notes

## What is a REST API?
- **REST (Representational State Transfer)** is an architectural style for designing networked applications.
- REST APIs follow HTTP protocols to enable communication between client and server.

## Key Principles of REST
1. **Statelessness**: stateless means that each request from a client to a server must contain all the information needed to understand and process the request. The server does not retain any information (or state) about previous requests from the client.
2. **Client-Server**: Client and server are separate; clients make requests, and servers respond.
3. **Uniform Interface**: Consistent URI paths, HTTP methods, and data formats enhance simplicity and visibility.
4. **Cacheability**: Responses can be cached to improve performance.
5. **Layered System**: APIs can have multiple layers (e.g., load balancers, caching) without client awareness.

## HTTP Methods
REST APIs use standard HTTP methods for CRUD operations:
- **GET**: Retrieve resource(s).
- **POST**: Create a new resource.
- **PUT**: Update an existing resource (or create if it doesn’t exist).
- **PATCH**: Partially update an existing resource.
- **DELETE**: Remove a resource.

## HTTP Status Codes
Common HTTP status codes used in REST APIs:
- **200 OK**: Request succeeded.
- **201 Created**: Resource created successfully.
- **400 Bad Request**: Invalid request syntax or data.
- **401 Unauthorized**: Authentication required.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Server error.

## Endpoint Structure
- **Resources**: Each resource is identified by a unique URI.
- **Nouns**: Use nouns (not verbs) to represent resources (e.g., `/users` instead of `/getUsers`).
- **Nested Resources**: Sub-resources can be used to represent relationships (e.g., `/users/{id}/posts`).

### Example Endpoints
- `GET /users` - Retrieve all users.
- `POST /users` - Create a new user.
- `GET /users/{id}` - Retrieve a user by ID.
- `PUT /users/{id}` - Update a user by ID.
- `DELETE /users/{id}` - Delete a user by ID.

## Data Formats
- **JSON (JavaScript Object Notation)**: Most commonly used for data exchange in REST APIs.
- **XML**: Sometimes used but less common.

## Versioning
- Helps manage changes in API without breaking client integrations.
- Common approaches:
  - **URL Versioning**: `/v1/users`
  - **Header Versioning**: `Accept: application/vnd.api.v1+json`

## RESTful vs. Non-RESTful APIs
- A **RESTful API** strictly adheres to REST principles.
- A **Non-RESTful API** may not be stateless, use consistent URIs, or follow HTTP methods properly.

## Benefits of REST
- **Scalability**: Stateless nature allows easy scalability.
- **Flexibility**: Standard HTTP methods and data formats make it adaptable across different clients.
- **Simplicity**: URL structure and HTTP methods make it easy to understand and implement.

## Common Tools
- **Postman**: For testing REST API requests.
- **Swagger**: For API documentation and testing.
- **cURL**: Command-line tool for sending HTTP requests.

---

## Example REST API Request (cURL)
```bash
# Retrieve user data
curl -X GET "https://api.example.com/users/1" -H "Accept: application/json"
