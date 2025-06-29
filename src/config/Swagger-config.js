import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HireHaven API',
      version: '1.0.0',
      description: 'API documentation for HireHaven Backend',
      contact: {
        name: 'API Support',
        email: 'support@hirehaven.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
        description: 'Development server'
      },
      {
        url: 'https://api.hirehaven.com/api/v1',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

export default specs;