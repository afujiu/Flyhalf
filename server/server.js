/******************************
 * node.jsの基本設定
 */
const express = require(`express`)
const exp = express()
const cors = require(`cors`)
const gate = require("./gate.js")

exp.listen(8080, () => {
    console.log('8080 started')
})
exp.use(express.static(`./front`));
exp.use(express.urlencoded({ extended: true, limit: `1000mb` }))
exp.use(express.json({ extended: true, limit: `1000mb` }))
exp.use(cors())

/**
 * restAPI
 */
gate.api(exp)
