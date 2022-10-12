import Restaurant from "../models/Restaurant.js";
import Food from "../models/Food.js";

export const createRestaurant = async (req, res, next) => {
  const newRestaurant = new Restaurant(req.body);

  try {
    const savedRestaurant = await newRestaurant.save();
    res.status(200).json(savedRestaurant);
  } catch (err) {
    next(err);
  }
};
export const updateRestaurant = async (req, res, next) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    next(err);
  }
};
export const deleteRestaurant = async (req, res, next) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json("Restaurant has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};
export const getRestaurants = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const restaurants = await Restaurant.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Restaurant.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const restaurantCount = await Restaurant.countDocuments({ type: "Restaurant" });
    const cafeCount = await Restaurant.countDocuments({ type: "Cafe" });
    const indianCount = await Restaurant.countDocuments({ type: "Indian Authentic" });
    const slCount = await Restaurant.countDocuments({ type: "Sri Lankan Authentic" });
    const bakeryCount = await Restaurant.countDocuments({ type: "Bakery" });

    res.status(200).json([
      { type: "Restaurant", count: restaurantCount },
      { type: "Cafe", count: cafeCount },
      { type: "Indian Authentic", count: indianCount },
      { type: "Sri Lankan Authentic", count: slCount },
      { type: "Bakery", count: bakeryCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getRestaurantFoods = async (req, res, next) => {
  try {
    
    const restaurant = await Restaurant.findById(req.params.id);

    const list = await Promise.all(
      restaurant.foods.map((food) => {
        return Food.findById(food);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
