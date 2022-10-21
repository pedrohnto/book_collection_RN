import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

function BookList() {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        getBooks();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getBooks();
        });
    
        return unsubscribe;
      }, [navigation]);

    const getBooks = async () => {
        setLoading(true)
        axios.get(`http://10.0.2.2:3000/books`).then((response) => {
            setData(response.data)
            setLoading(false)
        }).catch(function (error) {
            setLoading(false)
        });
    }

    const goToBookForm = () => {
        navigation.navigate('BookForm');
    }

    const goToBookDetail = (item) => {
        navigation.navigate('BookDetail', { book: item });
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.button} onPress={() => goToBookForm()}>
                    <Text style={styles.button_label}>CADASTRAR NOVO LIVRO</Text>
                </TouchableOpacity>
            </View>
            {isLoading ? <ActivityIndicator size="large" style={{ flex: 1 }} /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item_list} onPress={() => goToBookDetail(item)}>
                            <View >
                                <Text style={styles.item_list_title}>{item.title}</Text>
                                <Text style={styles.item_list_author}>{item.author}</Text>
                                <Text>{item.publisher}</Text>
                            </View>
                            <Image
                                source={require('./assets/ok-48.png')}
                                style={{ width: 24, height: 24, display: item.read ? 'flex' : 'none' }}
                            ></Image>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#dedede'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#1a8dc7",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10
    },
    button_label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    item_list: {
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10, padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item_list_title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    item_list_author: {
        fontSize: 12
    },

});

export default BookList;