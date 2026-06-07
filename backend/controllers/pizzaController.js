import Pizza from "../models/Pizza.js";

export const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();

    res.json(pizzas);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        message: "Pizza not found",
      });
    }

    res.json(pizza);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addPizza = async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);

    res.status(201).json(pizza);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!pizza) {
      return res.status(404).json({
        message: "Pizza not found",
      });
    }

    res.json(pizza);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        message: "Pizza not found",
      });
    }

    await pizza.deleteOne();

    res.json({
      message: "Pizza deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
