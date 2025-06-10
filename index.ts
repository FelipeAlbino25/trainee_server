import swaggerSpec from './swagger/swagger-config'
import swaggerUi from 'swagger-ui-express'
import express from 'express';
import cors from "cors"
import routes from './src/routes'

const app = express();

app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(express.json());
app.use(cors());
app.use('/api/v1',routes)



app.listen(3000, () => {
  console.log('Server running on port 3000');
});

export default app; // export para testes
