import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Role = sequelize.define('Role', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { tableName: 'roles' });

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'active' }
}, { tableName: 'users' });

User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

const Product = sequelize.define('Product', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  priceUsd: DataTypes.DECIMAL(10,2),
  currency: { type: DataTypes.STRING, defaultValue: 'USD' },
  stock: DataTypes.INTEGER,
  warrantyDays: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'products' });

Product.belongsTo(User, { as: 'seller', foreignKey: 'sellerId' });
User.hasMany(Product, { as: 'products', foreignKey: 'sellerId' });

const Order = sequelize.define('Order', {
  totalUsd: DataTypes.DECIMAL(10,2),
  currency: DataTypes.STRING,
  status: { type: DataTypes.STRING, defaultValue: 'pending' }
}, { tableName: 'orders' });

Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

const OrderItem = sequelize.define('OrderItem', {
  quantity: DataTypes.INTEGER,
  priceUsd: DataTypes.DECIMAL(10,2)
}, { tableName: 'order_items' });

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

const Currency = sequelize.define('Currency', {
  code: { type: DataTypes.STRING, primaryKey: true },
  rate: { type: DataTypes.DECIMAL(12,6), allowNull: false },
  active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'currencies' });

const Wallet = sequelize.define('Wallet', {
  balanceUsd: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
  type: { type: DataTypes.STRING, defaultValue: 'user' }
}, { tableName: 'user_wallet' });

Wallet.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Wallet, { foreignKey: 'userId' });

export { sequelize, Role, User, Product, Order, OrderItem, Currency, Wallet };
