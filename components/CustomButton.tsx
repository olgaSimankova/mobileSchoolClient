import React, { useRef, useState } from 'react';
import {
    View,
    Pressable,
    Text,
    StyleSheet,
    Platform,
    GestureResponderEvent,
    Animated,
    PressableProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ButtonType = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'default' | 'large';

type CustomButtonProps = PressableProps & {
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    text?: string;
    onlyIcon?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
};

const colors = {
    primary: '#000078',
    bottom: '#152149',
    grey: '#1521491A',
    peak: '#FFFFFF',
    secondary5: '#184DE50D',
    secondary30: '#184DE54D',
};

const CustomButton: React.FC<CustomButtonProps> = ({
    type = 'primary',
    size = 'default',
    disabled = false,
    text,
    onlyIcon = false,
    onPress,
    ...props
}) => {
    const [isPressed, setIsPressed] = useState(false);
    const animatedValue = useRef(new Animated.Value(100)).current;

    const getButtonStyles = () => {
        if (disabled) {
            return {
                bgColor: colors.bottom,
                textColor: colors.bottom,
                borderColor: 'transparent',
                bgOpacity: 0.1,
                contentOpacity: 0.4,
            };
        }

        const baseStyles = {
            primary: {
                bg: colors.primary,
                text: colors.peak,
                border: 'transparent',
            },
            secondary: {
                bg: colors.secondary5,
                text: isPressed ? colors.peak : colors.bottom,
                border: 'transparent',
            },
            outline: {
                bg: 'transparent',
                text: isPressed ? colors.peak : colors.bottom,
                border: colors.secondary30,
            },
            ghost: {
                bg: 'transparent',
                text: isPressed ? colors.peak : colors.bottom,
                border: 'transparent',
            },
        }[type];

        return {
            bgColor: baseStyles.bg,
            textColor: baseStyles.text,
            borderColor: baseStyles.border,
            bgOpacity: 1,
            contentOpacity: 1,
        };
    };

    const { bgColor, textColor, borderColor, bgOpacity, contentOpacity } = getButtonStyles();

    const getPadding = (): { horizontal: number; vertical: number } => {
        const basePaddings = {
            small: {
                onlyIcon: { horizontal: 6, vertical: 6 },
                withText: { horizontal: 12, vertical: 6 },
            },
            default: {
                onlyIcon: { horizontal: 10, vertical: 10 },
                withText: { horizontal: 24, vertical: 10 },
            },
            large: {
                onlyIcon: { horizontal: 16, vertical: 16 },
                withText: { horizontal: 32, vertical: 16 },
            },
        };

        return onlyIcon ? basePaddings[size].onlyIcon : basePaddings[size].withText;
    };

    const padding = getPadding();

    const animatedBgColor = disabled
        ? bgColor
        : animatedValue.interpolate({
              inputRange: [0, 100],
              outputRange: [colors.bottom, bgColor],
          });

    const fadeIn = (event: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setIsPressed(true);
        props.onPressIn && props.onPressIn(event);
    };

    const fadeOut = (event: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setIsPressed(false);
        props.onPressOut && props.onPressOut(event);
    };

    return (
        <View style={[styles.wrapper]}>
            <Animated.View
                style={[
                    styles.background,
                    {
                        backgroundColor: animatedBgColor,
                        borderColor,
                        opacity: bgOpacity,
                        paddingHorizontal: padding.horizontal,
                        paddingVertical: padding.vertical,
                    },
                ]}
            />
            <Pressable
                accessibilityRole="button"
                accessibilityHint={type === 'primary' ? 'Основное действие' : undefined}
                accessibilityState={{ disabled }}
                disabled={disabled}
                style={[
                    styles.content,
                    {
                        paddingHorizontal: padding.horizontal,
                        paddingVertical: padding.vertical,
                        gap: size === 'small' ? 8 : 12,
                        borderWidth: type === 'outline' ? 1 : 0,
                        borderColor,
                    },
                ]}
                onPress={onPress}
                onPressIn={fadeIn}
                onPressOut={fadeOut}
            >
                <Ionicons
                    name="add"
                    size={22}
                    color={textColor}
                    style={{ opacity: disabled ? contentOpacity : 1 }}
                />

                {!onlyIcon && (
                    <Text
                        style={[
                            styles.text,
                            {
                                color: textColor,
                                opacity: disabled ? contentOpacity : 1,
                            },
                        ]}
                    >
                        {text}
                    </Text>
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        // borderRadius: 4,
        overflow: 'hidden',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    text: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
    },
});

export default CustomButton;
