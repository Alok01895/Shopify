class ApiFeatures{
    constructor(query,queryStr)
    {
        this.query=query;
        this.queryStr=queryStr
    }


    search(){
        
        const keyword=this.queryStr.keyword ?
        {
            name:{
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        }
        :
        {}
        

        this.query= this.query.find({...keyword})
        return this;
    }


    filter()
    {
        const copyQuery={...this.queryStr}
        
        const removeFields=["keyword","page","limit"];
         
        removeFields.forEach(key=>{
            delete copyQuery[key]
        })
        let queryStr=JSON.stringify(copyQuery)
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`)
         
        this.query=this.query.find(JSON.parse(queryStr))
        return this
    }


    pagination(modelsPerPage)
    {
        const currPage= Number(this.queryStr.page) || 1;

        const skipModels= (currPage-1) * modelsPerPage;

        this.query= this.query.limit(modelsPerPage).skip(skipModels);

        return this;
    }
}


module.exports= ApiFeatures