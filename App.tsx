import React, { useEffect } from 'react';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  ImageBackground,
} from 'react-native';
import ParentTabNav from './src/navigation/ParentTabNav';
import Header from './src/components/commonComponents/Header';
import { commonStyles } from './src/commonStyles';
import { RealmProvider } from './src/realmContextProvider';

export default function App() : React.JSX.Element {
  return (
    <ImageBackground source={require('./src/assets/backgroundImg.jpg')} style={commonStyles.backgroundImg}>
      <SafeAreaView style={commonStyles.safeAreaView}>
        <RealmProvider>
          <Header/>
          <ParentTabNav/>
        </RealmProvider>
      </SafeAreaView>
    </ImageBackground>
  );
}
