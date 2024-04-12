import { useContext } from "react";
import { Text, View, ScrollView, Switch } from "react-native";
import BadgerNewsItemCard from "../widgets/BadgerNewsItemCard";
import BadgerPrefContext from "../../../contexts/BadgerPrefContext";

function BadgerPreferencesScreen(props) {
    const [prefs, setPrefs] = useContext(BadgerPrefContext);

    function toggle(key, isOn) {
        const newPrefs = { ...prefs };
        newPrefs[key] = isOn;
        setPrefs(newPrefs);
    }

    return <View>
        <ScrollView>
            {
                Object.keys(prefs).map((prefKey) => {
                    return <BadgerNewsItemCard
                        key={prefKey}
                        style={[{
                            margin: 20,
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }, props.style]}>
                        <Text>{prefKey}</Text>
                        <Switch
                            value={prefs[prefKey]}
                            onValueChange={(isOn) => toggle(prefKey, isOn)} />
                    </BadgerNewsItemCard>;
                })
            }
        </ScrollView>
    </View>;
}

export default BadgerPreferencesScreen;