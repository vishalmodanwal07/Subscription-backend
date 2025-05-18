import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true , 'Subscription name is requied'],
            trim : true,
            minlength : 2,
            maxlength : 80,
        },
        price : {
            type : Number,
            required: [true , 'Subcription price is required'],
            min : [0 , 'Price must be grater than 0']
        },
        currency : {
            type : String,
            enum : ['INR' , 'USD' , 'EUR'],
            default : 'INR'
        },
        frequency : {
            type : String,
            enum : ['daily' , 'weekly' , 'monthly' , 'yearly'],
        },
        category : {
            type : String,
            enum : ['sports' , 'news' , 'movie' , 'lifestyle' , 'finance' , 'other'],
            required : true
        },
        paymentMethod : {
            type : String,
            required : true,
            trim : true
        },
        status : {
            type : String,
            enum : ['active' , 'cancelled' , 'expired'],
            default : 'active'
        },
        startDate : {
            type : Date,
            required: true,
            validate : {
                validator : (date)=> value <= new Date(),
                message : 'Start date must be in the past'      
            }
        },
         renewalDate : {
            type : Date,
            required: true,
            validate : {
                validator : function(date){return value > this.startDate} ,
                message : 'Renewal date must be after  the start date'      
            }
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true,
            index : true     //index is for optimised queries
        }
         

    } , { timestamps : true}
);


//a function (basically middleware) that happens before each one document is created
 subscriptionSchema.pre('save' , function(next){
      // Auto calculate renewal date if missing
      if(!this.renewalDate){
        const renewalPeriods = {
            daily : 1,
            weekly : 7,
            monthly : 30,
            yearly : 365
        };

        //jan 1st
        //monthly
        //30days
        //jan 31
        this.renewalDate = new Date(this.startdate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
      }

      // auto-update the status if renewal date has passed
      if(this.renewalDate < new Date()){
        this.status = 'expired';
      }
      next() ; //this is make sure to proceed to create that document in db
 });

 const Subscription = mongoose.model("Subscription" , subscriptionSchema);

 export default Subscription; 