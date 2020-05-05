# EMS
# Employee-Management-System-CRUD-with-authorization-in-sails-js

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Thu Apr 30 2020 01:43:41 GMT+0530 (India Standard Time) using Sails v1.2.4.

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->


Step1:configure datastores.js according to your system
````
    adapter:'sails-postgresql',
    user:'postgress',
    host:'localhost',
    database:'EMS',
    password:'1234'
````
Step2:Install packages using
````
npm install
````
Step3: go to this Route to Register Admin on Postman
````
POST /create/admin':'AdminsignupController.createAdmin
````
Step4:go to login route to generate JWT token in every case
````
{
	"email":"Shyamalsharma.zapbuild@gmail.com",
	"password":"12345"
}
````
Step5: go to this Route to Register Manager on Postman
````
POST /signup/manager':'AdminController.createManager
````
Step6: go to this Route to Register Employee on Postman
````
POST /signup/employee':'AdminController.createEmployee
````
Step7:add Token in Authorization Header of admin, manager, employee on Postman to access the Routes
````
GET /employees':'AdminController.getEmployee
PUT /update/employee/:id':'AdminController.updateEmplyee
DELETE /delete/employee/:id':'AdminController.deleteEmployee
DELETE /delete/manager/:id':'AdminController.deleteManager

POST /login/manager':'ManagerController.managerLogin
GET /employees':'ManagerController.find

POST /login/employee':'EmployeeController.employeelogin
PUT /update/employee':'EmployeeController.updateEmplyee
````


