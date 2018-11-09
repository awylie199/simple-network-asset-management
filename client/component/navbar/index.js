import React, {PureComponent} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export class Navbar extends PureComponent {
    static propTypes = {
        className: PropTypes.string.isRequired,
    }
    render() {
        let {
            className,
        } = this.props;

        return (
            <header className={className}>
                <h1 className='text-primary h3 text-bold'>
                    Simple Network Asset Management
                </h1>
            </header>
        );
    }
}

export default styled(Navbar)`
    padding: 1.5rem 0;
`;
