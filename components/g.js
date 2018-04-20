import { Dimensions } from 'react-native';
import React, { Component, PropTypes } from 'react';


global.baseIp = 'http://45.33.47.16:8080'; //linode server
// global.baseIp = 'http://136.168.58.116:8080'; //csub ip



global.dim = { height, width } = Dimensions.get('window');
global.width = dim.width;
global.height = dim.height;

global.colors = {
    background: '#bdc3c7',
    lightbutton: '#4CAF50',
    glass: 'rgba(255, 255, 255, 0.3)',
    header: '#2980b9',
    primary: '#2980b9'
}

