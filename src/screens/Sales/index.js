import React, {useEffect} from "react";
import {FlatList, Text} from "react-native";
import {useState} from "react";
import SaleItem from "./SaleItem";
import {useFetchSales} from "../../api/UseFetchSales";
import {useSelector} from "react-redux";
import {getSalesList} from "../../redux/selectors";



export default function SalesScreen({navigation}){

const allSales = useSelector(getSalesList)
    const {getAllSales} = useFetchSales()
  //  console.log("ALL Sales: ",allSales)

    useEffect(() =>  {
        getAllSales()
    },[])

const renderItem = ({item}) => {

        return (
            <SaleItem sale={item} navigation={navigation} />

        );

    }

    return(

        <FlatList
            data={allSales}
            keyExtractor={(item,index) => index.toString()}
            renderItem={renderItem}
        />

    )
}
