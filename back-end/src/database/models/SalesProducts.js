const SalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define("SalesProducts", {
    saleId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    },
    { 
      timestamps: false,
      underscored: true,
      tableName: 'sales_products',
    }
  );
  
  SalesProducts.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      foreignKey: 'saleId',
      as: 'sale',
      through: SalesProducts,
      otherKey: 'productId',
    });
    models.Product.belongsToMany(models.Sale, {
      foreignKey: 'productId',
      as: 'product',
      through: SalesProducts,
      otherKey: 'saleId',
    });
  };
  
  return SalesProducts;
}

module.exports = SalesProducts;
