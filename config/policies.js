/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  EmployeeController:{
    'updateEmplyee':'isLoggedIn1'
  },
  ManagerController:{
    'find':'isLoggedIn',
    'updateEmplyee':'isLoggedIn',
  },
  AdminController:{
    'createManager':'isLoggedIn2',
    'createEmployee':'isLoggedIn2',
    'updateEmplyee':'isLoggedIn2',
    'deleteEmployee':'isLoggedIn2',
    'deleteManager':'isLoggedIn2',
    'getEmployee':'isLoggedIn2'
  }
};
