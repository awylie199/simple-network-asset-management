import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {List} from 'immutable';
import Loader from 'client/component/home/elements/loader';
import NoResults from 'client/component/home/elements/no-results';
import AssetList from 'client/component/home/elements/asset-list';
import CreateAssetForm from 'client/component/home/elements/create-asset-form';
import Navbar from 'client/component/navbar';

export class Home extends PureComponent {
    static propTypes = {
        className: PropTypes.string.isRequired,
        assets: PropTypes.instanceOf(List).isRequired,
        fetchingAssets: PropTypes.bool.isRequired,
        creatingAsset: PropTypes.bool.isRequired,
        getAssets: PropTypes.func.isRequired,
        createAsset: PropTypes.func.isRequired,
    }
    static defaultProps = {
        assets: List([]),
        fetchingAssets: true,
        creatingAsset: false,
    }
    componentDidMount() {
        let {
            getAssets,
        } = this.props;

        getAssets();
    }
    handleSubmit = (data) => {
        let {
            name,
            description,
            latitude,
            longitude,
        } = data;
        let {
            createAsset,
        } = this.props;

        createAsset({
            name,
            description,
            location: {
                latitude,
                longitude,
            }
        });
    }
    displayAssets = () => {
        let {
            fetchingAssets,
            creatingAsset,
            assets,
        } = this.props;

        if (fetchingAssets || creatingAsset) {
            return (
                <Loader />
            );
        } else if (!assets.size) {
            return (
                <NoResults />
            );
        } else {
            return (
                <AssetList assets={assets} />
            );
        }
    }
    render() {
        let {
            className,
            fetchingAssets,
            creatingAsset,
        } = this.props;

        return (
            <div className={`${className} container grid-lg`}>
                <div className='columns'>
                    <div className='column'>
                        <header className='navbar'>
                            <Navbar />
                        </header>
                        <main className='columns'>
                            <div className='column col-sm-12 col-md-6'>
                                <CreateAssetForm
                                    disabled={creatingAsset || fetchingAssets}
                                    enableReinitialize
                                    onSubmit={this.handleSubmit}
                                />
                            </div>
                            <div className='column col-sm-12 col-md-6'>
                                {this.displayAssets()}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default styled(Home)``;
