const router = require("express").Router()
const db = require("../model")

const mongojs = require('mongojs')
// const db = mongojs("../model")

router.post("/api/savemovie", async (req, res) => {
let data = await db.Saved.create(req.body)
.catch(err => console.log(err))
console.log(data)
res.json("success")
})
router.get("/api/saved", async (req, res) => {
let data = await db.Saved.find()
.catch(err => console.log(err))
res.json(data)
})

router.get("/api/savemovie/:_id", async (req, res) => {
let data = await db.Saved.find({_id: mongojs.ObjectID(req.params._id)}, req.body)
.catch(err => console.log(err))
console.log(data)
res.json("success")
})



















module.exports = router