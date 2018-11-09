import {
    GET_ASSETS,
    CREATE_ASSET,
} from 'client/constant/assets';
import {Actions as assetsActions} from 'client/action/assets';
import axios from 'axios';
import {List} from 'immutable';

export default () => next => action => {
    switch (action.type) {
    case GET_ASSETS:
        axios.get('/assets').then(function(response) {
            global.requestIdleCallback(function() {
                if (response.data) {
                    next(assetsActions.setAssets(List(response.data)));
                } else {
                    // eslint-disable-next-line no-console
                    console.error('error fetching assets');
                    next(assetsActions.setAssets(List([])));
                }
            });
        });
        break;
    case CREATE_ASSET:
        axios.post('/assets', action.payload.asset).then(function(response) {
            global.requestIdleCallback(function() {
                if (response.data && response.data.assets) {
                    next(assetsActions.createdAsset(List(response.data.assets)));
                } else {
                    // eslint-disable-next-line no-console
                    console.error('error fetching assets');
                    next(assetsActions.createdAsset(List([])));
                }
            });
        });
    }

    next(action);
};
