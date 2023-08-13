import { Model, DataTypes, UUIDV1 } from 'sequelize'
import sequelize from './config';

class Users extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
}

Users.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV1
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  tableName: 'users'
})
export default Users;