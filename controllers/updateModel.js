//module to decide what data should be updated
//uses an array and the params to decide what the key: value is to send to mongoose

const updateModel = (function(req, cb){
    let _stepArray = [
        {dbName: 'CoverPageText', reqName: 'coverPageText'}, 
        {dbName: 'Education', reqName: 'education'}, 
        {dbName: 'Experience', reqName: 'experience'}, 
        {dbName: 'AdditionalText', reqName:'additionalText'}
    ]
    let _dbName = _stepArray[parseInt(req.params.num)].dbName
    let _reqName = _stepArray[parseInt(req.params.num)].reqName
    let _id = req.body._id
    let _updateData = {}
    _updateData[_dbName] = req.body[_reqName]
    cb(_updateData)
})

module.exports = updateModel