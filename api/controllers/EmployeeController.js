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
          const {name,imagePath} = req.allParams();
          const updateEmployee = await Employee.update({id:req.employeeId}).set({
            name,imagePath
        });
          return res.ok(updateEmployee);
      }catch(err){
          return res.serverError(err);
      }
  }
};

