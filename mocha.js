const chai = require('chai');
const {configure} = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const chaiEnzyme = require('chai-enzyme');
const jsdom = require('jsdom');

const virtualConsole = new jsdom.VirtualConsole().sendTo(console);

configure({
    adapter: new Adapter(),
});

new jsdom.JSDOM('<!doctype html><html><body></body></html>', {
    url: 'https://localhost/',
    beforeParse(window) {
        global.document = window.document;
        global.window = window;
    },
    virtualConsole
});

Object.keys(global.window).forEach((key) => {
    if (!(key in global)) {
        global[key] = global.window[key];
    }
});

chai.use(chaiEnzyme());
