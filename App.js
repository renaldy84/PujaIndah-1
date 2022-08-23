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
import DataPejabatEksekutif from './view/Aspirasi/dataPejabatEksekutif';
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
import FasilitasKesehatan from './view/Kesehatan/fasilitasKesehatan';
import DetailFasilitasKesehatan from './view/Kesehatan/detailFasilitasKesehatan';
import PendaftaranPelayananKesehatan from './view/Kesehatan/PendaftaranPelayanan';
import BerhasilDaftarLayanan from './view/Kesehatan/BerhasilDaftarLayanan';
import RiwayatPasien from './view/Kesehatan/riwayatPasien';
import DaftarDokter from './view/Kesehatan/daftarDokter';
import GawatDarurat from './view/Kesehatan/gawatDarurat';
import Rapor from './view/Pendidikan/rapor';
import InformasiSiswa from './view/Pendidikan/informasiSiswa';
import ProfilSekolah from './view/Pendidikan/profilSekolah';
import Beasiswa from './view/Pendidikan/beasiswa';
import DaftarBeasiswa from './view/Pendidikan/daftarBeasiswa';
import DashboardKomoditas from './view/Komoditas/dashboardKomoditas';
import DetailKomoditas from './view/Komoditas/detailKomoditas';
import DashboardPerizinan from './view/Perizinan/dashboardPerizinan';
import DaftarPerizinan from './view/Perizinan/daftarPerizinan';
import DetailPerizinan from './view/Perizinan/detailPerizinan';
import Potensi from './view/Perizinan/potensi';
import DashboardKependudukan from './view/Kependudukan/dashboardKependudukan';
import AktaKematian from './view/Kependudukan/aktaKematian';
import FormAktaKematian from './view/Kependudukan/formAktaKematian';
import AktaKelahiran from './view/Kependudukan/aktaKelahiran';
import KartuIdentitasAnak from './view/Kependudukan/kartuIdentitasAnak';
import FormAktaKelahiran from './view/Kependudukan/formAktaKelahiran';
import FormKIA from './view/Kependudukan/formKIA';
import KartuTandaPenduduk from './view/Kependudukan/kartuTandaPenduduk';
import FormKTP from './view/Kependudukan/formKTP';
import UbahPassword from './view/ubahPassword';
import UbahProfile from './view/ubahProfile';
import BukuDigital from './view/Pendidikan/bukuDigital';
import MajalahDigital from './view/Pendidikan/majalahDigital';
import FormBuatAspirasi from './view/Aspirasi/formBuatAspirasi';
import DetailPejabatEksekutif from './view/Aspirasi/detailPejabatEksekutif';
import DetailAnggotaDprd from './view/Aspirasi/detailAnggotaDprd';
import TambahKegiatanBlk from './view/Ketenagakerjaan/tambahKegiatan';

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
          name="DetailAnggotaDprd"
          component={DetailAnggotaDprd}
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
          name="DataPejabatEksekutif"
          component={DataPejabatEksekutif}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailPejabatEksekutif"
          component={DetailPejabatEksekutif}
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
          name="FormBuatAspirasi"
          component={FormBuatAspirasi}
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
          name="FasilitasKesehatan"
          component={FasilitasKesehatan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailFasilitasKesehatan"
          component={DetailFasilitasKesehatan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PendaftaranPelayananKesehatan"
          component={PendaftaranPelayananKesehatan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BerhasilDaftarLayanan"
          component={BerhasilDaftarLayanan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RiwayatPasien"
          component={RiwayatPasien}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DaftarDokter"
          component={DaftarDokter}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="GawatDarurat"
          component={GawatDarurat}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardPendidikan"
          component={DashboardPendidikan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Rapor"
          component={Rapor}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardKependudukan"
          component={DashboardKependudukan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="InformasiSiswa"
          component={InformasiSiswa}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AktaKematian"
          component={AktaKematian}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ProfilSekolah"
          component={ProfilSekolah}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="FormAktaKematian"
          component={FormAktaKematian}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Beasiswa"
          component={Beasiswa}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AktaKelahiran"
          component={AktaKelahiran}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DaftarBeasiswa"
          component={DaftarBeasiswa}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="FormAktaKelahiran"
          component={FormAktaKelahiran}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardKomoditas"
          component={DashboardKomoditas}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="KartuIdentitasAnak"
          component={KartuIdentitasAnak}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailKomoditas"
          component={DetailKomoditas}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="FormKIA"
          component={FormKIA}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardPerizinan"
          component={DashboardPerizinan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="KartuTandaPenduduk"
          component={KartuTandaPenduduk}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DaftarPerizinan"
          component={DaftarPerizinan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailPerizinan"
          component={DetailPerizinan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Potensi"
          component={Potensi}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="FormKTP"
          component={FormKTP}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="UbahPassword"
          component={UbahPassword}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="UbahProfile"
          component={UbahProfile}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BukuDigital"
          component={BukuDigital}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MajalahDigital"
          component={MajalahDigital}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TambahKegiatanBlk"
          component={TambahKegiatanBlk}
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
        console.log('>>>>>>>>>>>>>>>', res.data);
        await AsyncStorage.setItem('token', res.data.data.api_token);
        dispatch({type: 'LOGIN', payload: res.data.data.api_token});
        dispatch({type: 'RESPON_LOGIN', payload: res.data});
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
