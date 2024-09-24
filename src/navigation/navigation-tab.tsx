
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { HomeScreen } from '../screens/home/home-screen';
import { ProfileScreen } from '../screens/profile/profile-screen';
import { ComponentListScreen } from '../screens/component-list/component-list';


import { IconComponent } from '../components/icon-custom/icon-component';
import { AntDesign, EntypoIcon } from '../components/icon-custom/icon-component';

const Tab = createBottomTabNavigator();

export const NavigationTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: () => (
                        <IconComponent name="user" color={"grey"} size={25} />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: () => (
                        <IconComponent name="home" color={"grey"} size={35} />
                    ),
                }}

            />
            <Tab.Screen
                name="ComponentList"
                component={ComponentListScreen}
                options={{
                    tabBarLabel: 'Componentes',
                    tabBarIcon: () => (
                        <AntDesign name="setting" color={"grey"} size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}