import React, { useState } from 'react';
import { 
  View, 
  Text, 
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
import MaskInput, { Masks } from 'react-native-mask-input';

const { height } = Dimensions.get('window');

export function Register() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [senha, setSenha] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleRegister() {
    if (documento && senha) {
    navigation.replace('Home');
  } else {
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
        <Text style={styles.headerTitle}>Criar Conta</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Dados Pessoais</Text>
            <Text style={styles.subtitle}>Preencha os campos para começar a gerenciar sua produção.</Text>

            <View style={styles.formContainer}>
              {/* Nome Completo */}
              <Text style={styles.label}>Nome Completo</Text>
              <MaskInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor={theme.colors.text.light}
                value={nome}
                onChangeText={setNome}
              />

              {/* CPF ou CNPJ com Máscara */}
              <Text style={styles.label}>CPF ou CNPJ</Text>
              <MaskInput
                style={styles.input}
                value={documento}
                onChangeText={(masked, unmasked) => setDocumento(unmasked)}
                mask={Masks.BRL_CPF_CNPJ} 
                placeholder="CPF/CNPJ"
                placeholderTextColor={theme.colors.text.light}
                keyboardType="number-pad"
              />

              {/* Senha */}
              <Text style={styles.label}>Senha de Acesso</Text>
              <View style={styles.passwordInputContainer}>
                <MaskInput
                  style={styles.passwordInput}
                  placeholder="Crie uma senha forte"
                  placeholderTextColor={theme.colors.text.light}
                  secureTextEntry={!isPasswordVisible}
                  value={senha}
                  onChangeText={setSenha}
                />
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

              <TouchableOpacity style={[styles.primaryButton, { marginTop: verticalScale(16) }]} onPress={handleRegister}>
                <Text style={styles.primaryButtonText}>Finalizar Cadastro</Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Já possui uma conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.footerLink}>Fazer Login</Text>
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
    height: height * 0.30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(40), 
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: moderateScale(20),
    top: verticalScale(60),
    zIndex: 10,
    padding: moderateScale(8),
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: theme.typography.title,
    fontWeight: 'bold',
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
    shadowColor: '#000',
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
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: theme.typography.body,
    color: theme.colors.text.light,
    marginBottom: verticalScale(32),
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: theme.typography.small,
    color: theme.colors.text.main,
    fontWeight: '600',
    marginBottom: verticalScale(8),
    marginLeft: moderateScale(4),
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
    flex: 1,
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
    paddingLeft: moderateScale(10),
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    height: verticalScale(54),
    borderRadius: theme.borderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(24),
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.subtitle,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.text.light,
    fontSize: theme.typography.body,
  },
  footerLink: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
    fontWeight: 'bold',
  },
});