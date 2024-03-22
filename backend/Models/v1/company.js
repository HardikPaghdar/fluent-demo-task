const companySchema = require('../../Schema/v1/company');

class CompanyModel {
    
    // Retrieve all company
    async list() {
        return await companySchema.find();
    }

    // create company
    async add(data) {
        return await companySchema.create(data);
    }

    // Retrieve a single company with id
    async findOne(request_id) {
        return await companySchema.findById(request_id).populate({path:'person'})
    }

    // Update a company with id
    async update(request_id, data) {
        return await companySchema.findByIdAndUpdate(request_id, data,
            { 
                new: true 
            })
    }

    // Delete a company with id
    async delete(request_id) {
        return await companySchema.findByIdAndRemove(request_id)
    }
}

module.exports = CompanyModel;