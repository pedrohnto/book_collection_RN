import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import axios from 'axios';

function BookForm() {

    const [book, setBook] = useState({});
    const [editMode, setEditMode] = useState(false);

    const route = useRoute();

    useEffect(() => {
        setEditMode(route.params !== undefined);
    },[])

    return(
        <View><Text>{editMode ? 'EDITAR LIVRO' :'CADASTRAR LIVRO'}</Text></View>
    )

}

export default BookForm;