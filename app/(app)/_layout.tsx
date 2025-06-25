import { Redirect } from 'expo-router';
import { useAtomValue } from 'jotai';
import { authAtom } from '../../entities/auth/model/auth.state';
import { Drawer } from 'expo-router/drawer';
import { Colors, Fonts } from '../../shared/tokens';
import { MenuButton } from '../../features/layout/ui/menuButton/MenuButton';
import { CustomDrawer } from '../../entities/layout/ui/CustomDrawer/customDrawer';

export default function RootLayout() {
    const { access_token } = useAtomValue(authAtom);
    if (!access_token) return <Redirect href={'/login'} />;

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: Colors.grayDark,
                    shadowColor: Colors.grayDark,
                    shadowOpacity: 0,
                },
                sceneStyle: {
                    backgroundColor: Colors.black,
                },
                headerLeft: () => {
                    return <MenuButton navigation={navigation} />;
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: Colors.white,
                    fontFamily: 'FiraSans',
                    fontSize: Fonts.f20,
                },
                drawerContentStyle: {
                    backgroundColor: Colors.black,
                },
            })}
        >
            <Drawer.Screen
                name="index"
                options={{
                    title: 'Мои курсы',
                }}
            />
        </Drawer>
    );
}
