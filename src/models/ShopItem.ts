import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "..";

class ShopItem extends Model<
  InferAttributes<ShopItem>,
  InferCreationAttributes<ShopItem>
> {
  declare role_id: string;
  declare name: string;
  declare cost: number;
}

ShopItem.init(
  {
    role_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "shop",
    sequelize,
  },
);
