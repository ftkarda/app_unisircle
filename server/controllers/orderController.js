const { Transaction, User, Item } = require("../models");

class OrderController {
  static async create(req, res, next) {
    try {
      const { id } = req.currentUser;
      const date = new Date();
      const getDate = date.getDate();
      const getMonth = date.getMonth();
      const getYear = date.getYear();
      const newDate =
        `ABC` + `${getDate}` + `${getMonth}` + `${getYear}` + `-001`;
      const { noTable, ItemId } = req.body;
      const order = await Transaction.create({
        noTable,
        noOrder: newDate,
        ItemId,
        UserId: id,
      });
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async orders(req, res, next) {
    try {
      const order = await Transaction.findAll({
        where: {
          isActive: true,
        },

        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: Item,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async order(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Transaction.findAll({
        where: {
          isActive: true,
          id,
        },

        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: Item,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { noTable, ItemId } = req.body;
      const order = await Transaction.findByPk(id);

      if (!order) {
        throw {
          name: "NotFound",
          code: 404,
          message: "Order not found",
        };
      } else {
        await Transaction.update(
          { noTable, ItemId },
          {
            where: {
              id,
            },
          }
        );
      }

      res.status(200).json({ message: "Success update order" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Transaction.findByPk(id);
      if (!order) {
        throw {
          name: "NotFound",
          code: 404,
          message: "Order not found",
        };
      } else {
        await Transaction.destroy({
          where: {
            id,
          },
        });
      }
      res.status(200).json({ message: `${order.noTable} success to delete` });
    } catch (error) {
      next(error);
    }
  }

  static async patchStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
        const order = await Transaction.findByPk(id);

      if (!order) {
        throw {
          name: "NotFound",
          code: 404,
          message: "Order not found",
        };
      } else {
        await Transaction.update(
          { isActive },
          {
            where: {
              id,
            },
          }
        );
      }
      res.status(200).json({ message: "Success patch status order" });
    } catch (error) {
      console.log(error, "<<<");
      next(error);
    }
  }
}

module.exports = OrderController;
