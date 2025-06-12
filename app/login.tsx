import { Image, StyleSheet, Text, View } from 'react-native';
import StyledButton from '../components/StyledButton';
import { Input } from '../shared/Input/Input';
import { Colors, Gaps } from '../shared/tokens';
import { Button } from '../shared/Button/Button';
import { useState } from 'react';
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification';
import CustomLink from '../shared/CustomLink/CustomLink';

export default function Login() {
    const [error, setError] = useState<string | undefined>();
    const alert = () => {
        setError('Неверный логин и пароль');
        setTimeout(() => {
            setError(undefined);
        }, 4000);
    };

    return (
        <View style={styles.container}>
            <ErrorNotification error={error} />
            <View style={styles.content}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                    resizeMode="contain"
                />
                <View style={styles.form}>
                    <Input placeholder="Email" />
                    <Input isPassword placeholder="Password" />
                    <Button text="Войти" onPress={alert} />
                </View>

                <CustomLink href={'/restore'} text="Восстановить пароль" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 55,
        flex: 1,
        backgroundColor: Colors.black,
    },
    content: {
        alignItems: 'center',
        gap: Gaps.g50,
    },
    form: {
        alignSelf: 'stretch',
        gap: Gaps.g16,
    },
    logo: {
        width: 220,
    },
    gap: {
        gap: 10,
        padding: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
