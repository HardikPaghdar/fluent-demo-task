const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    first_name: {
        type:String,
        required: [true, 'Person first name is required']
    },
    last_name: {
        type:String,
        required: [true, 'Person last name is required']
    },
    email: {
        type:String,
        required: [true, 'Person email is required']
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        maxLength : 10,
        required: [true, 'Company refrece is required']
    },    
},{
    timestamps:true,
    collection: 'person'
});

// Changing "_id" key to "id"
PersonSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

PersonSchema.set('toJSON',{
    virtuals: true
});

// Export the model
module.exports = mongoose.model('person', PersonSchema);