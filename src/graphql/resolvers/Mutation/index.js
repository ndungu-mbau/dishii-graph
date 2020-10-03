import tables from "./tables"
import meals from "./meals"
import instances from "./instances"
import orders from "./orders"
import sessions from "./sessions"
import bills from "./bills"
import payments from "./payments"
import menus from "./menus"

export default {
  hello:() => "Hello mutations",

  tables,
  meals,
  menus,
  instances,
  orders,
  sessions,
  bills,
  payments
}