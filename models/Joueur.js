
'use strict';

module.exports = (sequelize, DataTypes) =>
{
  const Joueur = sequelize.define('Joueur',
  {
    pseudo: DataTypes.STRING,
    vie: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    online: DataTypes.BOOLEAN,
    adrip: DataTypes.STRING
  },  {});

  Joueur.associate = function(models)
  {
    // Pour définir un joueur peut laisser plusieurs messages
    models.Joueur.hasMany(models.Messages);
  };
  return Joueur;
};