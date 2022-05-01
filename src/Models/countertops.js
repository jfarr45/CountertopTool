const db=require('../dbconnection');

const countertopsUsers=db.Users({
    name:{type:String,required:true},
});

const countertopsActiveJobs=db.ActiveJobs({
    name:{type:String,required:true},
    client:{type:String,required:true},
    contact:{type:String,required:true},
    location:{type:String,required:true},
    tops:{type:Number,required:false}
});

const countertopsMeasureInfo=db.MeasureInfo({
    countertop_type:{type:String,required:true},
    unit_number:{type:String,required:true},
  
    left_wall_length:{type:Number,required:false},
    left_wall_depth:{type:Number,required:false},
    back_wall_length:{type:Number,required:false},
    back_wall_depth:{type:Number,required:false},
    right_wall_length:{type:Number,required:false},
    right_wall_depth:{type:Number,required:false},
    left_finish:{type:Number,required:true},
    left_endsplash:{type:Number,required:true},
    right_finish:{type:Number,required:true},
    right_endsplash:{type:Number,required:true},
});

module.exports=db.model('Product',productSchema);