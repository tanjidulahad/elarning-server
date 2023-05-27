const Note = require("../model/Note")
const Video = require("../model/Video")
const Watchedvideo = require("../model/Watchedvideo")
const Wishlist = require("../model/Wishlist")

const getVideos = async (req, res, next) => {
    const { email } = req.params

    let wishlistArr=[]

    if (email) {

        try {
            const existingWishlistdata = await Wishlist.findOne({ email })
            if(existingWishlistdata){
                const strData = existingWishlistdata?.wishlistitem
                wishlistArr = strData.map(Number)
            }
        } catch (error) {
            console.log(error)
        }
    }



    let data
    try {
        const allvideos = await Video.find({})
        if(wishlistArr.length>0){
            data=allvideos.map((video)=>{
                if(wishlistArr.includes(video.videoid)){
                    return{
                        ...video._doc,
                        wishlisted:true
                    }
                }
                return {...video._doc,wishlisted:false}
            })
        }else{
            data=allvideos.map((video)=>{
                return {...video._doc,wishlisted:false}
            })
        }
        
    } catch (error) {
        console.log(error)
    }
    return res.status(200).json(data)
}

const getVideoNotes = async (req, res, next) => {

    const { email, videoid } = req.params

    if (!email || !videoid) {
        return res.status(400).json({ message: "please provide the required field" })
    }

    let existingNotes

    try {
        existingNotes = await Note.findOne({ email, videoid })
    } catch (error) {
        console.log(error)
    }

    if (!existingNotes) {
        return res.status(200).json({ message: "no note found", data: null })
    }

    return res.status(200).json({ data: existingNotes })
}

const postVideoNotes = async (req, res, next) => {

    const { email, videoid, notedata } = req.body

    if (!email || !videoid) {
        return res.status(400).json({ message: "please provide the required field" })
    }

    let existingNotes

    try {
        existingNotes = await Note.findOne({ email, videoid })
    } catch (error) {
        console.log(error)
    }



    if (existingNotes) {
        existingNotes.notes.push(notedata)

        try {
            await existingNotes.save()
        } catch (error) {
            console.log(error)
        }
        return res.status(201).json({ message: "notes saved successfully", data: existingNotes })
    }

    const note = new Note({
        email,
        videoid,
        notes: [notedata]
    })

    try {
        await note.save()
    } catch (error) {
        console.log(error)
    }

    return res.status(201).json({ message: "notes saved successfully", data: note })

}



const postWatchedVideo = async (req, res, next) => {
    const { email, videoid } = req.body

    if (!email || !videoid) {
        return res.status(400).json({ message: "please provide the required field" })
    }

    let existingData

    try {
        existingData = await Watchedvideo.findOne({ email })
    } catch (error) {
        console.log(error)
    }


    if (existingData) {
        if (existingData.watchedvideos.includes(videoid)) {
            return res.status(201).json({ message: "this video is already watched", data: existingData })
        }
        existingData.watchedvideos.push(videoid)

        try {
            await existingData.save()
        } catch (error) {
            console.log(error)
        }
        return res.status(201).json({ message: "video saved successfully", data: existingData })
    }

    const watched = new Watchedvideo({
        email,
        watchedvideos: [videoid]
    })

    try {
        await watched.save()
    } catch (error) {
        console.log(error)
    }

    return res.status(201).json({ message: "video saved successfully", data: watched })

}

const getWatchedVideo = async (req, res, next) => {
    const { email } = req.params

    if (!email) {
        return res.status(400).json({ message: "please provide the required field" })
    }

    let existingData

    try {
        existingData = await Watchedvideo.findOne({ email })
    } catch (error) {
        console.log(error)
    }

    if (!existingData) {
        return res.status(200).json({ message: "no data found", data: null })
    }

    return res.status(200).json({ data: existingData })
}


const addToWishlist = async (req, res, next) => {
    const { email, videoid } = req.body

    if (!email || !videoid) {
        return res.status(400).json({ message: "please provide the required field" })
    }

    let existingData

    try {
        existingData = await Wishlist.findOne({ email })
    } catch (error) {
        console.log(error)
    }


    if (existingData) {
        if (existingData.wishlistitem.includes(videoid)) {
            return res.status(201).json({ message: "already added to wishlist", data: existingData })
        }
        existingData.wishlistitem.push(videoid)

        try {
            await existingData.save()
        } catch (error) {
            console.log(error)
        }
        return res.status(201).json({ message: "video added to wishlist", data: existingData })
    }

    const wishlist = new Wishlist({
        email,
        wishlistitem: [videoid]
    })

    try {
        await wishlist.save()
    } catch (error) {
        console.log(error)
    }

    return res.status(201).json({ message: "video added to wishlist", data: wishlist })

}

const removeFromWishlist = async (req, res, next) => {
    const { email, videoid } = req.body

    if (!email || !videoid) {
        return res.status(400).json({ message: "please provide the required field" })
    }

    let updatedData

    try {
        updatedData = await Wishlist.updateOne(
            { email },
            { $pull: { wishlistitem: videoid } }
        )
    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({ message: "item successfully removed from wishlist", data: updatedData })
}

const getWishlistProduct = async (req, res, next) => {
    const { email } = req.params

    if (!email) {
        return res.status(400).json({ message: "please provide the required field" })
    }

    let existingWishlistData

    try {
        const existingdata = await Wishlist.findOne({ email })
        if (!existingdata) {
            return res.status(200).json({ message: "no item found in wishlist", data: [] })
        }
        const strData = existingdata?.wishlistitem
        existingWishlistData = strData.map(Number)
    } catch (error) {
        console.log(error)
    }

    let wishlistProduct

    try {
        const allproduct = await Video.find({})
        wishlistProduct = allproduct.filter((product) => existingWishlistData.includes(product.videoid))
    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({ data: wishlistProduct })
}

exports.getVideos = getVideos
exports.getVideoNotes = getVideoNotes
exports.postVideoNotes = postVideoNotes
exports.getWatchedVideo = getWatchedVideo
exports.postWatchedVideo = postWatchedVideo
exports.addToWishlist = addToWishlist
exports.removeFromWishlist = removeFromWishlist
exports.getWishlistProduct = getWishlistProduct