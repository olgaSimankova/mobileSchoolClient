import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const colors = {
    bottom50: '#15214980',
    bottom30: '#1521494D',
    secondary: '#184DE5',
    surfaceSecondary: '#007AFF0D',
    gray: '#E8E8E8',
};

const VerticalIconsContainer = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer}>
                <MaterialIcons name="search" size={20} color={colors.bottom30} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleFlag}>
                <View style={styles.flagContainer}>
                    <View style={[styles.flagStripe, styles.flagWhite]} />
                    <View style={[styles.flagStripe, styles.flagBlue]} />
                    <View style={[styles.flagStripe, styles.flagRed]} />
                </View>
            </TouchableOpacity>
            {/* Нарисовала флаг вручную, но можно использовать готовые библиотеки с иконками */}

            <TouchableOpacity style={[styles.counterContainer]}>
                <View style={styles.counterBackground}>
                    <Text style={styles.counterText}>9</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textContainer}>
                <Text style={styles.text}>до</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        height: 180,
    },
    iconContainer: {
        padding: 8,
    },
    circleFlag: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray,
        overflow: 'hidden',
    },
    flagContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    flagStripe: {
        flex: 1,
        width: '100%',
    },
    flagWhite: {
        backgroundColor: 'white',
    },
    flagBlue: {
        backgroundColor: '#0057B8',
    },
    flagRed: {
        backgroundColor: '#E52B50',
    },
    counterContainer: {
        padding: 8,
    },
    counterBackground: {
        width: 20,
        height: 20,
        backgroundColor: colors.surfaceSecondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    counterText: {
        color: colors.secondary,
        fontSize: 10,
        fontWeight: 'bold',
    },
    textContainer: {
        width: 20,
        height: 20,
    },
    text: {
        color: colors.bottom50,
        fontSize: 14,
        fontWeight: 500,
    },
});

export default VerticalIconsContainer;
