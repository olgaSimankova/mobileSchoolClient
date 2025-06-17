import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Animated,
    Easing,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SelectboxProps {
    size: 68 | 52 | 44 | 40 | 32;
    options: { label: string; value: string }[];
    selectedValue?: string | null;
    onValueChange?: (value: string | null) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    label?: string;
}

const colors = {
    primary5: '#1A33730D',
    primary10: '#1A33731A',
    primary: '#1A3373',
    peak: '#FFFFFF',
    secondary70: '#184DE5B2',
    bottom: '#152149',
    bottom10: '#1521491A',
    bottom66: '#152149A8',
    error: '#FF0239',
    error5: '#FF02390D',
    modalShadow: '#00000080',
};

const CustomSelectbox: React.FC<SelectboxProps> = ({
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

    const rotateAnimation = useRef(new Animated.Value(0)).current;

    const togglePicker = () => {
        if (disabled) return;

        const toValue = isOpen ? 0 : 1;
        setIsOpen(!isOpen);

        Animated.timing(rotateAnimation, {
            toValue,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    const handleSelect = (value: string) => {
        if (onValueChange) {
            onValueChange(value);
        }
        togglePicker();
    };

    const rotate = rotateAnimation.interpolate({
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

    const isLabelInside = size === 68 || size === 52;

    const optionFontSize = {
        68: 16,
        52: 14,
        44: 16,
        40: 14,
        32: 14,
    }[size];

    const renderPicker = () => {
        if (Platform.OS === 'ios') {
            return (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={handleSelect}
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
                                style={[{ fontSize: optionFontSize }]}
                            />
                        ))}
                    </Picker>
                </View>
            );
        } else {
            return (
                <Modal
                    visible={isOpen}
                    transparent
                    animationType="fade"
                    onRequestClose={togglePicker}
                >
                    <TouchableWithoutFeedback onPress={togglePicker}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.optionItem}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text style={[styles.optionText, { fontSize: optionFontSize }]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.optionSeparator} />}
                            style={styles.optionsList}
                        />
                    </View>
                </Modal>
            );
        }
    };

    return (
        <View style={styles.wrapper}>
            {!isLabelInside && label && <Text style={styles.externalLabel}>{label}</Text>}

            <TouchableOpacity
                activeOpacity={1}
                style={getContainerStyle()}
                onPress={togglePicker}
                disabled={disabled}
                onPressIn={() => setIsFocused(true)}
                onPressOut={() => setIsFocused(false)}
            >
                {isLabelInside && label && (
                    <Text style={[styles.label, { fontSize: optionFontSize }]}>{label}</Text>
                )}

                <View style={styles.valueContainer}>
                    <Text
                        style={[
                            styles.valueText,
                            !selectedValue && styles.placeholderText,
                            { fontSize: optionFontSize },
                        ]}
                    >
                        {selectedValue
                            ? options.find((option) => option.value === selectedValue)?.label
                            : placeholder}
                    </Text>

                    <Animated.View style={[styles.arrowContainer, { transform: [{ rotate }] }]}>
                        <View style={styles.arrow} />
                    </Animated.View>
                </View>
            </TouchableOpacity>

            {isOpen && renderPicker()}
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
        color: colors.bottom66,
        marginBottom: 4,
    },
    externalLabel: {
        color: colors.bottom66,
        fontSize: 12,
        marginBottom: 4,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    valueText: {
        flex: 1,
    },
    placeholderText: {
        color: colors.bottom,
    },
    arrowContainer: {
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    arrow: {
        width: 6,
        height: 6,
        borderRightWidth: 1.5,
        borderBottomWidth: 1.5,
        borderColor: colors.bottom,
        transform: [{ rotate: '45deg' }],
    },
    pickerContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: colors.peak,
        borderWidth: 1,
        borderColor: colors.primary10,
        borderRadius: 4,
        marginTop: 4,
        zIndex: 10,
        elevation: Platform.OS === 'android' ? 50 : 0,
    },
    picker: {
        width: '100%',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.modalShadow,
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.peak,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingVertical: 8,
        maxHeight: '50%',
    },
    optionsList: {
        width: '100%',
    },
    optionItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    optionText: {
        color: colors.bottom,
    },
    optionSeparator: {
        height: 1,
        backgroundColor: colors.primary10,
        marginHorizontal: 8,
    },
});

export default CustomSelectbox;
