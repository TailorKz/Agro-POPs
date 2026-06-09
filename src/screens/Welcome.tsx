import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { RootStackParamList } from "../routes";
import { theme } from "../theme";
import { moderateScale, verticalScale } from "../utils/responsive";


const { height } = Dimensions.get("window");
const CARD_HEIGHT = height * 0.45;

export function Welcome() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      {/* Imagem de Fundo */}
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Overlay escuro para dar contraste à Logo */}
        <View style={styles.overlay}>
          {/* Sessão Superior */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </ImageBackground>

      {/* Sessão Inferior */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>Simplicidade no campo.</Text>
          <Text style={styles.subtitle}>
            Acesse seu saldo, livro caixa e tire notas em um só lugar.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.signUpButtonText}>Criar nova conta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginButtonText}>Já tenho conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  background: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    paddingHorizontal: theme.spacing.large,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: verticalScale(60),
  },
  logo: {
    width: moderateScale(150),
    height: moderateScale(150),
  },
  card: {
    backgroundColor: theme.colors.white,
    minHeight: CARD_HEIGHT,
    marginTop: -theme.borderRadius.card,
    borderTopLeftRadius: theme.borderRadius.card,
    borderTopRightRadius: theme.borderRadius.card,
    paddingHorizontal: theme.spacing.large,
    paddingTop: theme.spacing.large,
    shadowColor: "#000", // Efeito de profundidade
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: theme.spacing.xlarge,
  },
  title: {
    fontSize: theme.typography.title,
    color: theme.colors.text.main,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: verticalScale(16),
  },
  subtitle: {
    fontSize: theme.typography.body,
    color: theme.colors.text.light,
    textAlign: "center",
    marginBottom: verticalScale(32),
  },
  buttonContainer: {
    width: "100%",
    gap: theme.spacing.medium, // Espaço entre os botões
  },
  loginButton: {
    backgroundColor: theme.colors.white,
    height: verticalScale(54),
    borderRadius: theme.borderRadius.button,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000000",
  },
  loginButtonText: {
    color: theme.colors.text.main,
    fontSize: theme.typography.body,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: theme.colors.primary,
    height: verticalScale(54),
    borderRadius: theme.borderRadius.button,
    borderWidth: 1,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: theme.typography.body,
    fontWeight: "600",
  },
});
