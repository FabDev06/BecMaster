
'use strict';

module.exports = (sequelize, DataTypes) =>
{
  const Messages = sequelize.define('Messages',
  {
    idJoueur: DataTypes.INTEGER,
    contenu: DataTypes.STRING,
    heure: DataTypes.DATE
  },  {});

  Messages.associate = function(models)
  {
    // Pour définir plusieurs messages déposés par un seul Joueur
    models.Messages.belongsTo(models.Joueur, {foreignKey: 'idj', allowNull: false});
    //sequelize.belongsTo(models.Messages,models.Joueur,{foreignKey: 'idj', allowNull: false});
  };

  return Messages;
};