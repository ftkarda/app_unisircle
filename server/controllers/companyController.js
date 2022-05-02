const { Company } = require("../models");

class CompanyController {
  static async create(req, res, next) {
    try {
      const { name, logoUrl, description } = req.body;
      const company = await Company.create({
        name,
        logoUrl,
        description,
      });

      res.status(201).json(company);
    } catch (error) {
      next(error);
    }
  }

  static async companies(req, res, next) {
    try {
      const company = await Company.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(company);
    } catch (error) {
      next(error);
    }
  }

  static async company(req, res, next) {
    try {
      const { id } = req.params;
      const company = await Company.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!company) {
        throw {
          name: "NotFound",
          code: 404,
          message: "Company not found",
        };
      }
      res.status(200).json(company);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, logoUrl, description } = req.body;
      const company = await Company.findByPk(id);
      if (!company) {
        throw {
          name: "NotFound",
          code: 404,
          message: "Company not found",
        };
      } else {
        await Company.update(
          {
            name,
            logoUrl,
            description,
          },
          {
            where: {
              id,
            },
          }
        );
      }
      res.status(200).json({ message: "Success update companies" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      let company = await Company.findByPk(id);
      if (!company) {
        throw {
          name: "NotFound",
          code: 404,
          message: "Company not found",
        };
      } else {
        await Company.destroy({
          where: {
            id,
          },
        });
      }
      res.status(200).json({ message: `${company.name} success to delete` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CompanyController;
