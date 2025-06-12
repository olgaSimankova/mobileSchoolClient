import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Colors, Fonts, Radius } from '../tokens';
import { useState } from 'react';
import EyeOpenIcon from '../../assets/icons/eye-open';
import EyeClosedIcon from '../../assets/icons/eye-closed';

export function Input({ isPassword, ...props }: TextInputProps & { isPassword?: boolean }) {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    return (
        <View>
            <TextInput
                style={styles.input}
                secureTextEntry={isPasswordHidden}
                placeholderTextColor={Colors.gray}
                {...props}
            />
            {isPassword && (
                <Pressable
                    style={styles.eyeIcon}
                    onPress={() => setIsPasswordHidden((state) => !state)}
                >
                    {isPasswordHidden ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 58,
        backgroundColor: Colors.violetDark,
        paddingHorizontal: 24,
        borderRadius: Radius.r10,
        fontSize: Fonts.f16,
        color: Colors.gray,
        fontFamily: 'FiraSans',
    },
    eyeIcon: {
        position: 'absolute',
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
});
