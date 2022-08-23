import React from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScrollView} from 'react-native-gesture-handler';
import RenderHtml from 'react-native-render-html';

const Tab = createMaterialTopTabNavigator();

function TopTab({item}) {
  function Deskripsi() {
    const {width} = useWindowDimensions();
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
        <View style={{margin: 10}}>
          <RenderHtml
            contentWidth={width}
            source={{
              html: `${item.narasi}`,
            }}
          />
        </View>
      </ScrollView>
    );
  }

  function Transportasi() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
        {item.transportasi &&
          item.transportasi.map((val, index) => {
            return (
              <View style={{margin: 10}} key={index}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text>{index + 1}. </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text>Nama</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.nama}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text>Jenis</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.jenis}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text>Waktu</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.waktu}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text>Biaya</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.biaya}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        {/* <View style={{margin: 10}}>
        <Text></Text>
      </View> */}
      </ScrollView>
    );
  }

  function Kuliner() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
        {item.kuliner &&
          item.kuliner.map((val, index) => {
            return (
              <View style={{margin: 10}} key={index}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text>{index + 1}. </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text>Nama</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.nama}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text>Jenis</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.jenis}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text>Alamat</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.alamat}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        {/* <View style={{margin: 10}}>
      <Text></Text>
    </View> */}
      </ScrollView>
    );
  }

  function Penginapan() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
        {item.akomodasi &&
          item.akomodasi.map((val, index) => {
            return (
              <View style={{margin: 10}} key={index}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text>{index + 1}. </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text>Nama</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.nama}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text>Tipe</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.tipe}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text>Strata</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.strata}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '20%'}}>
                        <Text>Telp</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.telp}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        {/* <View style={{margin: 10}}>
          <Text></Text>
        </View> */}
      </ScrollView>
    );
  }

  function TravelAgen() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
        {item.travel_agent &&
          item.travel_agent.map((val, index) => {
            return (
              <View style={{margin: 10}} key={index}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text>{index + 1}. </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '30%'}}>
                        <Text>Nama</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val.Nama}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '30%'}}>
                        <Text>Nomor HP</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val['Nomor Hp']}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '30%'}}>
                        <Text>Email</Text>
                      </View>
                      <View style={{width: '2%'}}>
                        <Text>:</Text>
                      </View>
                      <View style={{width: '78%'}}>
                        <Text>{val['Alamat Email']}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        {/* <View style={{margin: 10}}>
        <Text></Text>
      </View> */}
      </ScrollView>
    );
  }
  return (
    <View
      horizontal={true}
      style={{
        flex: 1,
        marginVertical: 20,
        height: 300,
      }}>
      <Tab.Navigator
        backBehavior="none"
        screenOptions={{
          tabBarScrollEnabled: true,
        }}>
        <Tab.Screen name="Deskripsi" component={Deskripsi} />
        <Tab.Screen name="Transportasi" component={Transportasi} />
        <Tab.Screen name="Kuliner" component={Kuliner} />
        <Tab.Screen name="Penginapan" component={Penginapan} />
        <Tab.Screen name="Travel Agen" component={TravelAgen} />
      </Tab.Navigator>
    </View>
  );
}

export default TopTab;
// import * as React from 'react';
// import {Text, View, useWindowDimensions} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
// import {TabView, SceneMap} from 'react-native-tab-view';

// const Deskripsi = () => (
//   <ScrollView style={{flex: 1, backgroundColor: 'white', margin: 10}}>
//     <Text>
//       Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//       Lorem Ipsum has been the industry's standard dummy text ever since the
//       1500s, when an unknown printer took a galley of type and scrambled it to
//       make a type specimen book. It has survived not only five centuries, but
//       also the leap into electronic typesetting, remaining essentially
//       unchanged. It was popularised in the 1960s with the release of Letraset
//       sheets containing Lorem Ipsum passages, and more recently with desktop
//       publishing software like Aldus PageMaker including versions of Lorem
//       Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting
//       industry. Lorem Ipsum has been the industry's standard dummy text ever
//       since the 1500s, when an unknown printer took a galley of type and
//       scrambled it to make a type specimen book. It has survived not only five
//       centuries, but also the leap into electronic typesetting, remaining
//       essentially..
//     </Text>
//   </ScrollView>
// );

// const Transportasi = () => (
//   <ScrollView style={{flex: 1, backgroundColor: 'white', margin: 10}}>
//     <Text>Transportasi</Text>
//   </ScrollView>
// );

// const Kuliner = () => (
//   <ScrollView style={{flex: 1, backgroundColor: 'white', margin: 10}}>
//     <Text>Kuliner</Text>
//   </ScrollView>
// );

// const Penginapan = () => (
//   <ScrollView style={{flex: 1, backgroundColor: 'white', margin: 10}}>
//     <Text>Penginapan</Text>
//   </ScrollView>
// );

// const TravelAgen = () => (
//   <ScrollView style={{flex: 1, backgroundColor: 'white', margin: 10}}>
//     <Text>Travel Agen</Text>
//   </ScrollView>
// );

// const renderScene = SceneMap({
//   deskripsi: Deskripsi,
//   transportasi: Transportasi,
//   kuliner: Kuliner,
//   penginapan: Penginapan,
//   travelAgen: TravelAgen,
// });

// export default function TabViewExample() {
//   const layout = useWindowDimensions();

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     {key: 'deskripsi', title: 'Deskripsi'},
//     {key: 'transportasi', title: 'Transportasi'},
//     {key: 'kuliner', title: 'Kuliner'},
//     {key: 'penginapan', title: 'Penginapan'},
//     {key: 'travelAgen', title: 'Travel Agen'},
//   ]);

//   return (
//     <TabView
//       scrollEnabled={true}
//       style={{marginVertical: 20, height: 350, borderWidth: 1}}
//       navigationState={{index, routes}}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{width: layout.width}}
//     />
//   );
// }
