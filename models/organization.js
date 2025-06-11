const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  organizationEmail: {
    type: String,
    required: true,
    maxlength: 100,
  },
  adminFirstName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  adminLastName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  adminEmail:{
    type:String,
    required:true,
    maxlength:100,
  },
  password: {
    type: String,
    required: true
  },

});

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;
