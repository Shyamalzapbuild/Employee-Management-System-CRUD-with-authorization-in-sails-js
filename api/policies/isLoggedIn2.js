module.exports = async function (req, res, next) {
    try{
        if (!req.headers || !req.headers.authorization) {
          return res.badRequest({err: 'authorization header is missing'});
        }
        const tokenParam = req.headers.authorization;
        const decodedToken = JWTService.verify(tokenParam);
        sails.log(decodedToken);
        const adminRecord = await Admin.find({where:{
          id: decodedToken.user
        }});
        sails.log(adminRecord);
        if (!adminRecord) {
          return next({err:'invalid credentials provided'});
        }
        req.adminId = adminRecord.id;
        next();
    }catch(err){
        return res.serverError(err);
    }
};