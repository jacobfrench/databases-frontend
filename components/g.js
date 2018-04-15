import { Dimensions } from 'react-native';
import React, { Component, PropTypes } from 'react';

global.baseIp = 'http://192.168.1.11:8080';
global.dim = { height, width } = Dimensions.get('window');
global.width = dim.width;
global.height = dim.height;

global.colors = {
    background: '#263238',
    lightbutton: '#4CAF50',
    glass: 'rgba(150, 150, 150, 0.3)',
    header: '#ecf0f1'
}

