import React, {PureComponent} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html-react';

export class AssetCard extends PureComponent {
    static propTypes = {
        className: PropTypes.string.isRequired,
        asset: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            location: PropTypes.shape({
                latitude: PropTypes.number.isRequired,
                longitude: PropTypes.number.isRequired,
            }).isRequired,
        }).isRequired,
        last: PropTypes.bool.isRequired,
    }
    static defaultProps = {
        last: false,
    }
    render() {
        let {
            className,
            asset: {
                name,
                description,
                location: {
                    latitude,
                    longitude,
                }
            },
            last,
        } = this.props;

        return (
            <>
            <li className={`${className} tile tile-centered`}>
                <div className='tile-icon asset-card__icon'>
                    <i className='icon icon-2x icon-location centered' />
                </div>
                <div className='tile-content'>
                    <div className='tile-title text-bold asset-card__name'>
                        Name: {sanitizeHtml(name)}
                    </div>
                    <div className='tile-title asset-card__description'>
                        Description: {sanitizeHtml(description)}
                    </div>
                    <small className='asset-card__location'>
                        Location: {sanitizeHtml(latitude)}, {sanitizeHtml(longitude)}
                    </small>
                </div>
            </li>
            {
                last ? null : <li role='presentation' className='divider' />
            }
            </>
        );
    }
}

export default styled(AssetCard)`
    background: ${({theme}) => theme.colours.white};

    .asset-card {
        &__location {
            margin-top: .5rem;
        }

        &__icon {
            margin-right: .5rem;
        }
    }
`;
