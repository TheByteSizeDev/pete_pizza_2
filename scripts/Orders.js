import {
  getOrders,
  getCrusts,
  getToppings,
  getSizes
} from "./database.js"

const buildOrderListItem = (order) => {
  //order has the crustId, toppingId, and sizeId
  const crusts = getCrusts()
  const toppings = getToppings()
  const sizes = getSizes()

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

  const foundSize = sizes.find(size => size.id === order.sizeId)

  if (foundCrust && foundSize && foundTopping) {
    const totalCost = foundCrust.price + foundTopping.price + foundSize.price

    return `
      <li> Order #${order.id} will contain a
      ${foundCrust.crustType} crust,
      is a ${foundSize.size} size,
      ${foundTopping.toppingType} topping, and
      cost $${totalCost}.
      </li>
    `
  } else {
    return '<li>Something is missing from this order!</li>'
  }
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