import { useContext } from "react";
import { Text, ScrollView, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BadgerNewsItemCard from "../widgets/BadgerNewsItemCard";
import BadgerNewsArticleScreen from "./BadgerNewsArticleScreen";
import BadgerPrefContext from "../../../contexts/BadgerPrefContext";

function BadgerNewsScreen(props) {
    const newsList = props.newsList;
    const NewsStack = createNativeStackNavigator();
    const navigation = useNavigation();
    const [prefs, setPrefs] = useContext(BadgerPrefContext);

    function onPressNewsItemCard(articleId) {
        navigation.navigate("Article", articleId);
    }

    const displayNewsList = [];
    for (const news of newsList) {
        let display = true;
        for (const tag of news.tags) {
            if (!prefs[tag]) {
                display = false;
                break;
            }
        }
        if (!display) {
            continue;
        }
        displayNewsList.push(news);
    }

    return <NewsStack.Navigator>
        <NewsStack.Screen
            name="NewsList"
            options={{ title: 'Articles' }}>
            {(props) => {
                return <ScrollView>
                    {
                        displayNewsList.map((news) => {
                            return <BadgerNewsItemCard
                                key={news.id}
                                onPress={() => onPressNewsItemCard(news.fullArticleId)}
                                style={{
                                    marginLeft: 16,
                                    marginRight: 16,
                                    marginTop: 8,
                                    marginBottom: 8,
                                }}>
                                <>
                                    <Image style={{
                                        width: "100%",
                                        height: 200,
                                        resizeMode: "cover",
                                        marginBottom: 8,
                                    }} source={{
                                        uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${news.img}`,
                                    }} />
                                    <Text
                                        style={{
                                            fontWeight: "400",
                                            fontSize: 18,
                                        }}>
                                        {news.title}
                                    </Text>
                                </>
                            </BadgerNewsItemCard>;
                        })
                    }
                </ScrollView>;
            }}
        </NewsStack.Screen>
        <NewsStack.Screen
            name="Article"
            component={BadgerNewsArticleScreen} />
    </NewsStack.Navigator>
}

export default BadgerNewsScreen;