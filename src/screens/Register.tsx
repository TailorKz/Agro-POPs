import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../theme";
import { moderateScale, verticalScale } from "../utils/responsive";
const { height } = Dimensions.get('window');

export function Register() {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criar conta</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.title}>Dados Pessoais</Text>
            <Text style={styles.subtitle}>
              Preencha para acessar seu painel.
            </Text>

            <View style={styles.formContainer}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                placeholderTextColor={theme.colors.text.light}
                value={nome}
                onChangeText={setNome}
              />

              <Text style={styles.label}>CPF ou CNPJ</Text>
              <TextInput
                style={styles.input}
                placeholder="Apenas números"
                placeholderTextColor={theme.colors.text.light}
                keyboardType="number-pad"
                value={documento}
                onChangeText={setDocumento}
              />

              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Crie uma senha forte"
                placeholderTextColor={theme.colors.text.light}
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />

              {/* Botão de Cadastro */}
              <TouchableOpacity
                style={[styles.primaryButton, { marginTop: verticalScale(16) }]}
              >
                <Text style={styles.primaryButtonText}>Finalizar Cadastro</Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Já possui uma conta? </Text>
                <TouchableOpacity>
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
  input: {
    backgroundColor: "#F9F9F9",
    height: verticalScale(54),
    borderRadius: theme.borderRadius.button,
    paddingHorizontal: moderateScale(16),
    fontSize: theme.typography.body,
    color: theme.colors.text.main,
    marginBottom: verticalScale(20),
    borderWidth: 1,
    borderColor: "#EAEAEA",
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
