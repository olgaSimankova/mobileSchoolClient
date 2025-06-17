import React from 'react';
import {
    Animated,
    StyleSheet,
    GestureResponderEvent,
    Pressable,
    PressableProps,
} from 'react-native';

type ServiceButtonProps = PressableProps & {
    small?: boolean;
    light?: boolean;
    onPress?: () => void;
};

const ServiceButton: React.FC<ServiceButtonProps> = ({
    small = false,
    light = false,
    onPress,
    ...props
}) => {
    const size = small
        ? { radius: 12, fontSize: 9, border: 1.2 }
        : { radius: 15, fontSize: 11, border: 1.5 };

    const baseColor = light ? colors.bottom30 : colors.bottomClam;

    const animatedValue = new Animated.Value(100);

    const animatedColor = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [colors.bottom, baseColor],
    });

    const fadeIn = (event: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
        props.onPressIn && props.onPressIn(event);
    };

    const fadeOut = (event: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 100,
            duration: 100,
            useNativeDriver: true,
        }).start();
        props.onPressOut && props.onPressOut(event);
    };

    return (
        <Pressable onPress={onPress} onPressIn={fadeIn} onPressOut={fadeOut}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        width: size.radius,
                        height: size.radius,
                        borderRadius: size.radius / 2,
                        borderWidth: size.border,
                        borderColor: animatedColor,
                    },
                ]}
            >
                <Animated.Text
                    style={[
                        styles.text,
                        {
                            color: animatedColor,
                            fontSize: size.fontSize,
                        },
                    ]}
                >
                    ?
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
};

const colors = {
    bottom: '#152149',
    bottom30: '#1521494D',
    bottomClam: '#6885AB',
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
});

export default ServiceButton;
