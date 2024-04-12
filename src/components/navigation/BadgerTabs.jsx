import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BadgerNewsScreen from '../screens/BadgerNewsScreen';
import BadgerPreferenceScreen from '../screens/BadgerPreferencesScreen';
import { Ionicons } from '@expo/vector-icons';
import CS571 from '@cs571/mobile-client';
import { useState, useEffect, useContext } from 'react';
import BadgerPrefContext from '../../../contexts/BadgerPrefContext';

function BadgerTabs(props) {
    const NewsTabs = createBottomTabNavigator();
    const [newsList, setNewsList] = useState([]);
    const [prefs, setPrefs] = useContext(BadgerPrefContext);

    useEffect(() => {
        fetchNewsList();
    }, []);

    async function fetchNewsList() {
        const newsList = await fetch("https://cs571.org/api/f23/hw8/articles", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        }).then(async res => {
            const json = await res.json();
            if (res.status === 200) {
                return json;
            }
            throw new Error(json.msg);
        }).catch(err => {
            alert(err.message);
        });
        if (newsList === undefined || newsList === null) {
            setNewsList([]);
            return;
        }
        setNewsList(newsList);
        let tags = [];
        for (const news of newsList) {
            for (let tag of news.tags) {
                if (tags.includes(tag)) {
                    continue;
                }
                tags.push(tag);
            }
        }
        let newPrefs = {...prefs};
        for (const tag of tags) {
            if (prefs[tag] !== undefined && prefs[tag] !== null) {
                continue;
            }
            newPrefs[tag] = true;
        }
        setPrefs(newPrefs);
    }

    return <NewsTabs.Navigator screenOptions={{
        tabBarActiveTintColor: 'red',
    }}>
        <NewsTabs.Screen
            name="News"
            options={{
                headerShown: false,
                tabBarLabel: 'News',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="newspaper" color={color} size={size} />
                ),
            }}>
            {(props) => <BadgerNewsScreen newsList={newsList} />}
        </NewsTabs.Screen>
        <NewsTabs.Screen
            name="Preference"
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings-outline" color={color} size={size} />
                ),
            }}
        >
            {(_) => <BadgerPreferenceScreen setPrefs={props.setPrefs} />}
        </NewsTabs.Screen>
    </NewsTabs.Navigator>;
}

export default BadgerTabs;