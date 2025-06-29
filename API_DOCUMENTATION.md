# HireHaven API Documentation

This document explains how to use and extend the Swagger API documentation for the HireHaven backend.

## Accessing the API Documentation

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8000/api-docs
   ```
   (Replace 8000 with your actual port if different)

## Adding Documentation to New Endpoints

To document a new endpoint, add Swagger JSDoc comments above your route handlers. Here's an example:

```javascript
/**
 * @swagger
 * /api/endpoint:
 *   method:
 *     summary: Brief description
 *     tags: [TagName]
 *     parameters:
 *       - in: path/query/header
 *         name: paramName
 *         schema:
 *           type: string
 *         required: true
 *         description: Parameter description
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 */
```

## Documenting Authentication

All endpoints that require authentication should include the security scheme:

```yaml
security:
  - bearerAuth: []
```

## Testing the API

1. Use the "Try it out" button in the Swagger UI to test endpoints directly from the documentation.
2. For authenticated endpoints, click the "Authorize" button (lock icon) and enter your JWT token.

## Common Response Types

- 200: Successful operation
- 201: Resource created successfully
- 400: Bad request (validation error)
- 401: Unauthorized (authentication required)
- 403: Forbidden (insufficient permissions)
- 404: Resource not found
- 500: Internal server error

## Updating the Documentation

The documentation is automatically generated from the JSDoc comments in your route files. After making changes to the documentation:

1. Save your files
2. The server will automatically reload with the updated documentation

## Best Practices

1. Keep descriptions clear and concise
2. Document all required fields and possible error responses
3. Group related endpoints using tags
4. Use consistent formatting across all endpoints
5. Document any authentication requirements
6. Include example requests and responses where helpful
