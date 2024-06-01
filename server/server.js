const express = require(`express`)
const app = express()
const cors = require(`cors`)
const request = require(`request`)
const kintone = require("./kitnoneApi.js")
app.listen(8080, () => {
  console.log("test")
})
app.use(express.static(`./front`));
app.use(express.urlencoded({ extended: true, limit: `1000mb` }))
app.use(express.json({ extended: true, limit: `1000mb` }))
app.use(cors())

/**
 * kintone
 * api
 */
kintone.expressKintone(app)
/**/
