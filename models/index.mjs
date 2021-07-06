import sequelizePackage from 'sequelize';
import allConfig from '../config/config.js';

import userModel from './user.mjs';
import gameModel from './game.mjs';

const { Sequelize } = sequelizePackage;
const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = userModel(sequelize, Sequelize.DataTypes);
db.Game = gameModel(sequelize, Sequelize.DataTypes);

db.User.belongsToMany(db.Game, { through: 'game_users' });
db.Game.belongsToMany(db.User, { through: 'game_users' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;