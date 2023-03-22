const mongoose = require('mongoose');
const schema = mongoose.Schema;

let property = new schema(
    {
        owner_id : {
            type : String,
            required : true
        },
        p_name:{
            type : String
            
        },
        p_desc:{
            type : String
        },
        area_type:{
            type : String
        },
        p_type:{
            type : String
        },
        p_size:{
            type : Number
        },
        bhk:{
            type : Number
        },
        location:{
            type : String
        },
        rent_amt:{
            type : Number
        },
        p_status:{
            type : String
        }
    }
)

let account = new schema(
    {
        name:{
            type : String,
            required : true
        },
        email:{
            type : String,
            required : true,
            unique:true,
        },
        password:{
            type: String,
            required:true
        },
        actype : {
            type : String,
            required : true
        },
        rtoken:{
            type : String
        },
        
    }
)

let assign = new schema(
    {
        p_id:{
            type: String,
            required: true
        },
        u_id:{
            type: String,
            required: true
        },
        o_id:{
            type: String,
            required: true
        },
        tenure:{
            type: Number,
            required: true
        },
 
    }
)

const Property = mongoose.model('property',property);
const Account = mongoose.model('account',account);
const Assign = mongoose.model('assign',assign);

module.exports = {Property,Account,Assign};
