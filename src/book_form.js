import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator, FlatList, Text, TouchableOpacity, TextInput, Switch, Alert, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import axios from 'axios';

function BookForm() {

    const [book, setBook] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [yearBuyed, setYearBuyed] = useState('');
    const [notes, setNotes] = useState('');
    const [read, setRead] = useState(false);

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        if (route.params !== undefined) {
            setEditMode(true);
            setBook(route.params.book);
            setTitle(route.params.book.title);
            setAuthor(route.params.book.author);
            setPublisher(route.params.book.publisher);
            setYearBuyed(route.params.book.yearBuyed?.toString());
            setNotes(route.params.book.notes);
            setRead(route.params.book.read);
        }
    }, [])

    const saveBook = () => {
        if (title === '') {
            alert(`Você deve informar o título do Livro.`);
            return;
        }

        let url = 'http://10.0.2.2:3000/books';
        let method = 'post';
        let bookToBeSaved = generateBook();

        if (bookToBeSaved !== null) {
            setLoading(true);
            if (editMode) {
                url = url + `/${book.id}`;
                bookToBeSaved.id = book.id;
                method = 'patch';
            }

            axios({
                method: method,
                url: url,
                data: bookToBeSaved
            }).then(function (response) {
                setLoading(false);
                Alert.alert(
                    "SUCESSO",
                    `Livro ${editMode ? 'editado' : 'criado'} com sucesso!`,
                    [
                        { text: "OK", onPress: () => navigation.navigate('BookList') }
                    ]
                );
            })
                .catch(function (error) {
                    setLoading(false);
                    alert(`Ocorreu um erro ao ${editMode ? 'editar' : 'criar'} o livro. Corriga os dados ou tente novamente mais tarde.`)
                });
        }
    }

    const generateBook = () => {
        if (!yearValid()) {
            return null;
        }
        return {
            title: title,
            author: author,
            publisher: publisher,
            yearBuyed: yearBuyed,
            notes: notes,
            read: read
        };

    }

    const yearValid = () => {
        if (yearBuyed) {
            var yValue = parseInt(yearBuyed);
            var currentYear = new Date().getFullYear();
            if (yValue >= 0 && yValue <= currentYear) {
                setYearBuyed(yValue);
                return true;
            } else {
                alert('O ano em que foi comprado tem que ser um valor positivo e menor ou igual ao ano atual. Não dá pra comprar livro no futuro! :)')
                return false;
            }
        } else {
            return true;
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>

            <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10 }}>
                {editMode ? 'EDITAR LIVRO' : 'CADASTRAR LIVRO'}
            </Text>
            <View >
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text>Título</Text>
                    <TextInput value={title} onChangeText={(t) => setTitle(t)} style={styles.inputs}></TextInput>
                </View>
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text>Autor</Text>
                    <TextInput value={author} onChangeText={(t) => setAuthor(t)} style={styles.inputs}></TextInput>
                </View>
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text>Editora</Text>
                    <TextInput value={publisher} onChangeText={(t) => setPublisher(t)} style={styles.inputs}></TextInput>
                </View>
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text>Ano que foi comprado</Text>
                    <TextInput value={yearBuyed} style={styles.inputs} keyboardType='number-pad' maxLength={4} onChangeText={(y) => setYearBuyed(y)} ></TextInput>
                </View>
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text>Anotações</Text>
                    <TextInput value={notes} onChangeText={(t) => setNotes(t)} style={styles.inputs} multiline={true}
                        numberOfLines={10} ></TextInput>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text>Já Leu</Text>
                    <Switch value={read} onValueChange={() => { setRead(!read) }} />
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => saveBook()}>
                <Text style={styles.button_label}>SALVAR</Text>
            </TouchableOpacity>
            {isLoading && <View style={{ alignItems:'center', justifyContent:'center',
                backgroundColor: '#000000aa', flex: 1, position: 'absolute', width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
            }}>
                <ActivityIndicator color={'#1a8dc7'} size="large" />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    inputs: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        width: 300,
        height: 45,
        marginBottom: 10,
        fontSize: 15
    },
    button: {
        alignItems: "center",
        backgroundColor: "#1a8dc7",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        width: 200
    },
    button_label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
});

export default BookForm;