/**
 * AdminsignupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createAdmin: async (req,res)=>{
        const {email,password}=req.allParams();
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
        const encryptedPassword = await UtilService.hashPassword(password);
        const admin = await Admin.create({
            email,password:encryptedPassword
        }).fetch();
        return res.ok(admin);
    }
};

