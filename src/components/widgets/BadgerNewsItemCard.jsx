import { Pressable, View } from "react-native";
import styles from "../Styles";

function BadgerNewsItemCard(props) {
    return <Pressable onPress={props.onPress}>
        <View style={[styles.card, props.style]}>
            {props.children}
        </View>
    </Pressable>;
}

export default BadgerNewsItemCard;