// Mirrors client/src/utils/priceUtils.js so the server charges exactly what the cart shows.
const calculatePrice = (quantity, basePrice, priceTiers) => {
  if (!priceTiers || priceTiers.length === 0) {
    return basePrice;
  }

  const applicableTier = priceTiers.find(
    (tier) => quantity >= tier.minQty && quantity <= tier.maxQty
  );

  if (applicableTier) {
    return parseFloat(applicableTier.price);
  }

  if (quantity >= 100) {
    const tierForLargeQuantity = priceTiers.find((tier) => tier.maxQty >= 100);

    if (tierForLargeQuantity) {
      return parseFloat(tierForLargeQuantity.price);
    }
  }

  return basePrice;
};

module.exports = { calculatePrice };
