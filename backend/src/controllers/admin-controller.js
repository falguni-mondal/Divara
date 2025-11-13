const addProduct = (req, res) => {
    const {
    name,
    description,
    category,
    sizes,
    isFeatured,
    isNewArrival,
    shippingCost,
    status,
  } = req.body;
  const images = req.files;

  res.status(200).json({
    message: "success",
    data: {name, description, category, sizes, isFeatured, isNewArrival, shippingCost, status, images}
  })

}

export {addProduct}