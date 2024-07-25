import {IOrder, orders} from "./orders.mongo";
import {IUser} from "./users.mongo";

export function getAllOrders() {
  return  orders
    .find()
    .populate<{user: IUser}>({
      path: "user",
      select: "nickName -_id",
    }).exec();
}

export function getOrderByID(orderID: string) {
  return  orders
    .findById(orderID)
    .populate<{user: IUser}>({
      path: "user",
      select: "nickName -_id",
    }).exec();
}

export async function addNewOrder(order: IOrder ) {
  return  orders.create(order);
}

// aggregate

export async function bestSellingProducts() {
  return orders
    .aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.name",
          totalItemSell: {
            $sum: "$products.quantity",
          },
        },
      },
    ])
    .sort({ totalItemSell: -1 })
    .limit(5);
}

export function totalRevenueByDateRange(startDate:string, endDate: string) {
  return orders.aggregate([
    {
      $match: {
        orderDate: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
    },
    //calculate total price for every product in order
    {
      $project: {
        totalPrice: {
          $map: {
            input: "$products",
            as: "product",
            in: {
              $multiply: ["$$product.quantity", "$$product.price"],
            },
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: { $sum: "$totalPrice" },
        },
      }
    },
    {
      $unset: "_id"
    }
  ]);
}