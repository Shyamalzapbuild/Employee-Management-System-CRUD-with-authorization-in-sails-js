/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
//create admin
  'POST /create/admin':'AdminsignupController.createAdmin',
//ADMIN
  'POST /login/admin':'AdminController.adminLogin',
  'POST /signup/manager':'AdminController.createManager',
  'POST /signup/employee':'AdminController.createEmployee',
  'GET /employees':'AdminController.getEmployee',
  'PUT /update/employee/:id':'AdminController.updateEmplyee',
  'DELETE /delete/employee/:id':'AdminController.deleteEmployee',
  'DELETE /delete/manager/:id':'AdminController.deleteManager',

//Mentor
  'POST /login/manager':'ManagerController.managerLogin',
  'GET /employees':'ManagerController.find',

//Employee
  'POST /login/employee':'EmployeeController.employeelogin',
  'PUT /update/employee':'EmployeeController.updateEmplyee',
  
  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
