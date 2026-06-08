import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';
import { theme } from './src/theme';

export default function App() {
  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Routes />
    </>
  );
}