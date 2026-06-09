import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Platform
} from 'react-native';
import { theme } from '../theme';
import { moderateScale, scaledFont, verticalScale } from '../utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type TaxTabType = 'Dedutível' | 'Não Dedutível';

const mockDespesasFiscais = [
  { 
    id: '1', 
    categoria: 'Dedutível', 
    data: '05/06/2026', 
    descricao: 'Adubo NPK e Defensivos', 
    detalhe: 'Insumo agrícola essencial', 
    valor: 'R$ 8.500,00' 
  },
  { 
    id: '2', 
    categoria: 'Não Dedutível', 
    data: '04/06/2026', 
    descricao: 'Supermercado da Família', 
    detalhe: 'Despesa de subsistência pessoal', 
    valor: 'R$ 1.200,00' 
  },
  { 
    id: '3', 
    categoria: 'Dedutível', 
    data: '02/06/2026', 
    descricao: 'Óleo Diesel p/ Trator', 
    detalhe: 'Combustível de produção', 
    valor: 'R$ 2.400,00' 
  },
  { 
    id: '4', 
    categoria: 'Dedutível', 
    data: '25/05/2026', 
    descricao: 'Sementes de Milho', 
    detalhe: 'Insumo de plantio', 
    valor: 'R$ 5.070,00' 
  },
  { 
    id: '5', 
    categoria: 'Não Dedutível', 
    data: '20/05/2026', 
    descricao: 'Manutenção Carro de Passeio', 
    detalhe: 'Veículo não utilitário da atividade', 
    valor: 'R$ 850,00' 
  },
];

export function Dedutibilidade() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TaxTabType>('Dedutível');
  const [activeFilter, setActiveFilter] = useState('Mês');
  
  const filters = ['Hoje', 'Mês', 'Ano', 'Tudo'];

  const despesasFiltradas = mockDespesasFiscais.filter(
    item => item.categoria === activeTab
  );

  const renderItem = ({ item }: { item: typeof mockDespesasFiscais[0] }) => {
    const isDedutivel = item.categoria === 'Dedutível';

    return (
      <View style={styles.cardItem}>
        <View style={styles.infoRow}>
          <View style={[
            styles.indicatorBadge, 
            { backgroundColor: isDedutivel ? '#E8F5E9' : '#FFEBEE' }
          ]}>
            <Text style={[
              styles.badgeText, 
              { color: isDedutivel ? theme.colors.success : theme.colors.danger }
            ]}>
              {isDedutivel ? 'DEDUTÍVEL' : 'NÃO DEDUTÍVEL'}
            </Text>
          </View>
          <Text style={styles.itemData}>{item.data}</Text>
        </View>

        <Text style={styles.itemTitle}>{item.descricao}</Text>
        <Text style={styles.itemSubtitle}>{item.detalhe}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Valor da Nota:</Text>
          <Text style={styles.priceValue}>{item.valor}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Classificação Fiscal</Text>
      </View>

      {/* Filtro de Período */}
      <View style={styles.filterContainer}>
        {filters.map((filter) => {
          if (filter === 'Tudo') {
            return (
              <TouchableOpacity key={filter} style={styles.filterButton}>
                <Ionicons name="options-outline" size={20} color={theme.colors.text.main} />
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity 
              key={filter}
              style={[styles.filterButton, activeFilter === filter && styles.filterButtonActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Abas Dedutível / Não Dedutível */}
      <View style={styles.tabsContainer}>
        {(['Dedutível', 'Não Dedutível'] as TaxTabType[]).map((tab) => (
          <TouchableOpacity 
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Itens Fiscais */}
      <FlatList
        data={despesasFiltradas}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    height: verticalScale(110),
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? verticalScale(40) : verticalScale(20),
  },
  backButton: {
    position: 'absolute',
    left: moderateScale(16),
    top: Platform.OS === 'ios' ? verticalScale(50) : verticalScale(30),
    padding: moderateScale(8),
    zIndex: 10,
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: theme.typography.subtitle,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: verticalScale(12),
    backgroundColor: theme.colors.white,
  },
  filterButton: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(20),
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: theme.typography.small,
    color: theme.colors.text.main,
    fontWeight: '600',
  },
  filterTextActive: {
    color: theme.colors.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    color: theme.colors.text.light,
    fontSize: theme.typography.body,
    fontWeight: '600',
  },
  tabTextActive: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  listContent: {
    padding: theme.spacing.medium,
  },
  cardItem: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.large,
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  indicatorBadge: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(6),
  },
  badgeText: {
    fontSize: scaledFont(10),
    fontWeight: 'bold',
  },
  itemData: {
    fontSize: theme.typography.small,
    color: theme.colors.text.light,
  },
  itemTitle: {
    fontSize: theme.typography.subtitle,
    color: theme.colors.text.main,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: theme.typography.body,
    color: theme.colors.text.light,
    marginBottom: verticalScale(16),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: verticalScale(12),
  },
  priceLabel: {
    fontSize: theme.typography.body,
    color: theme.colors.text.light,
  },
  priceValue: {
    fontSize: theme.typography.subtitle,
    fontWeight: 'bold',
    color: theme.colors.text.main,
  },
});