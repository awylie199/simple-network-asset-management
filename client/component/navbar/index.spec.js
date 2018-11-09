import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {Navbar} from 'client/component/navbar';

describe('Navbar', function() {
    let props = {};

    beforeEach(function() {
        props = {
            className: 'class-name',
        };
    });

    it('renders a h1 title', function() {
        let navbar = shallow(<Navbar {...props} />),
            title = navbar.find('h1');

        expect(title).to.have.length(1);
    });
});
