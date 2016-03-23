import actionTypes from './types';

export function activateAdminMode(admin) {
    return {
        type: actionTypes.activateAdminMode,
        admin: admin
    };
}
