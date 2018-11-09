import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {AssetCard} from 'client/component/home/elements/asset-card';

describe('AssetCard', function() {
    let props = {};

    beforeEach(function() {
        props = {
            className: 'class-name',
            asset: {
                name: 'Asset Card',
                description: 'This is a great asset card',
                location: {
                    latitude: 89.4421,
                    longitude: -21.0124,
                }
            },
            last: false,
        };
    });

    it('renders the name, description, latitude and longitude', function() {
        let card = shallow(<AssetCard {...props} />),
            name = card.find('.asset-card__name'),
            description = card.find('.asset-card__description'),
            location = card.find('.asset-card__location'),
            locationText = location.text();

        expect(name.text().includes(props.asset.name)).to.equal(true);
        expect(description.text().includes(props.asset.description)).to.equal(true);
        expect(locationText.includes(props.asset.location.latitude)).to.equal(true);
        expect(locationText.includes(props.asset.location.longitude)).to.equal(true);
    });

    it('renders a divider when it is not the last card', function() {
        let card = shallow(<AssetCard {...props} />);

        expect(card.find('.divider').exists()).to.equal(true);

        props.last = true;

        let lastCard = shallow(<AssetCard {...props} />);

        // Check only one - not just that it exists
        expect(lastCard.find('.divider').exists()).to.equal(false);
    });
});
