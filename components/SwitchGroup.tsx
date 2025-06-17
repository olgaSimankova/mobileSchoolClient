import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomSwitch from './CustomSwitch';

interface SwitchGroupProps {
    items: {
        label: string;
        initialValue?: boolean;
    }[];
    right?: boolean;
    size?: 'small' | 'large';
    disabled?: boolean;
    onChange?: (values: boolean[]) => void;
}

const SwitchGroup: React.FC<SwitchGroupProps> = ({
    items,
    size = 'large',
    disabled = false,
    right = true,
    onChange,
}) => {
    const [values, setValues] = useState<boolean[]>(
        items.map((item) => item.initialValue || false),
    );

    const handleSwitchChange = (index: number, value: boolean) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);
        onChange?.(newValues);
    };

    return (
        <View style={styles.container}>
            {items.map((item, index) => (
                <CustomSwitch
                    key={`switch-${index}`}
                    size={size}
                    disabled={disabled}
                    right={right}
                    label={item.label}
                    value={values[index]}
                    onValueChange={(v) => handleSwitchChange(index, v)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        gap: 16,
    },
});

export default SwitchGroup;
