import React, { useRef } from 'react';
import {
    Animated,
    GestureResponderEvent,
    NativeSyntheticEvent,
    Pressable,
    PressableProps,
    StyleSheet,
    TargetedEvent,
    Text,
    ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type HoverEvent = GestureResponderEvent | React.MouseEvent;

type StyledButtonProps = PressableProps & {
    text?: string;
    size: 'default' | 'large' | 'small';
    type?: 'primary' | 'secondary' | 'outline' | 'ghost';
    onlyIcon?: boolean;
    onHoverIn?: (event: HoverEvent) => void;
    onHoverOut?: (event: HoverEvent) => void;
};

const StyledButton: React.FC<StyledButtonProps> = ({
    text,
    size,
    type = 'primary',
    onlyIcon,
    ...props
}) => {
    // const animatedValue = new Animated.Value(100);
    // const color = animatedValue.interpolate({
    //   inputRange: [0, 100],
    //   outputRange: [colors.primaryHover, colors.primary],
    // });

    // const fadeIn = (event: GestureResponderEvent) => {
    //   Animated.timing(animatedValue, {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: false,
    //   }).start();

    //   props.onPressIn && props.onPressIn(event);
    // };

    // const fadeOut = (event: GestureResponderEvent) => {
    //   Animated.timing(animatedValue, {
    //     toValue: 100,
    //     duration: 300,
    //     useNativeDriver: false,
    //   }).start();

    //   props.onPressOut && props.onPressOut(event);
    // };

    const colorAnim = new Animated.Value(0);

    const handlePressIn = (event: GestureResponderEvent) => {
        Animated.timing(colorAnim, {
            toValue: 2, // pressed state
            duration: 150,
            useNativeDriver: false,
        }).start();

        props.onPressIn && props.onPressIn(event);
    };

    const handlePressOut = (event: GestureResponderEvent) => {
        Animated.timing(colorAnim, {
            toValue: 0, // default state
            duration: 200,
            useNativeDriver: false,
        }).start();

        props.onPressOut && props.onPressOut(event);
    };

    const handleHoverIn = () => {
        Animated.timing(colorAnim, {
            toValue: 1, // hover state
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleHoverOut = () => {
        Animated.timing(colorAnim, {
            toValue: 0, // default state
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const color = colorAnim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [colors.primary, colors.primaryHover, colors.bottom],
    });

    const getPadding = (): { horizontal: number } => {
        const basePaddings = {
            small: { onlyIcon: 6, withText: 12 },
            default: { onlyIcon: 12, withText: 24 },
            large: { onlyIcon: 16, withText: 32 },
        };

        return onlyIcon
            ? { horizontal: basePaddings[size].onlyIcon }
            : { horizontal: basePaddings[size].withText };
    };

    const { horizontal: padding } = getPadding();

    return (
        <Pressable
            {...props}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onHoverIn={handleHoverIn}
            onHoverOut={handleHoverOut}
        >
            <Animated.View
                style={
                    [
                        { backgroundColor: color },
                        { paddingHorizontal: padding },
                        styles.button,
                        styles.buttonContainer,
                        size === 'small' && styles.small,
                        size === 'default' && styles.default,
                        size === 'large' && styles.large,
                    ].filter(Boolean) as ViewStyle[]
                }
            >
                <Ionicons name="add" size={32} color={colors.peak}></Ionicons>

                {!onlyIcon && text && <Text style={styles.text}>{text}</Text>}
            </Animated.View>
        </Pressable>
    );
};

const colors = {
    primary: '#000078',
    primaryHover: '#184DE5',
    bottom: '#152149',
    grey: '#1521491A',
    peak: '#FFFFFF',
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderRadius: 4,
        flex: 0,
    },
    text: {
        color: colors.peak,
        fontSize: 20,
        textAlign: 'center',
    },
    //sizes
    small: {
        paddingVertical: 6,
    },
    default: {
        paddingVertical: 10,
    },
    large: {
        paddingVertical: 16,
    },
    //types
});

export default StyledButton;
