import express, { Request, Response, NextFunction } from 'express'
import sequelize from './model/config';
import usersRouters from './routers/usersRouters';


const app = express();
const PORT = 4512;
app.use(express.json())
app.use('/users', usersRouters);


interface CustomErrorHandling extends Error {
  status: number;
}

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('endpoint not found') as CustomErrorHandling;
  error.status = 404;
  next(error)
})

app.use((err: CustomErrorHandling, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message })
})

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is now listening on port ${PORT}`)
  })
})