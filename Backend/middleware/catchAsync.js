module.exports=(handleError)=>(req,res,next)=>{

    Promise.resolve(handleError(req,res,next)).catch(next)
}