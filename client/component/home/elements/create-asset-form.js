import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Field,
    reduxForm
} from 'redux-form';

/**
 * Render a Form Field
 * @param {Object} field           The Field Metadata
 * @param {Object} field.input     The Field HTML Input
 * @param {string} field.label     The Field HTML Label
 * @return {Object}                The JSX Field Element
 */
function renderField({input, label}) {
    let type = 'text';

    if (input.name === 'latitude' || input.name === 'longitude') {
        type ='number';
    }

    return (
        <div className='form-group'>
            <label className='form-label' htmlFor={input.name}>
                {label}
            </label>
            <input
                {...input}
                className='form-input'
                type={type}
                id={input.name}
                required
            />
        </div>
    );
}

export class CreateAssetForm extends PureComponent {
    static propTypes = {
        className: PropTypes.string.isRequired,
        disabled: PropTypes.bool.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    }
    static defaultProps = {
        disabled: false,
    }
    constructor(props) {
        super(props);

        this.renderField = renderField.bind(this);
    }
    render() {
        let {
            className,
            handleSubmit,
            disabled,
        } = this.props;

        return (
            <form className={`${className} card`} onSubmit={handleSubmit}>
                <div className='card-header'>
                    <div className='card-title h5'>
                        Create an Asset
                    </div>
                    <div className='card-subtitle text-gray'>
                        Assets require a name, description, latitude and longitude.
                    </div>
                </div>
                <div className='card-body'>
                    <Field
                        label='Name'
                        name='name'
                        component={this.renderField}
                    />
                    <Field
                        label='Description'
                        name='description'
                        component={this.renderField}
                    />
                    <Field
                        label='Latitude'
                        name='latitude'
                        component={this.renderField}
                    />
                    <Field
                        label='Longitude'
                        name='longitude'
                        component={this.renderField}
                    />
                </div>
                <div className='card-footer'>
                    <button
                        className='btn btn-primary'
                        type='submit'
                        disabled={disabled}
                    >
                        Create
                    </button>
                </div>
            </form>
        );
    }
}

const form = reduxForm({
    form: 'createAssetForm',
})(CreateAssetForm);

export default styled(form)``;
