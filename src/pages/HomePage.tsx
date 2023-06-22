import { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

import { Image } from 'expo-image';
import Entities from "../entities/Entities";


export default function HomePage() {
    const [countreis, setCountreis] = useState<Entities[]>([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',

        };
        var countryList: Entities[] = [];

        fetch("https://restcountries.com/v3.1/all", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.map((item) => {
                    countryList.push({
                        id: item.name.common,
                        flagUrl: item.flags.svg,
                        name: item.name.common,
                        ptName: item.translations.por.common,
                        population: item.population,
                        capital: item.capital,
                    region: item.region,
                    })

                })
            })

            .catch(error => console.log('error', error));

        setCountreis(countryList);

    }, []);

    return (

        <View style={styles.container}>

            <Text style={styles.title}>lista de paises</Text>        

            <FlatList

                renderItem={(countreis) =>
             <View style={styles.card} id={countreis.item.id}>
             <View>
            <Image style={styles.flag} source={{ uri: countreis.item.flagUrl }} />
            </View>

            <View>
    <Text style={{ fontSize: 30, fontWeight: '500', marginTop: 20, }}>{countreis.item.name}</Text>
    <Text style={{ fontSize: 14, fontWeight: '400', opacity: 0.6,  }}>Capital: {countreis.item.capital}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', opacity: 0.6,  }}>Região: {countreis.item.region}</Text>
     <Text style={{ fontSize: 15, fontWeight: '400', opacity: 0.6, }}>{countreis.item.ptName}</Text>
     
    <Text >{countreis.item.population}</Text>
                        </View>
                    </View>
                }
                data={countreis}
                keyExtractor={(item) => item.id}
            >
            </FlatList>


        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,

    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 50,
        marginHorizontal: 20

    },
    card: {
        width: '120%',
        margin: 10,
        aspectRatio: 2.0,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 20,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 20

    },
    flag: {
        width: 80,
        height: 70,
        marginRight: 10,
        marginTop: 10,
        marginHorizontal: 10

    }

})