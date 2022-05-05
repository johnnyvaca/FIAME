import React, {useEffect, useState} from "react";
import {Button, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import NumericInput from 'react-native-numeric-input'
import {URL} from "../../../env";
import {useSelector} from "react-redux";
import {getSelectedSale} from "../../redux/selectors";
import {useFetchSales} from "../../api/UseFetchSales";

export default function DetailsScreen({navigation,route}){

    const [ quantity, setQuantity ] = useState(route.params.quantity);
    const {id} = route.params
    const {getSaleById} = useFetchSales()
    const sale = useSelector(getSelectedSale)

    useEffect(() => {
        getSaleById(id)
    },[])




    console.log("sale: ", sale)

return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <Text>revenir</Text>
                <Text>{id}</Text>
            </TouchableOpacity>
            <View style={{flex:6}} >
                <Image  source={{uri:URL+"/img/"+ sale.img}}  style={styles.coucou} />
            </View>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-around',borderBottomColor:'black0',borderTopColor:'black',borderTopWidth:3,borderBottomWidth:3}} >
                <Text style={styles.textes}>{sale.name}</Text>
                <Text style={styles.textes}>{sale.selling_date}</Text>
                <Text style={styles.textes}>{sale.user_id}</Text>
                <Text style={styles.textes}>{sale.price}.- CHF</Text>
            </View>
            <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:-10}}>
                <Text style={{fontWeight:"bold",fontSize:20, paddingRight:50}}>Commande</Text>
                <NumericInput
                    type={"up-down"}
                    value={quantity}
                    onChange={ quantity => setQuantity(quantity)}
                    onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                    totalWidth={100}
                    totalHeight={70}
                    iconSize={25}
                    editable={false}
                    step={1}
                    valueType='integer'
                    rounded
                    textColor='black'
                    iconStyle={{ color: 'black' }}
                    rightButtonBackgroundColor='#EA3788'
                    leftButtonBackgroundColor='#E56B70'
                />
            </View>
            <View style={{flex:1,backgroundColor:'grey',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontWeight:"bold",fontSize:20, paddingRight:50}}>Payés</Text>
                <Text style={{fontWeight:"bold",fontSize:20, paddingRight:50}}>{sale.paid} plats</Text>
            </View>
            <View style={{flex:1,backgroundColor:'orange',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontWeight:"bold",fontSize:20, paddingRight:50}}>A Payer</Text>
                <Text style={{fontWeight:"bold",fontSize:20, paddingRight:50}}>{(sale.quantity-sale.paid)*sale.price}.- CHF</Text>
            </View>
            <View style={{flex:1,backgroundColor:'grey',flexDirection:'row',alignItems:'center',justifyContent:'space-around',paddingHorizontal:70}}>
                <Button title="Confirmer" />
                <Button title="Annuler" color="red" />

            </View>

        </View>
    )


}

const styles = StyleSheet.create({
    container:{
        flex:3, width:'100%'
    },
    coucou:{
       flex:1,
        width: '100%',
        resizeMode:'contain'
    },
    textes:{
        fontWeight:'bold',
        fontSize:14
    }
})
