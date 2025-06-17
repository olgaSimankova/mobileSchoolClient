import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native';
//Я честно долго пыталась сделать через нативный Switch из react-native, он отказывался кастомизироваться для Андроид. Для Ios - пожалуйста...
//потом была попытка заюзать библиотеку react-native-switch, тоже провал.
//Проще всего оказалось сделать его на вьюхах с анимацией ползунка

type SwitchProps = {
    size: 'small' | 'large';
    disabled?: boolean;
    label?: string;
    right?: boolean;
    value: boolean;
    onValueChange?: (value: boolean) => void;
};

const CustomSwitch: React.FC<SwitchProps> = ({
    size,
    disabled = false,
    label,
    right = false,
    value,
    onValueChange,
}) => {
    const [isOn, setIsOn] = useState(value);
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    const toggleSwitch = () => {
        if (disabled) return;
        const newValue = !isOn;

        Animated.timing(animatedValue, {
            toValue: newValue ? 1 : 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        setIsOn(newValue);
        onValueChange?.(newValue);
    };

    const switchSizes = {
        large: { circleSize: 26, trackHeight: 32, trackWidth: 52 },
        small: { circleSize: 16, trackHeight: 20, trackWidth: 32 },
    };

    const { circleSize, trackHeight, trackWidth } = switchSizes[size];

    const thumbColor = disabled ? colors.peak70 : colors.peak;
    const trackColor = disabled ? colors.bottom20 : isOn ? colors.primary : colors.primary20;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
        setIsOn(value);
    }, [value]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [
            (trackHeight - circleSize) / 2,
            trackWidth - circleSize - (trackHeight - circleSize) / 2,
        ],
    });

    return (
        <View style={[styles.container, { flexDirection: right ? 'row' : 'row-reverse' }]}>
            {label && (
                <Text
                    style={[
                        { color: disabled ? colors.bottom40 : colors.bottom },
                        { fontSize: size === 'large' ? 16 : 14 },
                    ]}
                >
                    {label}
                </Text>
            )}
            <TouchableWithoutFeedback onPress={toggleSwitch} disabled={disabled}>
                <View
                    style={[
                        styles.switchContainer,
                        {
                            width: trackWidth,
                            height: trackHeight,
                            borderRadius: trackHeight / 2,
                            backgroundColor: trackColor,
                        },
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.switchCircle,
                            {
                                width: circleSize,
                                height: circleSize,
                                borderRadius: circleSize / 2,
                                backgroundColor: thumbColor,
                                transform: [{ translateX }],
                            },
                        ]}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const colors = {
    primary: '#000078',
    primary20: '#1A337333',
    bottom: '#152149',
    bottom20: '#15214933',
    bottom40: '#15214966',
    peak: '#FFFFFF',
    peak70: '#FFFFFFB2',
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 12,
    },
    switchContainer: {
        justifyContent: 'center',
    },
    switchCircle: {
        // elevation: 2,
    },
});

export default CustomSwitch;
