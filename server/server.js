const express = require(`express`)
const app = express()
const cors = require(`cors`)
const rest = require("./rest.js")
const rtc = require("./rtc.js")

app.listen(8080, () => {
})
app.use(express.static(`./front`));
app.use(express.urlencoded({ extended: true, limit: `1000mb` }))
app.use(express.json({ extended: true, limit: `1000mb` }))
app.use(cors())

/**
 * restAPI
 */
rest.api(app)
rtc.handling(app)
