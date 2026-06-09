import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { theme } from '../theme';
import { moderateScale, scaledFont, verticalScale } from '../utils/responsive';
import { Ionicons } from '@expo/vector-icons';

export function Home() {
  const [showValues, setShowValues] = useState(true);

  // Dados mockados para exibição visual limpa
  const financeData = {
    saldo: 'R$ 45.230,00',
    entradas: 'R$ 62.000,00',
    saidas: 'R$ 16.770,00',
    dedutivel: 'R$ 12.450,00',
    naoDedutivel: 'R$ 4.320,00'
  };

  return (
    <View style={styles.container}>
      {/* Topo Compacto Premium */}
      <View style={styles.topBar}>
        <View style={styles.welcomeRow}>
          <View>
            <Text style={styles.greetingText}>Olá, Produtor</Text>
            <Text style={styles.propertyText}>Chácara Vista Alegre</Text>
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
        {/* CARD 1: Saldo e Fluxo de Caixa (Inspirado em Bancos Digitais) */}
        <View style={styles.mainCard}>
          <Text style={styles.cardLabel}>Saldo Geral Disponível</Text>
          <Text style={styles.mainBalance}>
            {showValues ? financeData.saldo : '••••••'}
          </Text>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statColumn}>
              <View style={styles.statHeader}>
                <Ionicons name="arrow-up-circle" size={18} color={theme.colors.success} />
                <Text style={styles.statLabel}>Entradas</Text>
              </View>
              <Text style={[styles.statValue, { color: theme.colors.success }]}>
                {showValues ? financeData.entradas : '••••••'}
              </Text>
            </View>

            <View style={styles.statColumn}>
              <View style={styles.statHeader}>
                <Ionicons name="arrow-down-circle" size={18} color={theme.colors.danger} />
                <Text style={styles.statLabel}>Saídas</Text>
              </View>
              <Text style={[styles.statValue, { color: theme.colors.danger }]}>
                {showValues ? financeData.saidas : '••••••'}
              </Text>
            </View>
          </View>
        </View>

        {/* CARD 2: Monitor de Dedutibilidade (Impostos / Livro Caixa) */}
        <View style={styles.taxCard}>
          <View style={styles.taxHeaderRow}>
            <Text style={styles.taxTitle}>Classificação do Mês</Text>
            <Ionicons name="document-text-outline" size={20} color={theme.colors.text.light} />
          </View>
          
          <View style={styles.taxBarContainer}>
            <View style={styles.taxBarFill} /> {/* Representação visual da proporção */}
          </View>

          <View style={styles.taxDetailsRow}>
            <View>
              <Text style={styles.taxDetailLabel}>🟢 Dedutível (Despesas Agro)</Text>
              <Text style={styles.taxDetailValue}>
                {showValues ? financeData.dedutivel : '••••••'}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.taxDetailLabel}>🔴 Não Dedutível</Text>
              <Text style={styles.taxDetailValue}>
                {showValues ? financeData.naoDedutivel : '••••••'}
              </Text>
            </View>
          </View>
        </View>

        {/* SEÇÃO: Ações Rápidas */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIconCircle, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="mic-outline" size={24} color={theme.colors.primary} />
            </View>
            <Text style={styles.actionText}>Emitir Nota (Voz)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIconCircle, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="list-outline" size={24} color="#1E88E5" />
            </View>
            <Text style={styles.actionText}>Ver Minhas Notas</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
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
    justifyContent: 'center',
    paddingTop: verticalScale(30),
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    color: theme.colors.white,
    fontSize: theme.typography.subtitle,
    fontWeight: 'bold',
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
  mainCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.large,
    marginTop: -verticalScale(30), // Faz flutuar sobre a barra verde
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: verticalScale(20),
  },
  cardLabel: {
    color: theme.colors.text.light,
    fontSize: theme.typography.small,
    fontWeight: '600',
  },
  mainBalance: {
    fontSize: scaledFont(28),
    color: theme.colors.text.main,
    fontWeight: 'bold',
    marginVertical: verticalScale(8),
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: verticalScale(16),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statColumn: {
    flex: 1,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  statLabel: {
    color: theme.colors.text.light,
    fontSize: theme.typography.small,
  },
  statValue: {
    fontSize: theme.typography.subtitle,
    fontWeight: 'bold',
  },
  taxCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.large,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: verticalScale(24),
  },
  taxHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  taxTitle: {
    fontSize: theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.text.main,
  },
  taxBarContainer: {
    height: verticalScale(8),
    backgroundColor: theme.colors.danger,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: verticalScale(16),
  },
  taxBarFill: {
    height: '100%',
    width: '75%', // Proporção mockada dinâmica das notas dedutíveis
    backgroundColor: theme.colors.success,
  },
  taxDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taxDetailLabel: {
    fontSize: theme.typography.small,
    color: theme.colors.text.light,
    marginBottom: 4,
  },
  taxDetailValue: {
    fontSize: theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.text.main,
  },
  sectionTitle: {
    fontSize: theme.typography.subtitle,
    fontWeight: 'bold',
    color: theme.colors.text.main,
    marginBottom: verticalScale(16),
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.medium,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.medium,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  actionIconCircle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
  },
  actionText: {
    fontSize: theme.typography.small,
    fontWeight: '600',
    color: theme.colors.text.main,
    textAlign: 'center',
  },
});