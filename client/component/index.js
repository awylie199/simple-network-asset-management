import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components';
import Home from 'client/container/home';
import theme from 'client/theme';

export default class Container extends Component {
    render() {
        return (
            <ThemeProvider theme={theme} style={{height: '100%'}}>
                <Home />
            </ThemeProvider>
        );
    }
}
