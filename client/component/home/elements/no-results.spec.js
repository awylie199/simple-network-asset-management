import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {NoResults} from 'client/component/home/elements/no-results';

describe('NoResults', function() {
    let props = {};

    beforeEach(function() {
        props = {
            className: 'class-name',
        };
    });

    it('renders an \'empty\' component', function() {
        let noResults = shallow(<NoResults {...props} />),
            empty = noResults.find('.empty');

        expect(empty).to.have.length(1);
    });
});
