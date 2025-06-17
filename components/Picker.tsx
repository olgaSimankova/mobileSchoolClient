import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated, Easing } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SelectboxProps {
    size: 68 | 52 | 44 | 40 | 32;
    options: { label: string; value: string }[];
    selectedValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    label?: string;
}

const Selectbox: React.FC<SelectboxProps> = ({
    size,
    options,
    selectedValue,
    onValueChange,
    placeholder = 'Select an option',
    disabled = false,
    error = false,
    label,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const colors = {
        primary5: '#1A33730D', // default background
        primary10: '#1A33731A', // default border / border disabled
        peak: '#FFFFFF', // focus background
        secondary70: '#184DE5B2', // focus border
        bottom10: '#1521491A', // background disabled
        error: '#FF0239', // border error
        error5: '#FF02390D', // background error
    };

    const togglePicker = () => {
        if (disabled) return;

        const toValue = isOpen ? 0 : 1;
        setIsOpen(!isOpen);

        Animated.timing(rotateAnim, {
            toValue,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const getContainerStyle = () => {
        let style = {
            ...styles.container,
            height: size,
            backgroundColor: colors.primary5,
            borderColor: colors.primary10,
        };

        if (isFocused) {
            style.backgroundColor = colors.peak;
            style.borderColor = colors.secondary70;
        }

        if (disabled) {
            style.backgroundColor = colors.bottom10;
            style.borderColor = colors.primary10;
        }

        if (error) {
            style.backgroundColor = colors.error5;
            style.borderColor = colors.error;
        }

        return style;
    };

    const renderLabelInside = size === 68 || size === 52;

    return (
        <View style={styles.wrapper}>
            {!renderLabelInside && label && <Text style={styles.externalLabel}>{label}</Text>}

            <TouchableOpacity
                activeOpacity={1}
                style={getContainerStyle()}
                onPress={togglePicker}
                disabled={disabled}
                onPressIn={() => setIsFocused(true)}
                onPressOut={() => setIsFocused(false)}
            >
                {renderLabelInside && label && (
                    <Text style={[styles.label, { fontSize: size === 68 ? 12 : 10 }]}>{label}</Text>
                )}

                <View style={styles.valueContainer}>
                    <Text
                        style={[
                            styles.valueText,
                            !selectedValue && styles.placeholderText,
                            { fontSize: size === 68 ? 16 : size === 52 ? 14 : 12 },
                        ]}
                        numberOfLines={1}
                    >
                        {selectedValue
                            ? options.find((opt) => opt.value === selectedValue)?.label
                            : placeholder}
                    </Text>

                    <Animated.View style={{ transform: [{ rotate }] }}>
                        <Text style={styles.arrow}>▼</Text>
                    </Animated.View>
                </View>
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue) => {
                            if (onValueChange) onValueChange(itemValue);
                            togglePicker();
                        }}
                        style={styles.picker}
                        mode="dropdown"
                    >
                        {placeholder && (
                            <Picker.Item label={placeholder} value={null} enabled={false} />
                        )}
                        {options.map((option) => (
                            <Picker.Item
                                key={option.value}
                                label={option.label}
                                value={option.value}
                            />
                        ))}
                    </Picker>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: 250,
        marginBottom: 16,
    },
    container: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    label: {
        color: '#1A3373',
        marginBottom: 4,
    },
    externalLabel: {
        color: '#1A3373',
        fontSize: 12,
        marginBottom: 4,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    valueText: {
        color: '#1A3373',
        flex: 1,
    },
    placeholderText: {
        color: '#1A337380',
    },
    arrow: {
        color: '#1A3373',
        fontSize: 12,
        marginLeft: 8,
    },
    pickerContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#1A33731A',
        borderRadius: 4,
        marginTop: 4,
        zIndex: 10,
        elevation: Platform.OS === 'android' ? 50 : 0,
    },
    picker: {
        width: '100%',
    },
});

export default Selectbox;
