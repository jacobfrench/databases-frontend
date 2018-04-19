import { Dimensions } from 'react-native';
import React, { Component, PropTypes } from 'react';

global.baseIp = 'http://45.33.47.16:8080';
global.dim = { height, width } = Dimensions.get('window');
global.width = dim.width;
global.height = dim.height;

global.colors = {
    background: '#1976D2',
    lightbutton: '#4CAF50',
    glass: 'rgba(255, 255, 255, 0.3)',
    header: '#2962FF'
}

