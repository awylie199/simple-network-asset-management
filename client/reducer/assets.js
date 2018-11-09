import * as Constants from 'client/constant/assets';
import {
    Map,
    List,
} from 'immutable';

const initialState = Map({
    fetchingAssets: false,
    creatingAsset: false,
    assets: List([]),
});

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case Constants.GET_ASSETS:
        return state.set('fetchingAssets', true);
    case Constants.SET_ASSETS:
        return state.set('assets', List(action.payload.assets))
            .set('fetchingAssets', false);
    case Constants.CREATE_ASSET:
        return state.set('creatingAsset', true);
    case Constants.CREATED_ASSET:
        return state.set('assets', List(action.payload.assets))
            .set('creatingAsset', false);
    default:
        return state;
    }
}
