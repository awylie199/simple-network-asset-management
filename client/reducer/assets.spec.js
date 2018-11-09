import {expect} from 'chai';
import {Actions} from 'client/action/assets';
import reducer from 'client/reducer/assets';

describe('AssetsReducer', function() {
    it('sets state for getting assets', function() {
        let state = reducer(void 0, Actions.getAssets());

        expect(state.get('fetchingAssets')).to.equal(true);
    });

    it('sets state for setting assets', function() {
        let assets = [{}, {}],
            state = reducer(void 0, Actions.setAssets(assets));

        expect(state.get('fetchingAssets')).to.equal(false);
        expect(state.get('assets').size).to.equal(assets.length);
    });

    it('gets state for creating an asset', function() {
        let state = reducer(void 0, Actions.createAsset());

        expect(state.get('creatingAsset')).to.equal(true);
    });

    it('sets state for a newly created asset', function() {
        let assets = [{}, {}],
            state = reducer(void 0, Actions.createdAsset(assets));

        expect(state.get('creatingAsset')).to.equal(false);
        expect(state.get('assets').size).to.equal(assets.length);
    });
});
