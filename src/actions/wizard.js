import actionTypes from './types';

import update from 'react-addons-update'
import {wizard, step, configElement, video, info, preview, publish, localization} from '../config/wizard'
import {getWizardJSON, updateWizardAction} from '../helpers/helpers'

export function initAppArenaWizard(appId) {
    const request = getWizardJSON(appId);
    return {
        type: actionTypes.initAppArenaWizard,
        payload: request
    };
}

export function addWizardStep(appId, oldWizard, type, obj) {
    if (!Object.keys(oldWizard).length) {
        oldWizard = wizard;
    }
    var element;
    switch (type) {
        case "step":
            element = step;
            break;
        case "publish":
            element = publish;
            break;
        case "preview":
            element = preview;
            break;
        case "localization":
            element = localization;
            break;
        default:
            element = step
    }
    var newStep = update(element, {
        $merge: obj
    });
    var wizardJson = update(oldWizard, {
        steps: {$push: [newStep]}
    });
    const request = updateWizardAction(appId, wizardJson);
    return {
        type: actionTypes.addWizardStep,
        payload: request
    };
}

export function addWizardElement(appId, stepID, oldWizard, type, obj) {
    var element;
    switch (type) {
        case "configElement":
            element = configElement;
            break;
        case "video":
            element = video;
            break;
        case "info":
            element = info;
            break;
        default:
            element = configElement
    }
    var newConfigElement = update(element, {
        $merge: obj
    });
    var wizardJson = update(oldWizard, {
        steps: {[stepID]: {elements: {$push: [newConfigElement]}}}
    });
    const request = updateWizardAction(appId, wizardJson);
    return {
        type: actionTypes.addWizardElement,
        payload: request
    };
}

export function editWizardElement(appId, identifier, column, layout, stepID, oldWizard, type) {
    var i = "", elements = oldWizard['steps'][stepID]['elements'];
    Object.keys(elements).map((_, k) => {
        if (elements[k].type === type) {
            if (elements[k].identifier === identifier) {
                elements = update(elements, {
                    [k]: {column: {$set: column}, layout: {$set: layout}}
                });
            }
        }
    });
    var wizardJson = update(oldWizard, {
        steps: {[stepID]: {elements: {$set: elements}}}
    });
    const request = updateWizardAction(appId, wizardJson);
    return {
        type: actionTypes.editWizardElement,
        payload: request
    };
}

export function deleteWizardElement(appId, identifier, stepID, oldWizard, type) {
    var i = "", elements = oldWizard['steps'][stepID]['elements'];
    Object.keys(elements).map((_, k) => {
        if (elements[k].type === type) {
            if (elements[k].identifier === identifier) {
                i = k;
            }
        }
    });
    if (Number.isInteger(i)) {
        elements.splice(i, 1);
    }
    var wizardJson = update(oldWizard, {
        steps: {[stepID]: {elements: {$set: elements}}}
    });
    const request = updateWizardAction(appId, wizardJson);
    return {
        type: actionTypes.deleteWizardElement,
        payload: request
    };
}

export function editWizardStep(appId, name, desc, column, layout, stepID, oldWizard) {
    var wizardJson = update(oldWizard, {
        steps: {
            [stepID]: {
                title: {$set: name},
                description: {$set: desc},
                column: {$set: column},
                layout: {$set: layout}
            }
        }
    });
    const request = updateWizardAction(appId, wizardJson);
    return {
        type: actionTypes.editWizardElement,
        payload: request
    };
}

export function deleteWizardStep(appId, stepID, oldWizard) {
    var wizardJson = update(oldWizard, {
        steps: {$splice: [[stepID, 1]]}
    });
    const request = updateWizardAction(appId, wizardJson);
    return {
        type: actionTypes.deleteWizardElement,
        payload: request
    };
}