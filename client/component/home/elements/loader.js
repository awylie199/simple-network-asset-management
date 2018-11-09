import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class Loader extends PureComponent {
    static propTypes = {
        className: PropTypes.string.isRequired,
    }
    render() {
        let {
            className,
        } = this.props;

        return (
            <div className={className}>
                <div className='loading loading-lg'></div>
            </div>
        );
    }
}

export default styled(Loader)`
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
`;
