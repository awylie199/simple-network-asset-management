import {expect} from 'chai';
import {Actions} from 'client/action/assets';
import middleware from 'client/middleware/assets';
import sinon from 'sinon';

describe('AssetsMiddleware', function() {
    let server = null,
        assets = '[{ "name": "Asset 1", "description": "Asset description", "location": { "latitude": -77.2441, "longitude": 34.5212 } }]',
        response = [
            200,
            {
                'Content-type': 'application/json'
            },
            assets,
        ];

    beforeEach(function() {
        server = sinon.fakeServer.create();
        server.respondWith('GET', '/assets', response);
        server.respondWith('POST', '/assets', response);
    });

    it('makes a get request for assets and handles the response', function() {
        let nextSpy = sinon.spy();

        middleware()(nextSpy)(Actions.getAssets());

        expect(nextSpy.calledWith(JSON.parse(assets)));
    });

    it('makes a post request for assets and handles the response', function() {
        let nextSpy = sinon.spy();

        middleware()(nextSpy)(Actions.createAsset({}));

        expect(nextSpy.calledWith(JSON.parse(assets)));
    });
});
