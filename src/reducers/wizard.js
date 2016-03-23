import actionTypes from "../actions/types";

const defaultState = [];

export default function wizardReducer(state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.initAppArenaWizard:
            return action.payload.data;
        case actionTypes.addWizardStep:
            return action.payload.data;
        case actionTypes.editWizardStep:
            return action.payload.data;
        case actionTypes.deleteWizardStep:
            return action.payload.data;
        case actionTypes.addWizardElement:
            return action.payload.data;
        case actionTypes.editWizardElement:
            return action.payload.data;
        case actionTypes.deleteWizardElement:
            return action.payload.data;
        default:
            return state;
    }
}
