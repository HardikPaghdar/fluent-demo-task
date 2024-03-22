
const { STATUS_MESSAGES, STATUS } = require('../../Configs/constants');

const personModel = new (require('../../Models/v1/person'))();


class PersonController {

    // Retrieve all person
    async list(req, res) {
        try {
            let data = await personModel.list();
            res.handler.success(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.PERSON_LIST });
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Create new person
    async add(req, res) {
        try {
            if (!req.body.company_id) {
                res.handler.validationMessage({ status: STATUS.ERROR, message: STATUS_MESSAGES.PERSON_COMPANY_REF });
                return;
            } else if (!req.body.first_name) {
                res.handler.validationMessage({ status: STATUS.ERROR, message: STATUS_MESSAGES.PERSON_FIRST_NAME });
                return;
            } else if (!req.body.last_name) {
                res.handler.validationMessage({ status: STATUS.ERROR, message: STATUS_MESSAGES.PERSON_LAST_NAME });
                return;
            } else if (!req.body.email) {
                res.handler.validationMessage({ status: STATUS.ERROR, message: STATUS_MESSAGES.PERSON_EMAIL });
                return;
            }

            let data = await personModel.add(req.body);
            res.handler.created(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.PERSON_ADD });
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Retrieve a single person with id
    async findOne(req, res) {
        try {
            let data = await personModel.findOne(req.params.id);
            res.handler.success(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.PERSON_SELECT_ONE });

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Update a person with id
    async update(req, res) {
        try {
            if (!req.body.email) {
                res.handler.validationMessage({ status: STATUS.ERROR, message: STATUS_MESSAGES.PERSON_EMAIL });
                return;
            } else if (!req.body.first_name) {
                res.handler.validationMessage({ status: STATUS.ERROR, message: STATUS_MESSAGES.PERSON_FIRST_NAME });
                return;
            } else if (!req.body.last_name) {
                res.handler.validationMessage({ status: STATUS.ERROR, message: STATUS_MESSAGES.PERSON_LAST_NAME });
                return;
            } else if (!req.body.company_id) {
                res.handler.validationMessage({ status: STATUS.ERROR, message: STATUS_MESSAGES.PERSON_COMPANY_REF });
                return;
            }

            let data = await personModel.update(req.params.id, req.body)
            res.handler.success(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.PERSON_UPDATE });
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Delete a person with id
    async delete(req, res) {
        try {
            let data = await personModel.delete(req.params.id)
            res.handler.success(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.PERSON_DELETE });
        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = PersonController;
