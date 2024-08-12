import { Application } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0', 
      description: 'API Movies Documentation',
    },
  },
  apis: ['./src/docs/*.yaml'], 
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

const setupSwagger = (app: Application) => {
  app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default setupSwagger
