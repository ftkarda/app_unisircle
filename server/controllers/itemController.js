const { Item } = require("../models");

class ItemController {
  static async create(req, res, next) {
    try {
      const { name, imgUrl, description, category, CompanyId } = req.body;
      const item = await Item.create({
        name,
        imgUrl,
        description,
        category,
        CompanyId,
      });
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  static async items(req, res, next) {
    try {
      const items = await Item.findAll();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async item(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id);
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, imgUrl, description, category, CompanyId } = req.body;
      const item = await Item.findByPk(id);

      if (!item) {
        throw {
          name: "NotFound",
          code: 404,
          message: "Item not found",
        };
      } else {
        await Item.update(
          {
            name,
            imgUrl,
            description,
            category,
            CompanyId,
          },
          {
            where: {
              id,
            },
          }
        );
      }

      res.status(200).json({ message: "Success update item" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      let item = await Item.findByPk(id);
      if (!item) {
        throw {
          name: "NotFound",
          code: 404,
          message: "Item not found",
        };
      } else {
        await Item.destroy({
          where: {
            id,
          },
        });
      }
      res.status(200).json({ message: `${item.name} success to delete` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ItemController;
