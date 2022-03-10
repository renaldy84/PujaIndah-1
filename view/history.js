import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

function history() {
  const {historyList} = useSelector(state => state.history);
  
  return (
    <>
      <ScrollView>
        {historyList.length > 0 ? (
          <View style={styles.container}>
            {historyList.map((data, key) => {
              return (
                <>
                  <View key={key} style={styles.box}>
                    <View style={styles.profil}>
                      <Text style={{fontFamily:'helvetica-rounded-bold'}}>{data.nama}</Text>
                      <Text>{data.spesialis}</Text>
                      <Text>{data.hari}</Text>
                      <Text>{data.tarif}</Text>
                    </View>
                    <View style={styles.booked}>
                      <Image
                        style={styles.foto}
                        source={require('../assets/image/booked.png')}></Image>
                    </View>
                  </View>
                </>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 800,
            }}>
            <Text
              style={[
                {
                  fontFamily: 'helvetica-rounded-bold',
                  fontSize: 20,
                  padding: 15,
                  color: 'black',
                  textAlign: 'center',
                },
                styles.titleText,
              ]}>
              Anda Belum Membuat Janji
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = {
  container: {
    margin: 20,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-end',
    width: 350,
    height: 100,
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#f4c9ff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  boxButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  foto: {
    width: 120,
    height: 50,
  },
  booked: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profil: {
    width: 180,
    margin: 10,
  },
};
export default history;
