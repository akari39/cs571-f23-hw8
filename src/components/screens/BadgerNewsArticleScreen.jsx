import { useEffect, useRef, useState } from "react";
import { Animated, View, Image, Text, Pressable, Linking } from "react-native";
import CS571 from '@cs571/mobile-client';

function BadgerNewsArticleScreen(props) {
    const [article, setArticle] = useState(null);
    const opVal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const articleId = props.route.params;
        if (articleId === undefined) {
            return;
        }
        fetchArticle(articleId);
    }, []);

    useEffect(() => {
        Animated.timing(opVal,
            {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
            }).start();
    }, [article]);

    async function fetchArticle(articleId) {
        const article = await fetch(`https://cs571.org/api/f23/hw8/article?id=${articleId}`, {
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
        if (article === undefined || article === null) {
            setArticle(null);
            return;
        }
        setArticle(article);
    }

    if (article === null || article === undefined) {
        return <View style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
        }}>
            <Text style={{
                fontSize: 18,
            }}>
                The content is loading!
            </Text>
        </View>;
    }

    return <>
        <Animated.ScrollView style={{
            opacity: opVal
        }}>
            <Image
                style={{
                    width: "100%",
                    height: 250,
                    marginBottom: 12,
                }}
                source={{ uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${article.img}` }} />
            <Text
                style={{
                    fontWeight: "400",
                    fontSize: 24,
                    marginBottom: 12,
                    marginHorizontal: 12,
                }}>
                {article.title}
            </Text>
            <Text
                style={{
                    fontSize: 18,
                    marginBottom: 12,
                    marginHorizontal: 12,
                }}>
                by {article.author} on {article.posted}
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    marginHorizontal: 12,
                }}>
                {article.body}
            </Text>
            <Pressable style={{
                marginVertical: 12,
            }} onPress={() => {
                Linking.openURL(article.url);
            }}>
                <Text
                    style={{
                        fontSize: 16,
                        marginHorizontal: 12,
                        color: "red"
                    }}>
                    Read full article here
                </Text>
            </Pressable>

        </Animated.ScrollView>
    </>;
}

export default BadgerNewsArticleScreen;