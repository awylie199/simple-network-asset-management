import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {AssetList} from 'client/component/home/elements/asset-list';
import {List} from 'immutable';

describe('AssetList', function() {
    let props = {};

    beforeEach(function() {
        props = {
            className: 'class-name',
            assets: List([
                {
                    name: 'Asset Card 1',
                    description: 'This is a great asset card',
                    location: {
                        latitude: 89.4421,
                        longitude: -21.0124,
                    },
                },
                {
                    name: 'Asset Card 2',
                    description: 'This is also a great asset card',
                    location: {
                        latitude: -89.4421,
                        longitude: 21.0124,
                    }
                }
            ]),
        };
    });

    it('renders two asset cards, one for each asset card', function() {
        let list = shallow(<AssetList {...props} />),
            cards = list.find('Styled(AssetCard)');

        expect(cards.length).to.equal(props.assets.size);
    });

    it('renders a final asset card with a true last prop', function() {
        let list = shallow(<AssetList {...props} />),
            cards = list.find('Styled(AssetCard)');

        expect(cards.first().prop('last')).to.equal(false);
        expect(cards.last().prop('last')).to.equal(true);
    });
});
