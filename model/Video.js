const mongoose=require('mongoose')

const Schema=mongoose.Schema

const videoschema=new Schema({
    videoid:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    videolink:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("Video",videoschema)