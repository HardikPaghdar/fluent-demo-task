const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Company name is required']
    },
    email: {
        type:String,
        required: [true, 'Company email is required']
    },
    mobile: {
        type: Number,
        maxLength : 10,
        required: [true, 'Company mobile is required']
    },
    address: {
        type: String,
        required: [true, 'Company address is required']
    },
    
},{
    timestamps:true,
    collection: 'company'
});


CompanySchema.virtual('person', {
    ref: 'person',
    localField: '_id',
    foreignField: 'company_id'
  })

// Changing "_id" key to "id"
CompanySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

CompanySchema.set('toJSON',{
    virtuals: true
});

// Export the model
module.exports = mongoose.model('company', CompanySchema);