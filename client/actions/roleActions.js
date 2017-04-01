import axios from 'axios';
import types from './actionTypes';

/**
 * loadRoleSuccess action
 * @param  {object} role [description]
 * @return {object}      [description]
 */
export function loadRoleSuccess(role) {
  return {
    type: types.LOAD_ROLE_SUCCESS,
    role
  };
}

/**
 *
 * set in state the selcted role
 * @export
 * @param {any} id
 * @returns {any} role id
 */
export function setCurrentRole(id) {
  return {
    type: types.SET_CURRENT_ROLE,
    id
  };
}

/**
 * delete from state the current selected role
 * @return {[type]} [description]
 */
export function deleteCurrentRole() {
  return {
    type: types.DELETE_CURRENT_ROLE,
  };
}

/**
 * load role
 * @return {object} object of roles
 */
export function loadRoles() {
  return (dispatch) => {
    return axios.get('/roles').then((res) => {
      dispatch(loadRoleSuccess(res.data.role));
    });
  };
}

/**
 * save new role
 * @param  {object} role role object to be svaed
 * @return {object}      response from api
 */
export function saveRole(role) {
  return (dispatch) => {
    return axios.post('/roles', role).then(() => {
      dispatch(loadRoles());
    });
  };
}

/**
 * [updateRole description]
 * @param  {object} role role object to be updated
 * @return {object}      response from api
 */
export function updateRole(role) {
  return (dispatch, getState) => {
    const roleId = getState().manageRoles.selectedRole;
    return axios.put(`/roles/${roleId}`, role).then(() => {
      dispatch(loadRoles());
    });
  };
}

/**
 * delete role from db
 * @param  {number} id role id
 * @return {object}    api response
 */
export function deleteRole(id) {
  return (dispatch) => {
    return axios.delete(`/roles/${id}`).then(() => {
      dispatch(loadRoles());
    });
  };
}
