import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const Title = ({title}) => (
    <Appbar.Header style={style.header}>
       <Appbar.Content color='white' titleStyle={{ fontWeight: 'bold' }} title={title}  />
    </Appbar.Header>
);

const style = StyleSheet.create({
    header: {
        backgroundColor: '#236B8E',
        height:110
    },
})


export default Title;