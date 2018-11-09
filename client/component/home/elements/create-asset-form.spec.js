import React from 'react';
import {
    mount,
} from 'enzyme';
import {
    createStore,
    combineReducers
} from 'redux';
import {expect} from 'chai';
import sinon from 'sinon';
import CreateAssetForm from 'client/component/home/elements/create-asset-form';
import {reducer as formReducer} from 'redux-form';
import {Provider} from 'react-redux';

describe('CreateAssetForm', function() {
    let props = {},
        store = {};

    beforeEach(function() {
        props = {
            handleSubmit: sinon.spy(),
            className: 'class-name',
            disabled: false,
        };
        store = createStore(combineReducers({form: formReducer}));
    });

    it('renders form inputs for name, description, latitude and longitude', function() {
        let form = mount(
                <Provider store={store}>
                    <CreateAssetForm {...props} />
                </Provider>
            ),
            nameInput = form.find('input[name="name"]'),
            descriptionInput = form.find('input[name="description"]'),
            lngInput = form.find('input[name="longitude"]'),
            latInput = form.find('input[name="latitude"]');


        expect(nameInput).to.have.length(1);
        expect(descriptionInput).to.have.length(1);
        expect(lngInput).to.have.length(1);
        expect(latInput).to.have.length(1);
    });

    it('renders a form submit button which is disabled when the disabled prop is true', function() {
        let form = mount(
                <Provider store={store}>
                    <CreateAssetForm {...props} />
                </Provider>
            ),
            btn = form.find('button[type="submit"]');

        // Check there's only one submit button - not just that it exists
        expect(btn).to.have.length(1);
        expect(btn.prop('disabled')).to.equal(false);

        props.disabled = true;

        let disabledForm = mount(
                <Provider store={store}>
                    <CreateAssetForm {...props} />
                </Provider>
            ),
            disabledBtn = disabledForm.find('button[type="submit"]');

        expect(disabledBtn).to.have.length(1);
        expect(disabledBtn.prop('disabled')).to.equal(true);
    });

    it('calls handleSubmit on form submit event', () => {
        let form = mount(
            <Provider store={store}>
                <CreateAssetForm {...props} />
            </Provider>
        );

        form.simulate('submit');
        expect(props.handleSubmit.calledOnce).to.equal(true);
    });
});
