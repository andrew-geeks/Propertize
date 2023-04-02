const mongoose = require('mongoose');
const schema = mongoose.Schema;

let property = new schema(
    {
        owner_id : {
            type : String,
            required : true
        },
        tenant_id : {
            type : String
            
        },
        p_name:{
            type : String,
            required : true
        },
        p_desc:{
            type : String,
            required : true
        },
        area_type:{
            type : String,
            required : true
        },
        p_type:{
            type : String,
            required : true
        },
        p_size:{
            type : Number,
            required : true
        },
        bhk:{
            type : Number,
            required : true
        },
        location:{
            type : String,
            required : true
        },
        rent_amt:{
            type : Number,
            required : true
        },
        p_status:{
            type : String
        },
        p_rent_month:{
            type: Number
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

let maintenance = new schema(
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
        m_date:{
            type: Date,
            required: true
        },
        m_type:{ 
            type: String,
            required: true
        },
        m_description:{
            type: String,
        },
        priority:{
            type: String,
            required: true
        },
        m_status:{
            type: String,
            required: true
        }

    }
)

let payment = new schema(
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
        p_date:{
            type: Date,
            required: true
        },
        rent:{
            type: Number,
            required: true
        }
    }
)


const Property = mongoose.model('property',property);
const Account = mongoose.model('account',account);
const Assign = mongoose.model('assign',assign);
const Maintenance = mongoose.model('maintenance',maintenance);
const Payment = mongoose.model('payment',payment);

module.exports = {Property,Account,Assign,Maintenance,Payment};
