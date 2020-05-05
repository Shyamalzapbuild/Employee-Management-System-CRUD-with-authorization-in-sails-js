/**
 * Employee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:'string',
      required:true
    },
    email:{
      type:'string',
      isEmail:true,
      required:true,
      unique:true
    },
    password:{
      type:'string',
      required:true
    },
    designation:{
      type:'string'
    },
    phoneNo:{
      type:'string',
      required:true
    },
    imagePath:{
      type:'string'
    },
    manager:{
      model:'Manager',
      columnName:'managerId',
      required:true
    }
}};