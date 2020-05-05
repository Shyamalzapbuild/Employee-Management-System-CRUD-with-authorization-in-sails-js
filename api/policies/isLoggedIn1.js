module.exports = async function (req, res, next) {
    try{
        if (!req.headers || !req.headers.authorization) {
          return res.badRequest({err: 'authorization header is missing'});
        }
        const tokenParam = req.headers.authorization;
        const decodedToken = JWTService.verify(tokenParam);
        const employeeRecord = await Employee.find({where:{
          id: decodedToken.user
        }});
        if (!employeeRecord) {
          return next({err:'invalid credentials provided'});
        }
        req.employeeId = employeeRecord[0].id;
        next();
    }catch(err){
        return res.serverError(err);
    }
      };