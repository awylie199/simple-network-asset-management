import * as Constants from 'client/constant/assets';

export const Actions = {
    getAssets: () => ({type: Constants.GET_ASSETS}),
    setAssets: assets => ({type: Constants.SET_ASSETS, payload: {
        assets,
    }}),
    createAsset: asset => ({type: Constants.CREATE_ASSET, payload: {
        asset,
    }}),
    createdAsset: assets => ({type: Constants.CREATED_ASSET, payload: {
        assets,
    }})
};
