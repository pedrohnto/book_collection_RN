import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import axios from 'axios';

function BookDetail() {

    const [book, setBook] = useState({});

    const navigation = useNavigation();
    const route = useRoute();


    useEffect(() => {
        setBook(route.params.book)
    }, [])

    const goToBookForm = () => {
        navigation.navigate('BookForm', { book: book });
    }

    const confirmDeletion = () => {
        Alert.alert(
            "ATENÇÃO",
            "Deseja realmente apagar o livro?",
            [
                { text: "Cancelar" },
                { text: "APAGAR", onPress: () => navigation.navigate('BookList') }
            ]
        );



    }

    const deleteBook = () => {
        axios.delete(`http://10.0.2.2:3000/books/${book.id}`).then((response) => {
            Alert.alert(
                "SUCESSO",
                "Livro apagado com sucesso!",
                [
                    { text: "OK", onPress: () => navigation.navigate('BookList') }
                ]
            );
        }).catch(function (error) {
            alert(error)
        });
    }

    return (
        <View style={{ flex: 1, padding: 10 }, styles.container}>
            <View style={{ flex: 2 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.title}>{book.title}</Text>
                    <Image
                        source={require('./assets/ok-48.png')}
                        style={{ width: 24, height: 24, display: book.read ? 'flex' : 'none' }}
                    ></Image>
                </View>
                <Text style={styles.author}>{book.author}</Text>
                <Text style={styles.author}>{book.publisher}</Text>
                <Text style={styles.author}>{book.yearBuyed}</Text>
                <Text>{book.notes}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <TouchableOpacity style={styles.button} onPress={() => goToBookForm()}>
                    <Text style={styles.button_label}>EDITAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button, styles.button_delete} onPress={() => confirmDeletion()}>
                    <Text style={styles.button_label}>APAGAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#dedede'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#1a8dc7",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        width: 150
    },
    button_delete: {
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        width: 150,
        backgroundColor: "#c71a1a"
    },
    button_label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000'
    },
    author: {
        fontSize: 20,
        color: '#000111'
    },

});


export default BookDetail;