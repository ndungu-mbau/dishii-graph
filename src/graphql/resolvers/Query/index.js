import {
  list as tables,
  single as table
} from "./tables"

import {
  list as meals,
  single as meal,
  nested as Nmeal
} from "./meals"

import {
  list as instances,
  single as instance,
  nested as Ninstance
} from "./instances"

import {
  list as orders,
  single as order,
  nested as Norder
} from "./orders"

import {
  list as sessions,
  single as session,
  nested as Nsession
} from "./sessions"

import {
  list as bills,
  single as bill,
  nested as Nbill
} from "./bills"

import {
  list as payments,
  single as payment,
  nested as Npayment
} from "./payments"


const nested = {};

Object.assign(
  nested,

  Nmeal,
  Ninstance,
  Norder,
  Nsession,
  Nbill,
  Npayment
)

const Query = {
  hello:() => "Hello query",

  tables,
  table,

  meals,
  meal,

  instances,
  instance,

  orders,
  order,

  sessions,
  session,

  bills,
  bill,

  payments,
  payment
}

export {
  Query,
  nested
}