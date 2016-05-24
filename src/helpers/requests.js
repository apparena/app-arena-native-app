import React from "react";
import {AsyncStorage, PickerIOS, Text, View} from "react-native";
import axios from "axios";
import config from "../config/global";

axios.defaults.baseURL = config.api_base_url;

/**
 * Update Config Value
 * @param appId
 * @param identifier
 * @param value
 * @returns {*}
 */
export function updateConfigValueAction(appId, identifier, value) {
    return axios.put(`${config.api_app_route}/${appId}/configs/${identifier}`,
        {
            value
        }, {headers: config.api.headers});
}

/**
 * Login User
 * @param email
 * @param password
 * @returns {*}
 */
export function loginUser(email, password) {
    return axios.post(`/auth/token`,
        {
            email,
            password
        }, {headers: config.api.headers});
}

/**
 * Update Wizard
 * @param appId
 * @param wizardJson
 * @returns {*}
 */
export function updateWizardAction(appId, wizardJson) {
    return axios.put(`${config.api_app_route}/${appId}/wizard/update`, wizardJson, {headers: config.api.headers});
}

/**
 * Get A Users Profile
 * @param companyId
 * @param userId
 * @returns {*}
 */
export function getCurrentUserAction(companyId, userId) {
    return axios.get(`${config.api_company_route}/${companyId}/users/${userId}`, {headers: config.api.headers});
}

/**
 * Update A Users Profile
 * @param companyId
 * @param userId
 * @param data
 * @returns {*}
 */
export function updateCurrentUserAction(companyId, userId, data) {
    return axios.put(`${config.api_company_route}/${companyId}/users/${userId}`, data, {headers: config.api.headers});
}

/**
 * Get News from Blog
 * @returns {*}
 */
export function getNewsAction() {
    return axios.get(`https://blog.app-arena.com/wp-json/wp/v2/posts?categories=544&_embed&ordered=date`, {headers: config.api.headers});
}

/**
 * Create a Company
 * @param name
 * @returns {*}
 */
export function createCompanyAction(name) {
    return axios.post(`${config.api_company_route}`,
        {
            name,
            subdomain: name
        }, {headers: Object.assign({}, config.api.headers, {Authorization: config.auth_token})});
}

/**
 * Register User in a Company
 * @param username
 * @param email
 * @param password
 * @param companyId
 * @param firstname
 * @param lastname
 * @returns {*}
 */
export function registerUser(username, email, password, companyId, firstname, lastname) {
    return axios.post(`${config.api_company_route}/${companyId}/users`,
        {
            username,
            firstname,
            lastname,
            displayName: firstname + ' ' + lastname,
            email,
            password
        }, {headers: Object.assign({}, config.api.headers, {Authorization: config.auth_token})});
}

/**
 * Update Translation-String
 * @param appId
 * @param identifier
 * @param translation
 * @returns {*}
 */
export function updateTranslationStringAction(appId, identifier, translation) {
    return axios.put(`${config.api_app_route}/${appId}/translations/${identifier}`,
        {
            translation
        }, {headers: config.api.headers});
}

/**
 * Upload Image to Amazon-S3 Company Folder
 * @param companyId
 * @param data
 * @returns {*}
 */
export function uploadCompanyMediaAction(companyId, data) {
    let fetchConfig = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
            'Authorization': config.auth_token
        },
        body: data
    };

    try {
        return fetch(`${config.api_base_url}${config.api_company_route}/${companyId}/media`, fetchConfig);
    } catch (error) {
        // Handle error
        console.error(error);
    }
}

/**
 * Get Config Element
 * @param appId
 * @param identifier
 * @returns {V}
 */
export function getConfigElement(appId, identifier) {
    return axios.get(`${config.api_app_route}/${appId}/configs/${identifier}`, {headers: config.api.headers});
}

/**
 * Get All Company Media
 * @param companyId
 * @param types
 * @returns {V}
 */
export function getAllMediaAction(companyId, types = "") {
    var params = Object.assign({headers: config.api.headers}, {params: {types}});
    return axios.get(`${config.api_company_route}/${companyId}/media`, params
    );
}

/**
 * Get All Translation Strings
 * @param appId
 * @returns {V}
 */
export function getAllTranslationStringsAction(appId) {
    return axios.get(`${config.api_app_route}/${appId}/translations`, {headers: config.api.headers});
}

/**
 * Get All Config Elements
 * @param appId
 * @returns {V}
 */
export function getAllConfig(appId) {
    return axios.get(`${config.api_app_route}/${appId}/configs`, {headers: config.api.headers});
}

/**
 * Get App Info
 * @param appId
 * @returns {V}
 */
export function getAppInfoAction(appId) {
    return axios.get(`${config.api_app_route}/${appId}`, {headers: config.api.headers});
}

/**
 * Get Apps of the User
 * @param token
 * @param params
 * @returns {V}
 */
export function getApps(token, params) {
    params = params || {};
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`${config.api_app_route}`, {params: params, headers: config.api.headers});
}

/**
 * get App Wizard JSON
 * @param appId
 * @returns {V}
 */
export function getWizardJSON(appId) {
    return axios.get(`${config.api_app_route}/${appId}/wizard`, {headers: config.api.headers});
}

/**
 * Combine some other Actions (getAllConfig(), getWizardJSON(), getAppInfoAction())
 * @param appId
 * @returns {Promise.<TResult>}
 */
export function getAll(appId) {
    return axios.all([getAllConfig(appId), getWizardJSON(appId), getAppInfoAction(appId)])
        .then(axios.spread((config, wizard, app) => {
            return {config, wizard, appId, app};
        })).catch((response) => {
            console.warn(response);
        });
}
