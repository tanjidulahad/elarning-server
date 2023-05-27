const express=require("express")
const { getVideos, getVideoNotes, postVideoNotes, getWatchedVideo, postWatchedVideo, addToWishlist, removeFromWishlist, getWishlistProduct } = require("../controllers/videoDataHandleControllers")

const videoDataHandleRoutes=express.Router()

videoDataHandleRoutes.get("/getvideos/:email?",getVideos)
videoDataHandleRoutes.post("/postvideonotes",postVideoNotes)
videoDataHandleRoutes.get("/getvideonotes/:email&:videoid",getVideoNotes)
videoDataHandleRoutes.post("/postwatchedvideo",postWatchedVideo)
videoDataHandleRoutes.get("/getwatchedvideo/:email",getWatchedVideo)
videoDataHandleRoutes.post("/addtowishlist",addToWishlist)
videoDataHandleRoutes.post("/removefromwishlist",removeFromWishlist)
videoDataHandleRoutes.get("/getwishlistproduct/:email",getWishlistProduct)

module.exports=videoDataHandleRoutes