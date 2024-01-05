import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { sequelize } from "..";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare user_id: string;
  declare balance: number;
}

User.init(
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  },
);
