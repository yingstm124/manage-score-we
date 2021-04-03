const express = require('express')
const app = express()

const path = require('path')

console.log('server .js')


app.use(express.static('./dist/manage-score-web'))

console.log('app use')

app.get('/', (req,res) => {
    // res.send('test')
    res.sendFile('index.html', {root: 'dist/manage-score-web/'})
})

app.listen(process.env.PORT || 8080, () => {
    console.log('port is working')
})