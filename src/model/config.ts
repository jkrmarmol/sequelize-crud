import { Sequelize } from 'sequelize'


const sequelize = new Sequelize({
  database: 'sequelize-vercel',
  username: 'postgres',
  password: 'kurtmarmol',
  host: 'localhost',
  dialect: 'postgres'
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully');
} catch (err) {
  console.log('Unable to connect to database: ', err)
}

export default sequelize;