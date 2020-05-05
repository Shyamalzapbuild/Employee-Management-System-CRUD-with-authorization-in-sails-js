/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    adminLogin: async (req,res)=>{
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
        const admin = await Admin.findOne({where:{email:email}});
        if(!admin){
            return res.badRequest({
                err:'email is not registered'
            });
        }
        const matchedPassword = await UtilService.comparePassword(password, admin.password);
        if(!matchedPassword){
            return res.badRequest({err: 'unauthorized'});
        }
        const token = JWTService.issuer({user: admin.id}, '1 day');
        return res.ok({token});
    }catch(err){
        return res.serverError(err,'weewwe');
    }
    },
    createManager: async (req, res)=>{
        try{
            const {name,email,password,contact} = req.allParams();
            if(!name){
                return res.badRequest({
                    err:'Name is required'
                });
            }
            if(!email){
                return res.badRequest({
                    err:'Email is required'
                });
            }
            if(!password){
                return res.badRequest({
                    err:'password is required'
                });
            }
            if(!contact){
                return res.badRequest({
                    err:'contact is required'
                });
            }
            const managerRecord = await Manager.find({where:{contact:contact}});
            if(contact==managerRecord.contact){
                return res.badRequest({
                    err:'contact already registered'
                });
            }
            const encryptedPassword = await UtilService.hashPassword(password);
            const managers = await Manager.create({
                name,email,password:encryptedPassword,contact
            }).intercept('E_UNIQUE',(err)=>{
                return res.badRequest({
                    err:'email is already registered'
                });
            }).fetch();
            return res.ok(managers);
        }catch(err){
            return res.serverError(err);
        }
      },
    createEmployee:async (req,res)=>{
        try{
            const {name,email,password,designation,phoneNo,managerId} = req.allParams();
            if(!name){
                return res.badRequest({err:'name is required'})
            }
            if(!email){
                return res.badRequest({err:'email is required'})
            }
            if(!password){
                return res.badRequest({err:'password is required'})
            }
            if(!designation){
                return res.badRequest({err:'designation is required'})
            }
            if(!phoneNo){
                return res.badRequest({err:'phoneNo is required'})
            }
            if(!managerId){
                return res.badRequest({err:'managerId is required'})
            }
            const manager =await Manager.find({where:{id:managerId}});
            if(!manager[0].id){
                return res.badRequest({err:'Manager not exist'});
            }
            const emplyeeRecord = await Employee.find({where:{phoneNo:phoneNo}});
            if(phoneNo==emplyeeRecord.phoneNo){
                return res.badRequest({
                    err:'conatct is alresdy registered'
                });
            }
            const encryptedPassword = await UtilService.hashPassword(password);
            const employee = await Employee.create({
                name,email,password:encryptedPassword,designation,phoneNo,manager:managerId
            }).intercept('E_UNIQUE',(err)=>{
                return res.badRequest({
                    err:'email is already registered'
                });
            }).fetch();
            return res.ok(employee);
        }catch(err){
            return res.serverError(err);
        }
    },
    updateEmplyee: async (req,res)=>{
        try{
            const id= req.params.id;
            const {name,email,password,designation,phoneNo,managerId} = req.allParams();
            if(!id){
                return res.badRequest({err:'id is not valid'})
            }
            const employee = await Employee.find({where:{id:id}});
            if(!employee){
                return res.badRequest({
                    err:'employee not find'
                });
            }
            const manager =await Manager.find({where:{id:managerId}});
            if(!manager[0].id){
                return res.badRequest({err:'Manager not exist'});
            }
            const updateEmployee = await Employee.update({id:id}).set({
                name,email,password,designation,phoneNo,manager:managerId
            });
            return res.ok(updateEmployee);
        }catch(err){
            return res.serverError(err);
        }
    },
    deleteEmployee: async(req,res)=>{
        try{
            const id = req.params.id;
            const deleteEmplyee = await Employee.destroy({where:{id:id}});
            return res.ok(deleteEmplyee);
        }catch(err){
            return res.serverError(err);
        }
    },
    deleteManager: async(req,res)=>{
        try{
            const id = req.params.id;
            const deleteManagers = await Manager.destroy({where:{id:id}});
            return res.ok(deleteManagers);
        }catch(err){
            return res.serverError(err);
        }
    },
    getEmployee: async(req,res)=>{
        try{
            const employe = await Employee.find({})
            .populate('manager');
            return res.ok(employe);
        }catch(err){
            return res.serverError(err);
        }
    }
};

