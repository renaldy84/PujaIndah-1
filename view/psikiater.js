import React from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Data} from './data';
import {useDispatch} from 'react-redux';

function psikiater({navigation}) {
  const dispatch = useDispatch();
  const pilih = (id) =>{
    const hasil = Data.find(x=>x.id===id)
   dispatch({
    type: 'APPEND_HISTORY',
    data: {
      id:hasil.id,
      nama: hasil.nama,
      spesialis: hasil.spesialis,
      hari: hasil.hari,
      tarif: hasil.tarif,
    },
  });
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {Data.map((data, index) => {
            return (
              <>
                <View  style={styles.box} >
                  <View key={index} style={styles.bingkaiFoto}>
                    <Image style={styles.foto} source={data.url}></Image>
                  </View>

                  <View  style={styles.profil}>
                    <Text style={{fontFamily:'helvetica-rounded-bold'}}>{data.nama}</Text>
                    <Text>{data.spesialis}</Text>
                    <Text>{data.hari}</Text>
                    <Text>{data.tarif}</Text>
                  </View>
                  <View style={styles.boxButton}>
                    <TouchableOpacity onPress={()=>pilih(data.id)} style={styles.button}>
                      <Text>Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = {
  container: {
    margin: 10,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-end',
    width: 380,
    height: 100,
    borderRadius: 10,
    margin: 10,
    backgroundColor:"#f4c9ff",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  foto: {
    width: 50,
    height: 80,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  bingkaiFoto: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  button: {
    padding: 5,
    margin:5,
    borderRadius:5,
    backgroundColor:'#c9ffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  profil: {
    width: 200,
    marginTop:10
  },
};
export default psikiater;
