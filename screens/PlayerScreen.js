import React from 'react';
import { Text } from 'react-native';

export default PlayerScreen = ({route}) => {
    return (
        <Text>This is player Screen and track id is {route.params.id}</Text>
    )
}