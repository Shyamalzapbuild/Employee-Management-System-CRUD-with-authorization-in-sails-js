/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  employeelogin: async (req,res)=>{
    const {email,password}=req.allParams();
    if(!email){
      return res.badRequest({
        err:'email is required'
      });
    }
    if(!password){
      return res.badRequest({
        err:'password is not exist'
      });
    }
    const employee = await Employee.find({where:{email:email}});
    if(!employee){
      return res.badRequest({
        err:'employee is not exist'
      });
    }
    const matchedPassword = await UtilService.comparePassword(password, employee[0].password);
    if(!matchedPassword){
        return res.badRequest({err: 'unauthorized'});
    }
    const token = JWTService.issuer({user: employee[0].id}, '1 day');
    return res.ok({token});
  },
  updateEmplyee: async (req,res)=>{
      try{
        const {name,phoneNo} = req.allParams();
            if(!req.employeeId){
                return res.badRequest({err:'id is not valid'})
            }
            req.file('imagePath').upload({
                maxBytes:10000000,
               dirname:'../../assets/images',
                saveAs:`employees-${Date.now()}.png`
            },async(error,uploadedFiles)=>{
                if(uploadedFiles){
                    if(uploadedFiles[0].type==='image/png' || uploadedFiles[0].type ==='image/jpg' || uploadedFiles[0].type ==='image/jpeg'){
                        imagePaths = uploadedFiles[0].fd;
                        const updateEmployee = await Employee.update({id:req.employeeId}).set({
                            name,phoneNo,imagePath:imagePaths
                        });
                        return res.ok(updateEmployee);
                    }
                    else{
                        return res.badRequest({err:"only images with jpeg,jpg and png files are supported"});
                    }
               }
               if(error) {
                   return res.serverError(error.message);
                }
               if(uploadedFiles[0].length===0) {
                   return res.badRequest({err:"no files was uploaded"});
                }
          })
      }catch(err){
          return res.serverError(err);
      }
  }
};

