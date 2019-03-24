//Generate Pizzas

const sequelize = require('./sequelize.js');
const Item = sequelize.import('./item.js');

Item.create({
  itemName: 'Plain',
  category: 'Pizza',
  itemPrice: 200,
  ingredient: 'Crust, Sauce, Cheese',
  description: 'Famous Plain Pizza',
})
Item.create({
  itemName: 'Margherita',
  category: 'Pizza',
  itemPrice: 200,
  ingredient: 'Crust, Sauce, Cheese',
  description: 'Famous Plain Pizza',
})
Item.create({
  itemName: 'Pepperoni',
  category: 'Pizza',
  itemPrice: 200,
  ingredient: 'Crust, Sauce, Cheese',
  description: 'Famous Plain Pizza',
})

Item.create({
  itemName: 'Cheese Burger',
  category: 'Burger',
   itemPrice: 300,
  ingredient: 'Crust, Sauce, Cheese',
  description: 'Famous Plain Pizza',
})
Item.create({
  itemName: 'Muchroom and Swiss Burger',
  category: 'Burger',
  itemPrice: 300,
  ingredient: 'Crust, Sauce, Cheese',
  description: 'Famous Plain Pizza',
})
Item.create({
  itemName: 'Blue Cheese Burger',
  category: 'Burger',
  itemPrice: 300,
  ingredient: 'Crust, Sauce, Cheese',
  description: 'Famous Plain Pizza',
})


Item.create({
  itemName: 'Soft Drink',
  category: 'Drink',
  itemPrice: 150,
  ingredient: 'Crust, Sauce, Cheese',
  description: 'Famous Plain Pizza',
})
Item.create({
  itemName: 'Ice Tea',
  category: 'Drink',
  itemPrice: 150,
  ingredient: 'Crust, Sauce, Cheese',
  description: 'Famous Plain Pizza',
})
Item.create({
  itemName: 'Lemonade',
  category: 'Drink',
  itemPrice: 150,
  ingredient: 'Crust, Sauce, Cheese',
  description: 'Famous Plain Pizza',
})
