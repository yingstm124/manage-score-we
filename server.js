const express = require('express')
const app = express()

const path = require('path')

console.log('server .js')


app.use(express.static('/Users/sutimarpengpinij/Desktop/204361_OOD/scan-manage/manage-score-web/angularapp'))

console.log('app use')

app.get('/', (req,res) => {
    // res.send('test')
    res.sendFile('index.html', {root: '/Users/sutimarpengpinij/Desktop/204361_OOD/scan-manage/manage-score-web/angularapp/'})
})

app.listen(process.env.PORT || 8080, () => {
    console.log('port is working')
})