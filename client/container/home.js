import {connect} from 'react-redux';
import Home from 'client/component/home';
import {Actions as assetActions} from 'client/action/assets';

function mapStateToProps(state) {
    return {
        assets: state.assets.get('assets'),
        fetchingAssets: state.assets.get('fetchingAssets'),
        creatingAsset: state.assets.get('creatingAsset'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAssets: () => dispatch(assetActions.getAssets()),
        createAsset: asset => dispatch(assetActions.createAsset(asset)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
