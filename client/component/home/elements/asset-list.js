import React, {PureComponent} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import AssetCard from 'client/component/home/elements/asset-card';

export class AssetList extends PureComponent {
    static propTypes = {
        assets: PropTypes.instanceOf(List).isRequired,
        className: PropTypes.string.isRequired,
    }
    static defaultProps = {
        assets: List([]),
    }
    render() {
        let {
            assets,
            className,
        } = this.props;

        return (
            <div className={`${className} card`}>
                <div className='card-header'>
                    <div className='card-title h5'>
                        Assets
                    </div>
                    <div className='card-subtitle text-gray'>
                        Assets are displayed below in the order they were created.
                    </div>
                </div>
                <ol className='card-body asset-list__body'>
                    {
                        assets.map(function(asset, i) {
                            return (
                                <AssetCard
                                    asset={asset}
                                    key={`asset-card-${i}`}
                                    last={i === assets.size - 1}
                                />
                            );
                        })
                    }
                </ol>
            </div>
        );
    }
}

export default styled(AssetList)`
    height: 100%;
    overflow-y: auto;

    .asset-list {
        &__body {
            margin: 0;
            overflow-y: auto;
        }
    }

    .divider {
        margin: 1rem 1rem .8rem;
    }
`;
