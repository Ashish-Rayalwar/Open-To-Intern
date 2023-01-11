
// ### POST /functionup/interns
// - Create a document for an intern. 
// - Also save the collegeId along with the document. Your request body contains the following fields - { name, mobile, email, collegeName}
// - Return HTTP status 201 on a succesful document creation. Also return the document. The response should be a JSON object like [this](#successful-response-structure) 

// - Return HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)

// {
//     "isDeleted" : false,
//     "name" : "Jane Does",
//     "email" : "jane.doe@iith.in",
//     "mobile" : "90000900000",
//     "collegeId" : ObjectId("888771129c9ea621dc7f5e3b")
// }


const crateIntern = async (req,res)=>{
    let body = req.body

    const {name,email,mobile,collegeName} = body
    
    let findCollege = await collegeModel.findOne({name:collegeName}) 
    
    body.collegeId = findCollege._id.toString()
    
    let createData = await internModel.create(body)
    
    res.send({result:createData})
}
