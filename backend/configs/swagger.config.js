import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School Management API',
            version: '1.0.0',
            description: 'API for managing students, courses, and teachers',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT token for authentication. Include "Bearer " before the token.'
                },
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Error message',
                        },
                        message: {
                            type: 'string',
                            description: 'Additional error details',
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'User ID',
                        },
                        name: {
                            type: 'string',
                            description: 'User full name',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                        },
                        role: {
                            type: 'string',
                            description: 'User role (admin, teacher, student)',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'User creation date',
                        },
                    },
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'rawPassword'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                        },
                        rawPassword: {
                            type: 'string',
                            description: 'User password',
                        },
                    },
                },
                RegisterRequest: {
                    type: 'object',
                    required: ['name', 'email', 'rawPassword'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'User full name',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                        },
                        rawPassword: {
                            type: 'string',
                            description: 'User password',
                        },
                    },
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Success message',
                        },
                        token: {
                            type: 'string',
                            description: 'JWT token for authentication',
                        },
                        user: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                },
                RegisterResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Success message',
                        },
                        user: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js', './controllers/*.js', './docs/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export const serveSwagger = swaggerUi.serve;
export const setupSwagger = swaggerUi.setup(swaggerSpec);
export { swaggerSpec as specs };
