import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {Home} from 'client/component/home';
import {List} from 'immutable';
import sinon from 'sinon';

describe('Home', function() {
    let props = {},
        data = {};

    beforeEach(function() {
        props = {
            className: 'class-name',
            assets: List([]),
            fetchingAssets: false,
            creatingAsset: false,
            getAssets: sinon.spy(),
            createAsset: sinon.spy(),
        };
        data = {
            name: 'New Asset',
            description: 'A great new asset',
            location: {
                latitude: 45.2211,
                longitude: 87.2224,
            }
        };
    });

    it('calls getAssets on componentDidMount', function() {
        Home.prototype.componentDidMount.call({props});

        expect(props.getAssets.calledOnce).to.equal(true);
    });

    it('calls createAsset on handleSubmit', function() {
        let home = shallow(<Home {...props} />);

        home.instance().handleSubmit(data);

        expect(props.createAsset.calledOnce).to.equal(true);
    });

    it('renders a form and no results by default', function() {
        let home = shallow(<Home {...props} />),
            form = home.find('Styled(ReduxForm)'),
            loader = home.find('Styled(Loader)'),
            noResults = home.find('Styled(NoResults)'),
            assetList = home.find('Styled(AssetList)');

        expect(form).to.have.length(1);
        expect(loader).to.have.length(0);
        expect(noResults).to.have.length(1);
        expect(assetList).to.have.length(0);

        props.fetchingAssets = true;
    });

    it('renders a form and a loader when active', function() {
        props.fetchingAssets = true;

        let home = shallow(<Home {...props} />),
            loader = home.find('Styled(Loader)'),
            noResults = home.find('Styled(NoResults)'),
            assetList = home.find('Styled(AssetList)');

        expect(loader).to.have.length(1);
        expect(noResults).to.have.length(0);
        expect(assetList).to.have.length(0);
    });

    it('renders a form and no results by default', function() {
        props.assets = List([{}]);

        let home = shallow(<Home {...props} />),
            loader = home.find('Styled(Loader)'),
            noResults = home.find('Styled(NoResults)'),
            assetList = home.find('Styled(AssetList)');

        expect(loader).to.have.length(0);
        expect(noResults).to.have.length(0);
        expect(assetList).to.have.length(1);
    });
});
