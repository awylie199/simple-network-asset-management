import {combineReducers} from 'redux';
import assets from 'client/reducer/assets';
import {reducer as form} from 'redux-form';

export default combineReducers({
    assets,
    form,
});
