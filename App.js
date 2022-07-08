/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Axios from 'axios';
import url from './config';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import MenuAwal from './view/menuAwal.js';
import Login from './view/login';
import lupaPassword from './view/lupaPassword';
import daftarAkun from './view/daftarAkun';
import carouselHeader from './view/carousel';
import navigationBottom from './view/navigationBottom';
import menuTrantibum from './view/Trantibum/menuTrantibum';
import BuatPengaduan from './view/Trantibum/buatPengaduan';
import PeringatanDini from './view/Trantibum/peringatanDini';
import RiwayatPengaduan from './view/Trantibum/riwayatPengaduan';
import ListPariwisata from './view/Pariwisata/listPariwisata';
import DetailPariwisata from './view/Pariwisata/detailPariwisata';
import UlasanPariwisata from './view/Pariwisata/ulasanPariwisata';
import DashboardPekerjaanUmum from './view/PekerjaanUmum/dashboard';
import SplashScreen from './view/splashScreen';
import LokasiTitikRawan from './view/PekerjaanUmum/lokasiTitikRawan';
import DataInfrastruktur from './view/PekerjaanUmum/dataInfrastruktur';
import DetailInfrastruktur from './view/PekerjaanUmum/detailInfrastruktur';
import ListAlatBerat from './view/PekerjaanUmum/listAlatBerat';
import DetailAlatBerat from './view/PekerjaanUmum/detailAlatBerat';
import BookingAlat from './view/PekerjaanUmum/bookingAlat';
import RiwayatSewaAlat from './view/PekerjaanUmum/riwayatSewaAlat';
import BuatPengaduanPekerjaanUmum from './view/PekerjaanUmum/buatPengaduanPU';
import RiwayatPengaduanPekerjaanUmum from './view/PekerjaanUmum/riwayatPengaduanPU';
import ManajemenProyek from './view/PekerjaanUmum/manajemenProyek';
import DetailManajemenProyek from './view/PekerjaanUmum/detailManajemenProyek';
import DashboardPerhubungan from './view/Perhubungan/dashboard';
import LokasiKeur from './view/Perhubungan/lokasiKeur';
import JadwalKeur from './view/Perhubungan/jadwalKeur';
import PengajuanKeur from './view/Perhubungan/pengajuanKeur';
import PerpanjangKeur from './view/Perhubungan/perpanjangKeur';
import DashboardSosial from './view/sosial/dashboardSosial';
import DataLKS from './view/sosial/dataLks';
import DataPMKS from './view/sosial/dataPmks';
import DataBansos from './view/sosial/dataBansos';
import AksiSosial from './view/sosial/aksiSosial';
import DashboardAspirasi from './view/Aspirasi/dashboardAspirasi';
import RiwayatAspirasi from './view/Aspirasi/daftarAspirasiDprd';
import DataAnggotaDprd from './view/Aspirasi/dataAnggotaDprd';
import RiwayatAspirasiPemerintah from './view/Aspirasi/daftarAspirasiPemerintah';
import DataPejabatPemerintah from './view/Aspirasi/dataPejabatPemerintah';
import BuatAspirasi from './view/Aspirasi/buatAspirasi';
import AgendaDprd from './view/Aspirasi/agendaDprd';
import DaftarJdih from './view/Aspirasi/daftarJdih';
import RiwayatPelayananKeur from './view/Perhubungan/riwayatPelayananKeur';
import DashboardKetenagakerjaan from './view/Ketenagakerjaan/dashboardKetenagakerjaan';
import DashboardPendidikan from './view/Pendidikan/dashboardPendidikan';
import DashboardKesehatan from './view/Kesehatan/dashboardKesehatan';
import BalaiLatihanKerja from './view/Ketenagakerjaan/balaiLatihan';
import DetailBalaiLatihan from './view/Ketenagakerjaan/detailBalaiLatihan';
import DaftarJadiAnggota from './view/Ketenagakerjaan/daftarJadiAnggota';
import DaftarKegiatan from './view/Ketenagakerjaan/daftarKegitan';
import TenagaAhli from './view/Ketenagakerjaan/tenagaAhli';
import LowonganKerja from './view/Ketenagakerjaan/lowonganKerja';
import KreditUsaha from './view/Ketenagakerjaan/kreditUsaha';
import DetailLowonganKerja from './view/Ketenagakerjaan/detailLowonganKerja';
import FormLamaran from './view/Ketenagakerjaan/formLamaran';
const CancelToken = Axios.CancelToken;
const Stack = createStackNavigator();

function Loading() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
}
function SettingNav() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="NavigationBottom"
          component={navigationBottom}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MenuTrantibum"
          component={menuTrantibum}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PeringatanDini"
          component={PeringatanDini}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BuatPengaduan"
          component={BuatPengaduan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RiwayatPengaduan"
          component={RiwayatPengaduan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ListPariwisata"
          component={ListPariwisata}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="UlasanPariwisata"
          component={UlasanPariwisata}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailPariwisata"
          component={DetailPariwisata}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
          name="CarouselHeader"
          component={carouselHeader}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardPekerjaanUmum"
          component={DashboardPekerjaanUmum}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LokasiTitikRawan"
          component={LokasiTitikRawan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DataInfrastruktur"
          component={DataInfrastruktur}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailInfrastruktur"
          component={DetailInfrastruktur}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ListAlatBerat"
          component={ListAlatBerat}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailAlatBerat"
          component={DetailAlatBerat}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BookingAlat"
          component={BookingAlat}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RiwayatSewaAlat"
          component={RiwayatSewaAlat}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BuatPengaduanPekerjaanUmum"
          component={BuatPengaduanPekerjaanUmum}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RiwayatPengaduanPekerjaanUmum"
          component={RiwayatPengaduanPekerjaanUmum}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ManajemenProyek"
          component={ManajemenProyek}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailManajemenProyek"
          component={DetailManajemenProyek}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardPerhubungan"
          component={DashboardPerhubungan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LokasiKeur"
          component={LokasiKeur}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="JadwalKeur"
          component={JadwalKeur}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PengajuanKeur"
          component={PengajuanKeur}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PerpanjangKeur"
          component={PerpanjangKeur}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RiwayatPelayananKeur"
          component={RiwayatPelayananKeur}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardSosial"
          component={DashboardSosial}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DataLKS"
          component={DataLKS}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DataPMKS"
          component={DataPMKS}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DataBansos"
          component={DataBansos}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AksiSosial"
          component={AksiSosial}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardKetenagakerjaan"
          component={DashboardKetenagakerjaan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardAspirasi"
          component={DashboardAspirasi}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BalaiLatihanKerja"
          component={BalaiLatihanKerja}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RiwayatAspirasi"
          component={RiwayatAspirasi}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailBalaiLatihan"
          component={DetailBalaiLatihan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RiwayatAspirasiPemerintah"
          component={RiwayatAspirasiPemerintah}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DaftarJadiAnggota"
          component={DaftarJadiAnggota}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DataAnggotaDprd"
          component={DataAnggotaDprd}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DaftarKegiatan"
          component={DaftarKegiatan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DataPejabatPemerintah"
          component={DataPejabatPemerintah}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TenagaAhli"
          component={TenagaAhli}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BuatAspirasi"
          component={BuatAspirasi}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LowonganKerja"
          component={LowonganKerja}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AgendaDprd"
          component={AgendaDprd}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailLowonganKerja"
          component={DetailLowonganKerja}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DaftarJdih"
          component={DaftarJdih}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="FormLamaran"
          component={FormLamaran}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="KreditUsaha"
          component={KreditUsaha}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardKesehatan"
          component={DashboardKesehatan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardPendidikan"
          component={DashboardPendidikan}
        />
      </Stack.Navigator>
    </>
  );
}

function SettingNavAwal() {
  return (
    <>
      <Stack.Navigator>
        {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MenuAwal"
          component={MenuAwal}
        /> */}

        <Stack.Screen
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
          name="LupaPassword"
          component={lupaPassword}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
          name="DaftarAkun"
          component={daftarAkun}
        />

        {/* <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'rgb(188, 89, 213)',
            },
          }}
          name="History"
          component={history}
        /> */}
      </Stack.Navigator>
    </>
  );
}
const App = () => {
  const token = useSelector(state => state.auth.authToken);
  console.log('ini Token', token);
  // const isLoading = useSelector(state => state.auth.isLoading);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const init = async () => {
    let email = await AsyncStorage.getItem('email');
    let password = await AsyncStorage.getItem('password');
    Axios({
      url: url + '/api/auth/login',
      method: 'post',
      data: {
        email: email,
        password: password,
      },
    })
      .then(async res => {
        // console.log('>>>>>>>>>>>>>>>', res.data.data.api_token);
        await AsyncStorage.setItem('token', res.data.data.api_token);
        dispatch({type: 'LOGIN', payload: res.data.data.api_token});
        dispatch({type: 'RESPON_LOGIN', payload: res.data.data});
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(async error => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
        // console.log('AAAAAAAAAAAAAAA');
        dispatch({type: 'LOGOUT'});
        dispatch({type: 'RESPON_LOGOUT'});
        await AsyncStorage.clear();
      });
  };

  useEffect(() => {
    console.log(token);
    init();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {loading ? (
          <Stack.Screen name="Loading" component={Loading} />
        ) : token === null ? (
          <>
            <Stack.Screen name="MenuAwal" component={SettingNavAwal} />
          </>
        ) : (
          <>
            <Stack.Screen name="NavigationBottom" component={SettingNav} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
