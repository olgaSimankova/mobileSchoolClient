import {
    Animated,
    GestureResponderEvent,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
} from 'react-native';
import { Colors, Fonts, Radius } from '../tokens';

export function Button({ text, ...props }: PressableProps & { text: string }) {
    const animatedValue = new Animated.Value(100);
    const color = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [Colors.primaryHover, Colors.primary],
    });

    const fadeIn = (event: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
        }).start();

        props.onPressIn && props.onPressIn(event);
    };

    const fadeOut = (event: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 100,
            duration: 100,
            useNativeDriver: false,
        }).start();

        props.onPressOut && props.onPressOut(event);
    };

    return (
        <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
            <Animated.View
                style={{
                    ...styles.button,
                    backgroundColor: color,
                }}
            >
                <Text style={styles.text}>{text}</Text>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Radius.r10,
        height: 58,
    },
    text: {
        color: Colors.white,
        fontSize: Fonts.f18,
        fontFamily: 'FiraSans',
    },
});
