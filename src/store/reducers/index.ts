import { initialState } from './../states/index';
import {
    SET_TOKEN, 
    SET_USER 
} from '../actions/index' 
import { IActions } from '../../types'

export const reducer = (state=initialState, action: any) => {
    switch(action.type){
        case SET_TOKEN:
            return { ...state, token: action.token }
        break;
        case SET_USER:
            return { ...state, user: action.user }
        break;
        default:
            return { ...state }
    }
}
