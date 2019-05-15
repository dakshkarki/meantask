let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let jwt = require('jsonwebtoken');
let mongoosePaginate = require('mongoose-paginate');

const userSchema = Schema({
    firstname : {
        type : String
    },
   lastname : {
        type : String
    },
    email : {
        type : String,
        lowercase: true,
        index: true
    },
    salt : {
        type : String
    },
    hash : {
        type : String
    },
    
    socialid : {
        type : String,
        default : null
    },
    activationnumber : {
        type : Number,
        default : 0
    },
    role : {
        type : String,
        default : 'user'
    },
    
    provider : {
        type : String,
        default : 'local'
    },
    
    isactivated : {
        type : Boolean,
        default : true
    },
    isverified : {
        type : Boolean,
        default : false
    },
    gender : {
        type : String,
    },
    jobtitle :{
        type:String,
    },
    state: {
        type : String,
    },
     city: {
        type : String,
    },
  
    mobilenumber : {
        type : String,
    },
   
    isdeleted : {
        type : Boolean,
        default : false
    }
},{ timestamps : true });

userSchema.plugin(mongoosePaginate);

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id : this.id },"jwtPrimaryKey");
    return token;
}



module.exports = mongoose.model('User',userSchema);
