import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {Loader} from 'client/component/home/elements/loader';

describe('Loader', function() {
    let props = {};

    beforeEach(function() {
        props = {
            className: 'class-name',
        };
    });

    it('renders a loading icon', function() {
        let loader = shallow(<Loader {...props} />),
            icon = loader.find('.loading');

        expect(icon).to.have.length(1);
    });
});
