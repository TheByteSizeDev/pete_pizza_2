import {getOrders, getCrusts, getToppings} from "./database.js"

const buildOrderListItem = (order) => {
  //order has the crustId
  const crusts = getCrusts()
  const toppings = getToppings()

  const foundCrust = crusts.find(
    (crust) => {
      return crust.id === order.crustId
    }
  )

  const foundTopping = toppings.find(
    (topping) => {
      return topping.id === order.toppingId
    }
  )

  const totalCost = foundCrust.price + foundTopping.price
  return `<li> Order #${order.id} will contain a ${foundCrust.crustType} crust, ${foundTopping.toppingType} topping, and cost $${totalCost}.</li>`
}

export const Orders = () => {
  const orders = getOrders()
   let html = "<ul>"

   const listItems = orders.map(buildOrderListItem)

  //  const listItems = orders.map(order => {
  //    return `<li>The crust id is ${order.crustId}</li>`
  //  })
   html += listItems.join("")
   html += "</ul>"

   return html
}