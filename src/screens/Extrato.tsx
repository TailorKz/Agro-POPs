import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { theme } from "../theme";
import { moderateScale, verticalScale } from "../utils/responsive";

// Importação do Calendário
import { Calendar, LocaleConfig } from "react-native-calendars";

// Configurando o calendário para Português do Brasil
LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

type TabType = "Todas" | "Entradas" | "Saídas";

const mockNotas = [
  {
    id: "1",
    tipo: "entrada",
    data: "08/06/2026",
    descricao: "Venda de Soja (Sacas)",
    favorecido: "Cooperativa AgroAlfa",
    valor: "R$ 35.000,00",
  },
  {
    id: "2",
    tipo: "saida",
    data: "05/06/2026",
    descricao: "Adubo NPK e Defensivos",
    favorecido: "Agropecuária Sul Ltda",
    valor: "R$ 8.500,00",
  },
  {
    id: "3",
    tipo: "saida",
    data: "02/06/2026",
    descricao: "Manutenção Trator John Deere",
    favorecido: "Mecânica Agrícola Silva",
    valor: "R$ 3.200,00",
  },
  {
    id: "4",
    tipo: "entrada",
    data: "28/05/2026",
    descricao: "Venda de Milho (A Granel)",
    favorecido: "Moinho do Campo",
    valor: "R$ 18.400,00",
  },
  {
    id: "5",
    tipo: "saida",
    data: "25/05/2026",
    descricao: "Sementes de Milho Híbrido",
    favorecido: "Sementes Campeã",
    valor: "R$ 5.070,00",
  },
];

export function Extrato() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>("Todas");
  const [activeFilter, setActiveFilter] = useState("Mês");
  const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);

  const hoje = new Date().toISOString().split("T")[0];
  const [dataInicialStr, setDataInicialStr] = useState(hoje);
  const [dataFinalStr, setDataFinalStr] = useState(hoje);

  // Controla se o calendário está visível e para qual campo ele está servindo
  const [pickerAtivo, setPickerAtivo] = useState<
    "nenhum" | "inicial" | "final"
  >("nenhum");

  const filters = ["Hoje", "Mês", "Ano", "Tudo"];

  const notasFiltradas = mockNotas.filter((nota) => {
    if (activeTab === "Todas") return true;
    if (activeTab === "Entradas" && nota.tipo === "entrada") return true;
    if (activeTab === "Saídas" && nota.tipo === "saida") return true;
    return false;
  });

  // Função para formatar a data string
  const formatDataExibicao = (dataString: string) => {
    const partes = dataString.split("-");
    if (partes.length !== 3) return dataString;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const onDayPress = (day: any) => {
    if (pickerAtivo === "inicial") {
      setDataInicialStr(day.dateString);
    } else if (pickerAtivo === "final") {
      setDataFinalStr(day.dateString);
    }
    // Fecha o calendário imediatamente após a escolha
    setPickerAtivo("nenhum");
  };

  const renderItem = ({ item }: { item: (typeof mockNotas)[0] }) => {
    const isEntrada = item.tipo === "entrada";

    return (
      <View style={styles.notaCard}>
        <View style={styles.notaInfo}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isEntrada ? "#E8F5E9" : "#FFEBEE" },
            ]}
          >
            <Ionicons
              name={isEntrada ? "arrow-down-circle" : "arrow-up-circle"}
              size={28}
              color={isEntrada ? theme.colors.success : theme.colors.danger}
            />
          </View>
          <View style={styles.notaTextos}>
            <Text style={styles.notaDescricao} numberOfLines={1}>
              {item.descricao}
            </Text>
            <Text style={styles.notaFavorecido}>{item.favorecido}</Text>
          </View>
        </View>

        <View style={styles.notaValores}>
          <Text
            style={[
              styles.notaValor,
              {
                color: isEntrada
                  ? theme.colors.success
                  : theme.colors.text.main,
              },
            ]}
          >
            {isEntrada ? "+" : "-"} {item.valor}
          </Text>
          <Text style={styles.notaData}>{item.data}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Extrato de Notas</Text>
      </View>

      <View style={styles.filterContainer}>
        {filters.map((filter) => {
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

      <View style={styles.tabsContainer}>
        {(["Todas", "Entradas", "Saídas"] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={notasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="receipt-outline"
              size={48}
              color={theme.colors.text.light}
            />
            <Text style={styles.emptyText}>Nenhuma nota encontrada.</Text>
          </View>
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalFiltroVisivel}
        onRequestClose={() => {
          setModalFiltroVisivel(false);
          setPickerAtivo("nenhum"); // Reseta ao fechar o modal
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrar Período</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalFiltroVisivel(false);
                  setPickerAtivo("nenhum");
                }}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.colors.text.main}
                />
              </TouchableOpacity>
            </View>

            {/* --- SELETOR DE DATAS VISUAL --- */}
            <View style={styles.datePickerContainer}>
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Data Inicial</Text>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    pickerAtivo === "inicial" && styles.dateButtonActive,
                  ]}
                  onPress={() =>
                    setPickerAtivo(
                      pickerAtivo === "inicial" ? "nenhum" : "inicial",
                    )
                  }
                >
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.dateButtonText}>
                    {formatDataExibicao(dataInicialStr)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Data Final</Text>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    pickerAtivo === "final" && styles.dateButtonActive,
                  ]}
                  onPress={() =>
                    setPickerAtivo(pickerAtivo === "final" ? "nenhum" : "final")
                  }
                >
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.dateButtonText}>
                    {formatDataExibicao(dataFinalStr)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Calendário Customizável */}
            {pickerAtivo !== "nenhum" && (
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={onDayPress}
                  maxDate={hoje}
                  theme={{
                    todayTextColor: theme.colors.primary,
                    arrowColor: theme.colors.primary,
                    selectedDayBackgroundColor: theme.colors.primary,
                    textDayFontWeight: "500",
                    textMonthFontWeight: "bold",
                  }}
                  // Marca o dia que já está selecionado para o campo atual
                  markedDates={{
                    [pickerAtivo === "inicial" ? dataInicialStr : dataFinalStr]:
                      {
                        selected: true,
                        selectedColor: theme.colors.primary,
                      },
                  }}
                />
              </View>
            )}

            {/* Botão Final de Aplicar */}
            <TouchableOpacity
              style={[
                styles.primaryButton,
                { marginTop: pickerAtivo !== "nenhum" ? 16 : 32 },
              ]}
              onPress={() => {
                console.log(
                  `Buscando de ${dataInicialStr} até ${dataFinalStr}`,
                );
                setModalFiltroVisivel(false);
                setPickerAtivo("nenhum");
              }}
            >
              <Text style={styles.primaryButtonText}>Aplicar Filtro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    height: verticalScale(110),
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? verticalScale(40) : verticalScale(20),
  },
  backButton: {
    position: "absolute",
    left: moderateScale(16),
    top: Platform.OS === "ios" ? verticalScale(50) : verticalScale(30),
    padding: moderateScale(8),
    zIndex: 10,
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: theme.typography.subtitle,
    fontWeight: "bold",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
  },
  tabButtonActive: { backgroundColor: "#E8F5E9" },
  tabText: {
    color: theme.colors.text.light,
    fontSize: theme.typography.body,
    fontWeight: "600",
  },
  tabTextActive: { color: theme.colors.primary, fontWeight: "bold" },
  listContent: { padding: theme.spacing.medium },
  notaCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.medium,
    marginBottom: verticalScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  notaInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    justifyContent: "center",
    alignItems: "center",
    marginRight: moderateScale(12),
  },
  notaTextos: { flex: 1, paddingRight: moderateScale(8) },
  notaDescricao: {
    fontSize: theme.typography.body,
    color: theme.colors.text.main,
    fontWeight: "600",
    marginBottom: 4,
  },
  notaFavorecido: {
    fontSize: theme.typography.small,
    color: theme.colors.text.light,
  },
  notaValores: { alignItems: "flex-end" },
  notaValor: {
    fontSize: theme.typography.body,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notaData: {
    fontSize: theme.typography.small,
    color: theme.colors.text.light,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(60),
  },
  emptyText: {
    marginTop: verticalScale(16),
    color: theme.colors.text.light,
    fontSize: theme.typography.body,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: verticalScale(12),
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  filterButton: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(20),
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  filterButtonActive: { backgroundColor: theme.colors.primary },
  filterText: {
    fontSize: theme.typography.small,
    color: theme.colors.text.main,
    fontWeight: "600",
  },
  filterTextActive: { color: theme.colors.white },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.card,
    borderTopRightRadius: theme.borderRadius.card,
    padding: theme.spacing.large,
    paddingBottom: verticalScale(34),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  modalTitle: {
    fontSize: theme.typography.subtitle,
    fontWeight: "bold",
    color: theme.colors.text.main,
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

  // --ESTILOS PARA O CALENDÁRIO --
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
    gap: moderateScale(16),
  },
  dateColumn: { flex: 1 },
  dateLabel: {
    fontSize: theme.typography.small,
    color: theme.colors.text.light,
    marginBottom: verticalScale(8),
    fontWeight: "600",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: theme.borderRadius.button,
    paddingHorizontal: moderateScale(12),
    height: verticalScale(48),
  },
  dateButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: "#E8F5E9",
  },
  dateButtonText: {
    marginLeft: moderateScale(8),
    fontSize: theme.typography.body,
    color: theme.colors.text.main,
  },
  calendarContainer: {
    borderRadius: theme.borderRadius.card,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: verticalScale(16),
  },
});
