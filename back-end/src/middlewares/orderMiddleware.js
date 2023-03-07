const Joi = require('joi');

const saleSchema = Joi.object({
  saleInfos: Joi.object({
    sellerId: Joi.number().required(),
    totalPrice: Joi.number().required(),
    deliveryAddress: Joi.string().required(),
    deliveryNumber: Joi.string().required(),
  }).required(),
  products: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  ).required(),
});

const saleMiddleware = (req, res, next) => {
  const { error } = saleSchema.validate(req.body);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(', ');
    res.status(400).json({ error: message });
  } else {
    next();
  }
};

module.exports = { saleMiddleware };
