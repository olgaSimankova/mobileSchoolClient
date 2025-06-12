import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomLink from '../shared/CustomLink/CustomLink';
import { Colors, Fonts, Gaps } from '../shared/tokens';

export default function UnmatchedCustom() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/unmatched.png')}
                    resizeMode="contain"
                />
                <Text style={styles.text}>
                    Ооо... что-то пошло не так. Попробуйте вернуться на главный экран приложения
                </Text>
                <CustomLink href={'/'} text="На главный экран" />{' '}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 204,
        height: 282,
    },
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
    text: {
        color: Colors.white,
        fontSize: Fonts.f18,
        fontFamily: Fonts.regular,
        textAlign: 'center',
    },
});
