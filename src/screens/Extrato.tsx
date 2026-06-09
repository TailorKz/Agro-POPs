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
import { moderateScale, verticalScale } from '../utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Tipagem das abas
type TabType = 'Todas' | 'Entradas' | 'Saídas';

// Dados simulados de notas fiscais agropecuárias
const mockNotas = [
  { 
    id: '1', 
    tipo: 'entrada', 
    data: '08/06/2026', 
    descricao: 'Venda de Soja (Sacas)', 
    favorecido: 'Cooperativa AgroAlfa', 
    valor: 'R$ 35.000,00' 
  },
  { 
    id: '2', 
    tipo: 'saida', 
    data: '05/06/2026', 
    descricao: 'Adubo NPK e Defensivos', 
    favorecido: 'Agropecuária Sul Ltda', 
    valor: 'R$ 8.500,00' 
  },
  { 
    id: '3', 
    tipo: 'saida', 
    data: '02/06/2026', 
    descricao: 'Manutenção Trator John Deere', 
    favorecido: 'Mecânica Agrícola Silva', 
    valor: 'R$ 3.200,00' 
  },
  { 
    id: '4', 
    tipo: 'entrada', 
    data: '28/05/2026', 
    descricao: 'Venda de Milho (A Granel)', 
    favorecido: 'Moinho do Campo', 
    valor: 'R$ 18.400,00' 
  },
  { 
    id: '5', 
    tipo: 'saida', 
    data: '25/05/2026', 
    descricao: 'Sementes de Milho Híbrido', 
    favorecido: 'Sementes Campeã', 
    valor: 'R$ 5.070,00' 
  },
];

export function Extrato() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('Todas');
 const [activeFilter, setActiveFilter] = useState('Mês');
    const filters = ['Hoje', 'Mês', 'Ano', 'Tudo'];
  // Lógica de filtro baseada na aba selecionada
  const notasFiltradas = mockNotas.filter(nota => {
    if (activeTab === 'Todas') return true;
    if (activeTab === 'Entradas' && nota.tipo === 'entrada') return true;
    if (activeTab === 'Saídas' && nota.tipo === 'saida') return true;
    return false;
  });

  // Como cada "card" de nota será desenhado na tela
  const renderItem = ({ item }: { item: typeof mockNotas[0] }) => {
    const isEntrada = item.tipo === 'entrada';

   

    return (
      <View style={styles.notaCard}>
        {/* Ícone e Descrição */}
        <View style={styles.notaInfo}>
          <View style={[
            styles.iconContainer, 
            { backgroundColor: isEntrada ? '#E8F5E9' : '#FFEBEE' }
          ]}>
            <Ionicons 
              name={isEntrada ? "arrow-down-circle" : "arrow-up-circle"} // Seta p/ baixo (dinheiro entrando) ou p/ cima (saindo)
              size={28} 
              color={isEntrada ? theme.colors.success : theme.colors.danger} 
            />
          </View>
          <View style={styles.notaTextos}>
            <Text style={styles.notaDescricao} numberOfLines={1}>{item.descricao}</Text>
            <Text style={styles.notaFavorecido}>{item.favorecido}</Text>
          </View>
        </View>

        {/* Valor e Data */}
        <View style={styles.notaValores}>
          <Text style={[
            styles.notaValor, 
            { color: isEntrada ? theme.colors.success : theme.colors.text.main }
          ]}>
            {isEntrada ? '+' : '-'} {item.valor}
          </Text>
          <Text style={styles.notaData}>{item.data}</Text>
        </View>
      </View>
    );
  };

 return (
  <View style={styles.container}>
    {/* Header Clássico */}
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color={theme.colors.white} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Extrato de Notas</Text>
    </View>

    {/* Novo Filtro de Período Otimizado */}
    <View style={styles.filterContainer}>
      {filters.map((filter) => {
        if (filter === 'Tudo') {
          return (
            <TouchableOpacity 
              key={filter}
              style={styles.filterButton}
              onPress={() => console.log('Abrir modal de calendário')}
            >
              <Ionicons name="options-outline" size={20} color={theme.colors.text.main} />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity 
            key={filter}
            style={[
              styles.filterButton, 
              activeFilter === filter && styles.filterButtonActive
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter && styles.filterTextActive
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>

    {/* Seletor de Abas (Tabs) */}
    <View style={styles.tabsContainer}>
        {(['Todas', 'Entradas', 'Saídas'] as TabType[]).map((tab) => (
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

      {/* Lista de Notas Fiscais */}
      <FlatList 
        data={notasFiltradas}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        // Mensagem caso o filtro não tenha resultados
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={48} color={theme.colors.text.light} />
            <Text style={styles.emptyText}>Nenhuma nota encontrada.</Text>
          </View>
        }
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
  },
  tabButtonActive: {
    backgroundColor: '#E8F5E9', // Fundo verdinho claro para a aba ativa
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
  notaCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.medium,
    marginBottom: verticalScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  notaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Faz a descrição ocupar o espaço disponível e não empurrar os valores pra fora
  },
  iconContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  notaTextos: {
    flex: 1,
    paddingRight: moderateScale(8),
  },
  notaDescricao: {
    fontSize: theme.typography.body,
    color: theme.colors.text.main,
    fontWeight: '600',
    marginBottom: 4,
  },
  notaFavorecido: {
    fontSize: theme.typography.small,
    color: theme.colors.text.light,
  },
  notaValores: {
    alignItems: 'flex-end',
  },
  notaValor: {
    fontSize: theme.typography.body,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notaData: {
    fontSize: theme.typography.small,
    color: theme.colors.text.light,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(60),
  },
  emptyText: {
    marginTop: verticalScale(16),
    color: theme.colors.text.light,
    fontSize: theme.typography.body,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: verticalScale(12),
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
});