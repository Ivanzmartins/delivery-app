const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    urlImage: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'url_image'
    },
    },
    { 
      timestamps: false,
      tableName: 'products',
      underscored: true,
    }
  );

  return Product;
}
  
module.exports = Product; 