/**
 * ManagerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    managerLogin:async (req,res)=>{
        try{
        const {email,password} = req.allParams();
        if(!email){
            return res.badRequest({
                err:'email is required'
            });
        }
        if(!password){
            return res.badRequest({
                err:'password is required'
            });
        }
        const manager = await Manager.find({where:{email:email}});
        sails.log(manager);
        if(!manager){
            return res.badRequest({
                err:'email is not registered'
            });
        }
        const matchedPassword = await UtilService.comparePassword(password, manager[0].password);
        if(!matchedPassword){
            return res.badRequest({err: 'unauthorized'});
        }
        const token = JWTService.issuer({user: manager[0].id}, '1 day');
        return res.ok({token});
    }catch(err){
        return res.serverError(err);
    }
    },
    updateEmplyee: async (req,res)=>{
        try{
            const {name,phoneNo} = req.allParams();
            if(!req.params.id){
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
                        const updateEmployee = await Employee.update({id:req.params.id}).set({
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
    },
    find: async(req,res)=>{
        try{
            const employe = await Employee.find({}).populate('manager');
            return res.ok(employe);
        }catch(err){
            return res.serverError(err);
        }
    }
};

