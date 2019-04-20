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
  itemPrice: 350,
  ingredient: 'Crust, Sauce, Cheese, Basil, Tomato Slices',
  description: 'A delicious classic margherita pizza',
})

Item.create({
  itemName: 'Pepperoni',
  category: 'Pizza',
  itemPrice: 400,
  ingredient: 'Crust, Sauce, Cheese, Pepperoni',
  description: 'Everyone\'s favorite peperoni',
})

Item.create({
  itemName: 'Fettucini Alfredo',
  category: 'Pasta',
  itemPrice: 750,
  ingredient: 'Crust, Sauce, Cheese',
  description: 'Famous Plain Pasta',
})

Item.create({
  itemName: 'Meatballs and Spaghetti',
  category: 'Pasta',
  itemPrice: 800,
  ingredient: 'Crust, Sauce, Cheese, Basil, Tomato Slices',
  description: 'A delicious classic margherita Pasta',
})

Item.create({
  itemName: 'Cheese Burger',
  category: 'Burger',
   itemPrice: 300,
  ingredient: 'Crust, Sauce, Cheese',
  description: 'Famous Plain Pizza',
})
Item.create({
  itemName: 'Mushroom and Swiss Burger',
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
