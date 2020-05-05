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
            const {name,phoneNo,imagePath} = req.allParams();
            if(!params.id){
                return res.badRequest({err:'id is not valid'})
            }
            const updateEmployee = await Employee.update({
                name,phoneNo,imagePath
            }).fetch();
            return res.ok(updateEmployee);
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

