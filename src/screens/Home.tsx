import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../routes";
import { theme } from "../theme";
import { moderateScale, scaledFont, verticalScale } from "../utils/responsive";
import { Modal } from 'react-native';
export function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showValues, setShowValues] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Mês");

  const financeData = {
    saldo: "R$ 45.230,00",
    entradas: "R$ 62.000,00",
    saidas: "R$ 16.770,00",
    dedutivel: "R$ 12.450,00",
    naoDedutivel: "R$ 4.320,00",
  };
const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);
  const filters = ["Hoje", "Mês", "Ano", "Tudo"];

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.welcomeRow}>
          <View>
            <Text style={styles.greetingText}>Olá, Produtor</Text>
            <Text style={styles.propertyText}>IE: 123.456.789</Text>
          </View>
          <TouchableOpacity
            style={styles.toggleValuesButton}
            onPress={() => setShowValues(!showValues)}
          >
            <Ionicons
              name={showValues ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Filtro de Período */}
        <View style={styles.filterContainer}>
          {filters.map((filter) => {
            // Se o filtro for "Tudo", renderiza o ícone de opções/filtros
            if (filter === "Tudo") {
              return (
                <TouchableOpacity
                  key={filter}
                  style={styles.filterButton}
                  onPress={() => setModalFiltroVisivel(true)}
                >
                  <Ionicons
                    name="options-outline"
                    size={20}
                    color={theme.colors.text.main}
                  />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CARD 1: Saldo e Fluxo de Caixa*/}
        <TouchableOpacity
          style={styles.mainCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Extrato")}
          
        >
          <Text style={styles.cardLabel}>Saldo Geral Disponível</Text>
          <Text style={styles.mainBalance}>
            {showValues ? financeData.saldo : "••••••"}
          </Text>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statColumn}>
              <View style={styles.statHeader}>
                <Ionicons
                  name="arrow-up-circle"
                  size={18}
                  color={theme.colors.success}
                />
                <Text style={styles.statLabel}>Entradas</Text>
              </View>
              <Text style={[styles.statValue, { color: theme.colors.success }]}>
                {showValues ? financeData.entradas : "••••••"}
              </Text>
            </View>

            <View style={styles.statColumn}>
              <View style={styles.statHeader}>
                <Ionicons
                  name="arrow-down-circle"
                  size={18}
                  color={theme.colors.danger}
                />
                <Text style={styles.statLabel}>Saídas</Text>
              </View>
              <Text style={[styles.statValue, { color: theme.colors.danger }]}>
                {showValues ? financeData.saidas : "••••••"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* CARD 2: Monitor de Dedutibilidade */}
        <TouchableOpacity style={styles.taxCard} activeOpacity={0.8} onPress={() => navigation.navigate('Dedutibilidade')}>
          <View style={styles.taxHeaderRow}>
            <Text style={styles.taxTitle}>Classificação de Despesas</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.text.light}
            />
          </View>

          <View style={styles.taxBarContainer}>
            <View style={styles.taxBarFill} />
          </View>

          <View style={styles.taxDetailsRow}>
            <View>
              <Text style={styles.taxDetailLabel}>Dedutível</Text>
              <Text
                style={[styles.taxDetailValue, { color: theme.colors.success }]}
              >
                {showValues ? financeData.dedutivel : "••••••"}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.taxDetailLabel}>Não Dedutível</Text>
              <Text
                style={[styles.taxDetailValue, { color: theme.colors.danger }]}
              >
                {showValues ? financeData.naoDedutivel : "••••••"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* SEÇÃO: Ações Rápidas */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Chat')}>
            <View
              style={[styles.actionIconCircle, { backgroundColor: "#E8F5E9" }]}
            >
              <Ionicons
                name="mic-outline"
                size={24}
                color={theme.colors.primary}
              />
            </View>
            <Text style={styles.actionText}>Emitir por Voz</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View
              style={[styles.actionIconCircle, { backgroundColor: "#E3F2FD" }]}
            >
              <Ionicons name="list-outline" size={24} color="#1E88E5" />
            </View>
            <Text style={styles.actionText}>Listar Notas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalFiltroVisivel}
  onRequestClose={() => setModalFiltroVisivel(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Filtrar Período</Text>
        <TouchableOpacity onPress={() => setModalFiltroVisivel(false)}>
          <Ionicons name="close" size={24} color={theme.colors.text.main} />
        </TouchableOpacity>
      </View>
      
      <Text style={{ color: theme.colors.text.light, marginVertical: 20 }}>
        Seletor de Calendário virá aqui...
      </Text>

      <TouchableOpacity style={styles.primaryButton} onPress={() => setModalFiltroVisivel(false)}>
        <Text style={styles.primaryButtonText}>Aplicar Filtro</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topBar: {
    backgroundColor: theme.colors.primary,
    height: verticalScale(140),
    paddingHorizontal: theme.spacing.large,
    justifyContent: "center",
    paddingTop: verticalScale(30),
  },
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingText: {
    color: theme.colors.white,
    fontSize: theme.typography.subtitle,
    fontWeight: "bold",
  },
  propertyText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.body,
    marginTop: 2,
  },
  toggleValuesButton: {
    padding: moderateScale(8),
  },
  scrollContent: {
    padding: theme.spacing.large,
    paddingBottom: verticalScale(40),
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
    marginTop: -verticalScale(10),
  },
  filterButton: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(20),
    backgroundColor: "#E0E0E0",
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: theme.typography.small,
    color: theme.colors.text.main,
    fontWeight: "600",
  },
  filterTextActive: {
    color: theme.colors.white,
  },
  mainCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.large,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: verticalScale(20),
  },
  cardLabel: {
    color: theme.colors.text.light,
    fontSize: theme.typography.small,
    fontWeight: "600",
  },
  mainBalance: {
    fontSize: scaledFont(28),
    color: theme.colors.text.main,
    fontWeight: "bold",
    marginVertical: verticalScale(8),
  },
  divider: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginVertical: verticalScale(16),
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statColumn: {
    flex: 1,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  statLabel: {
    color: theme.colors.text.light,
    fontSize: theme.typography.small,
  },
  statValue: {
    fontSize: theme.typography.subtitle,
    fontWeight: "bold",
  },
  taxCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.large,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: verticalScale(24),
  },
  taxHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  taxTitle: {
    fontSize: theme.typography.body,
    fontWeight: "bold",
    color: theme.colors.text.main,
  },
  taxBarContainer: {
    height: verticalScale(8),
    backgroundColor: theme.colors.danger,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: verticalScale(16),
  },
  taxBarFill: {
    height: "100%",
    width: "75%",
    backgroundColor: theme.colors.success,
  },
  taxDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taxDetailLabel: {
    fontSize: theme.typography.small,
    color: theme.colors.text.light,
    marginBottom: 4,
  },
  taxDetailValue: {
    fontSize: theme.typography.body,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: theme.typography.subtitle,
    fontWeight: "bold",
    color: theme.colors.text.main,
    marginBottom: verticalScale(16),
  },
  actionsGrid: {
    flexDirection: "row",
    gap: theme.spacing.medium,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.medium,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  actionIconCircle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(8),
  },
  actionText: {
    fontSize: theme.typography.small,
    fontWeight: "600",
    color: theme.colors.text.main,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro com 50% de transparência
    justifyContent: 'flex-end', // Alinha o conteúdo na base da tela
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.card,
    borderTopRightRadius: theme.borderRadius.card,
    padding: theme.spacing.large,
    paddingBottom: verticalScale(34), // Espaço extra para a barra de navegação do iPhone
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  modalTitle: {
    fontSize: theme.typography.subtitle,
    fontWeight: 'bold',
    color: theme.colors.text.main,
  },
  modalPlaceholderText: {
    color: theme.colors.text.light,
    fontSize: theme.typography.body,
    marginVertical: verticalScale(24),
    textAlign: 'center',
  },
  modalApplyButton: {
    backgroundColor: theme.colors.primary,
    height: verticalScale(54),
    borderRadius: theme.borderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalApplyButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.body,
    fontWeight: 'bold',
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
});
