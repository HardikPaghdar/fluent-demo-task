const { STATUS_MESSAGES,STATUS } = require('../../Configs/constants');

const CompanyModel = new (require('../../Models/v1/company'))();


class CompanyController {

    // Retrieve all company
    async list(req, res) {
        try {
            let data = await CompanyModel.list();
            res.handler.success(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.COMPANY_LIST});
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Create new company
    async add(req, res) {
        try {
            if (!req.body.name) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.COMPANY_NAME});
                return;
            } else if (!req.body.email) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.COMPANY_EMAIL });
                return;
            } else if (!req.body.mobile) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.COMPANY_MOBILE });
                return;
            } else if (!req.body.address) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.COMPANY_ADDRESS });
                return;
            }

            let data = await CompanyModel.add(req.body);
            res.handler.created(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.COMPANY_DATA_INSERT });
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Retrieve a single company with id
    async findOne(req, res) {
        try {
            let data = await CompanyModel.findOne(req.params.id)
            res.handler.success(data,{ status: STATUS.SUCCESS, message: STATUS_MESSAGES.COMPANY_DATA_GET_SINGLE });

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Update a company with id
    async update(req, res) {
        try {
            
            if (!req.body.name) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.COMPANY_NAME });
                return;
            } else if (!req.body.email) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.COMPANY_EMAIL });
                return;
            } else if (!req.body.mobile) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.COMPANY_MOBILE });
                return;
            } else if (!req.body.address) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.COMPANY_ADDRESS });
                return;
            }

            let data = await CompanyModel.update(req.params.id, req.body)
            res.handler.success(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.COMPANY_UPDATE });
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Delete a company with id
    async delete(req, res) {
        try {
            let data = await CompanyModel.delete(req.params.id)
            res.handler.success(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.COMPANY_DELETE });
        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = CompanyController;
