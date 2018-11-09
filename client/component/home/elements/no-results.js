import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class NoResults extends PureComponent {
    static propTypes = {
        className: PropTypes.string.isRequired,
    }
    render() {
        let {
            className,
        } = this.props;

        return (
            <div className={className}>
                <div className='empty'>
                    <div className='empty-icon'>
                        <i className='icon icon-location icon-3x' />
                    </div>
                    <p className='empty-title h5'>There are no assets available</p>
                    <p className='empty-subtitle'>Create your first asset</p>
                </div>
            </div>
        );
    }
}

export default styled(NoResults)``;
