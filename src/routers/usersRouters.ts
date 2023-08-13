import express, { Request, Response, NextFunction } from 'express';
import Users from '../model/Users';


const usersRouters = express.Router();

usersRouters.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await Users.findAll();
    res.json(users)
  } catch (err) {
    if (err instanceof Error) {
      const error: any = new Error(err.name);
      error.status = 404;
      next(error)
    }
  }
})

usersRouters.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const users = await Users.findByPk(id);
    if (users) {
      return res.json(users)
    }
    return res.status(404).json({ message: 'users not found' });
  } catch (err) {
    if (err instanceof Error) {
      const error: any = new Error(err.name);
      error.status = 404;
      next(error)
    }
  }
})

usersRouters.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    if (name && email) {
      const users = await Users.create({ name, email });
      return res.json({ users: await users.save() })
    }
    return res.status(404).json({ message: 'name & email has no value' })
  } catch (err) {
    if (err instanceof Error) {
      const error: any = new Error(err.name);
      error.status = 404;
      next(error)
    }
  }
})

usersRouters.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    if (name && email) {
      const users = await Users.findByPk(id);
      if (users) {
        users.name = name;
        users.email = email;
        await users.save();
        return res.json({ message: 'updated successfully' })
      }
      return res.status(500).json({ message: 'id not found' })
    }
    return res.status(404).json({ message: 'name & email has not value' })
  } catch (err) {
    if (err instanceof Error) {
      const error: any = new Error(err.name);
      error.status = 404;
      next(error)
    }
  }
})

usersRouters.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const users = await Users.findByPk(id);
    if (users) {
      await users.destroy();
      return res.json({ message: 'user deleted successfully' })
    }
    return res.status(500).json({ message: 'id not found' })
  } catch (err) {
    if (err instanceof Error) {
      const error: any = new Error(err.name);
      error.status = 404;
      next(error)
    }
  }
});


export default usersRouters;