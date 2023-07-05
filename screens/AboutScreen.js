import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: 'https://www.vaniercollege.qc.ca/wp-content/themes/vaniermain/images/logo.png' }}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.about}>
                Hi, we are team of 2 <Text style={{fontWeight: 'bold'}}>Agrim & Vipul</Text>
                {'\n\n'}Currently we are studying Software Development at <Text style={{fontWeight: 'bold'}}>Vanier College, Montreal</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    logo: {
        backgroundColor: 'red',
        width: 200,
        height: 60,
    },
    about: {
        fontSize: 18,
        marginVertical: 10,
    }
})
export default AboutScreen;