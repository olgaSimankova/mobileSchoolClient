import { Image, StyleSheet, Text, View } from 'react-native';
import { Input } from '../shared/Input/Input';
import { Colors, Gaps } from '../shared/tokens';
import { Button } from '../shared/Button/Button';
import { useEffect, useState } from 'react';
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification';
import CustomLink from '../shared/CustomLink/CustomLink';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';
import { router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import CustomSwitch from '../components/CustomSwitch';
import SwitchGroup from '../components/SwitchGroup';
import Selectbox from '../components/CustomSelectbox';
// import CustomButton from '../components/CustomButton';

export default function Login() {
    const [localEerror, setLocalError] = useState<string | undefined>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [{ access_token, isLoading, error }, login] = useAtom(loginAtom);

    const submit = () => {
        if (!email) {
            setLocalError('Не введен email');
            return;
        }
        if (!password) {
            setLocalError('Не введен password');
            return;
        }
        login({ email, password });
    };

    useEffect(() => {
        if (error) setLocalError(error);
    }, [error]);

    useEffect(() => {
        if (access_token) {
            router.replace('/(app');
        }
    }, []);

    const [selectedValue, setSelectedValue] = useState<string | null>(null);

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
                    <Input placeholder="Email" onChangeText={setEmail} />
                    <Input isPassword placeholder="Password" onChangeText={setPassword} />
                    <Button text="Войти" isLoading={isLoading} onPress={submit} />
                </View>
                <View style={styles.gap}>
                    <Selectbox
                        size={44}
                        label="Your Label"
                        disabled={false}
                        error={true}
                        options={[
                            { label: 'Option 1', value: '1' },
                            { label: 'Option 2', value: '2' },
                            { label: 'Option 3', value: '3' },
                            { label: 'Option 4', value: '4' },
                        ]}
                        selectedValue={selectedValue}
                        onValueChange={(value) => setSelectedValue(value)}
                        placeholder="Выберите что-нибудь"
                    />
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
        width: 350,
        height: 250,
        gap: 10,
        padding: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
