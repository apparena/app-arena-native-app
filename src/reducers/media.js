import actionTypes from '../actions/types';
import update from 'react-addons-update'

const defaultState = {all: {}, uploadedData: []};

export default function mediaReducer(state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.getAllMedia:
            return Object.assign({}, state,
                {all: action.payload.data}
            );
        case actionTypes.uploadCompanyMedia:
            return update(state, {
                uploadedData: {$set: action.payload.data.data}
            });
        case actionTypes.addMedia:
            return update(state, {
                all: {files: {$push: action.files}}
            });
        default:
            return state;
    }
}
