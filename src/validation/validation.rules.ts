import fs from 'fs';
import path from 'path';
 const invalidOptionValidation=(data)=>{
    if(data.width === '' || data.height === '' || data.filename === ''){
        return 'empty';
    }
    if(data.width === '0' || data.height === '0')
    {
        return 'nullOrZero';
    }
    if(!fs.existsSync(`${path.resolve('./')}/assets/images/${data.filename}.png`))
    {
        return 'notFound'
    }
    if(!ispositive(data.width) && !ispositive(data.height)  )
    {
       return 'negativeValue'
    }
    if( data.filename === undefined || data.width === undefined || data.height === undefined)
    {
    return 'required';
    }

    return ;

 }
 //check negative number
 function ispositive(n){
    return 1/(n*0)===1/0
}
 export default invalidOptionValidation