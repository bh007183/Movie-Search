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

router.delete("/api/savemovie/:_id", async (req, res) => {
let data = await db.Saved.deleteOne({_id: mongojs.ObjectID(req.params._id)}, req.body)
.catch(err => console.log(err))
console.log(data)
res.json("success")
})



















module.exports = router