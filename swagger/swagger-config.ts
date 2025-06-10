import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'API documentation for your Task app',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: 
  [
    './src/routes/task.ts',
    './src/routes/list.ts'
  ], // Adjust path to where your route files with swagger comments are located
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
