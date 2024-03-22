const personSchema = require('../../Schema/v1/person');

class personModel {
    
    // Retrieve all person
    async list() {
        return await personSchema.find().populate('company_id');
    }

    // create person
    async add(data) {
        return await personSchema.create(data);
    }

    // Retrieve a single person with id
    async findOne(request_id) {
        return await personSchema.findById(request_id).populate('company_id');
    }

    // Update a person with id
    async update(request_id, data) {
        return await personSchema.findByIdAndUpdate(request_id, data,
            { 
                new: true 
            })
    }

    // Delete a person with id
    async delete(request_id) {
        return await personSchema.findByIdAndRemove(request_id)
    }
}

module.exports = personModel;