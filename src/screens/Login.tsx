import React, { useState } from 'react';
import { 
  View, 
  Text, 
  // TextInput,  <-- Remova o TextInput padrão
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Dimensions
} from 'react-native';
import { theme } from '../theme';
import { moderateScale, verticalScale } from '../utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';

// 1. Importar a máscara e as definições
import MaskInput, { Masks } from 'react-native-mask-input';

const { height } = Dimensions.get('window');

export function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [documento, setDocumento] = useState('');
  const [senha, setSenha] = useState('');
  
  // 2. Estado para controlar o "olhinho" da senha
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Função provisória para simular o login e ir para a home
  function handleLogin() {
  // Por enquanto simula o login direto. Mais tarde, validaremos com o backend Java.
  if (documento && senha) {
    navigation.replace('Home');
  } else {
    // Caso queira testar sem preencher, pode deixar apenas a linha abaixo solta:
    navigation.replace('Home');
  }
}

  return (
    <View style={styles.container}>
      {/* Header com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acesse sua conta</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Insira seus dados para continuar.</Text>

            <View style={styles.formContainer}>
              <Text style={styles.label}>CPF ou CNPJ</Text>
              
              {/* 3. Substituir pelo MaskInput */}
              <MaskInput
                style={styles.input}
                value={documento}
                onChangeText={(masked, unmasked) => {
                  setDocumento(unmasked); // Guardamos o valor sem pontos/hifens
                }}
                // A mágica acontece aqui: ele detecta o tamanho e aplica CPF ou CNPJ
                mask={Masks.BRL_CPF_CNPJ} 
                placeholder="000.000.000-00 ou 00.000..."
                placeholderTextColor={theme.colors.text.light}
                keyboardType="number-pad"
              />

              <Text style={styles.label}>Senha</Text>
              
              {/* Container para alinhar o input e o ícone */}
              <View style={styles.passwordInputContainer}>
                <MaskInput // Usamos MaskInput aqui também para manter o estilo
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor={theme.colors.text.light}
                  // 4. Controlar visibilidade baseada no estado
                  secureTextEntry={!isPasswordVisible}
                  value={senha}
                  onChangeText={setSenha}
                />
                
                {/* 5. O Botão do Olhinho */}
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Ionicons 
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                    size={22} 
                    color={theme.colors.text.light} 
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                <Text style={styles.primaryButtonText}>Entrar</Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Ainda não tem conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.footerLink}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    height: height * 0.3,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: verticalScale(40),
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: moderateScale(20),
    top: verticalScale(60),
    zIndex: 10,
    padding: moderateScale(8),
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: theme.typography.title,
    fontWeight: "bold",
  },
  keyboardContainer: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.white,
    marginTop: -verticalScale(40),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scrollContent: {
    padding: theme.spacing.large,
    paddingTop: theme.spacing.xlarge,
  },
  title: {
    fontSize: theme.typography.title,
    color: theme.colors.text.main,
    fontWeight: "bold",
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: theme.typography.body,
    color: theme.colors.text.light,
    marginBottom: verticalScale(32),
  },
  formContainer: {
    width: "100%",
  },
  label: {
    fontSize: theme.typography.small,
    color: theme.colors.text.main,
    fontWeight: "600",
    marginBottom: verticalScale(8),
    marginLeft: moderateScale(4),
  },
  // Estilo para o container da senha
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    height: verticalScale(54),
    borderRadius: theme.borderRadius.button,
    marginBottom: verticalScale(20),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    position: 'relative',
  },
  passwordInput: {
    flex: 1, // Ocupa todo o espaço
    height: '100%',
    paddingHorizontal: moderateScale(16),
    fontSize: theme.typography.body,
    color: theme.colors.text.main,
  },
  eyeIcon: {
    position: 'absolute',
    right: moderateScale(16),
    height: '100%',
    justifyContent: 'center',
    paddingLeft: moderateScale(10), // Aumenta área de toque
  },
  
  input: {
    backgroundColor: '#F9F9F9',
    height: verticalScale(54),
    borderRadius: theme.borderRadius.button,
    paddingHorizontal: moderateScale(16),
    fontSize: theme.typography.body,
    color: theme.colors.text.main,
    marginBottom: verticalScale(20),
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: verticalScale(32),
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    height: verticalScale(54),
    borderRadius: theme.borderRadius.button,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(24),
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.subtitle,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: theme.colors.text.light,
    fontSize: theme.typography.body,
  },
  footerLink: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
    fontWeight: "bold",
  },
});
