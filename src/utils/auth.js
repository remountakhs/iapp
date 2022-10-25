import { getRoleOptions } from "../constants/roleOptions";

export function hasAnyRole(userRole) {
    return getRoleOptions().some(role => userRole.includes("ROLE_" + role));
}

export function hasRoleAdmin(userRole) {
    return userRole.some(role => role.includes(getRoleOptions()[0]));
}

export function hasRoleManager(userRole) {
    return userRole.some(role => role.includes(getRoleOptions()[7]));
}

export function hasOnlyRoleManager(userRole) {
    return userRole.some(role => role.includes(getRoleOptions()[7])) && !this.hasRoleAdminOrDirector(userRole);
}

export function hasRoleAdminOrDirector(userRole) {
    return userRole.some(role => role.includes("ROLE_" + getRoleOptions()[0])) || userRole.some(role => role.includes("ROLE_" + getRoleOptions()[1]));
}

export function hasAnyOfRoles(userRole, roleOptions) {
    return roleOptions.some(role => userRole.includes("ROLE_" + role));
}

export default class functions {
    static hasAnyRole(userRole) { return hasAnyRole(userRole); };
    static hasAnyOfRoles(userRole, roleOptions) { return hasAnyOfRoles(userRole, roleOptions); };
    static hasRoleAdmin(userRole) { return hasRoleAdmin(userRole); };
    static hasRoleAdminOrDirector(userRole) { return hasRoleAdminOrDirector(userRole); };
}