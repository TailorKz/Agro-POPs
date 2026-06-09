import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { theme } from '../theme';
import { moderateScale, verticalScale } from '../utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Tipagem das mensagens
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
};

export function Chat() {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  
  // O estado inicial já começa com o bot dando "Bom dia"
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou seu assistente fiscal. Para emitir uma nota, me diga o que você vendeu, para quem e o valor.',
      sender: 'bot',
      time: '08:00'
    }
  ]);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Adiciona a mensagem do usuário na tela
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simula a resposta da IA processando a nota (Isso virá do Spring Boot depois)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Entendido! Estou gerando a nota fiscal para essa venda. Aguarde um instante...',
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';

    return (
      <View style={[
        styles.messageBubble, 
        isUser ? styles.messageUser : styles.messageBot
      ]}>
        <Text style={[styles.messageText, isUser && styles.messageTextUser]}>
          {item.text}
        </Text>
        <Text style={[styles.messageTime, isUser && styles.messageTimeUser]}>
          {item.time}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Estilo WhatsApp */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={theme.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Assistente de Notas</Text>
          <Text style={styles.headerSubtitle}>Online</Text>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatArea} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Fundo do Chat (Um cinza bem clarinho com padrão) */}
        <View style={styles.chatBackground}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messageList}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Digite os dados da nota..."
              placeholderTextColor={theme.colors.text.light}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            {/* Ícone de Anexo se o input estiver vazio */}
            {inputText === '' && (
              <TouchableOpacity style={styles.attachButton}>
                <Ionicons name="document-outline" size={24} color={theme.colors.text.light} />
              </TouchableOpacity>
            )}
          </View>

          {/* Botão de Enviar (Texto) ou Gravar Áudio (Microfone) */}
          <TouchableOpacity 
            style={[styles.actionButton, inputText ? styles.sendButton : styles.micButton]}
            onPress={inputText ? handleSend : () => console.log('Iniciar gravação de áudio')}
          >
            <Ionicons 
              name={inputText ? "send" : "mic"} 
              size={22} 
              color={theme.colors.white} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary, // O fundo de segurança para o SafeArea
  },
  header: {
    height: verticalScale(100),
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? verticalScale(40) : verticalScale(20),
    paddingHorizontal: moderateScale(16),
  },
  backButton: {
    padding: moderateScale(8),
    marginRight: moderateScale(8),
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: theme.typography.subtitle,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: theme.colors.secondary,
    fontSize: theme.typography.small,
  },
  chatArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  chatBackground: {
    flex: 1,
    backgroundColor: '#EBE5DE', // Cor clássica de fundo de chat
  },
  messageList: {
    padding: theme.spacing.medium,
    paddingBottom: verticalScale(20),
  },
  messageBubble: {
    maxWidth: '80%',
    padding: moderateScale(12),
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageBot: {
    backgroundColor: theme.colors.white,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4, // Faz a "ponta" do balão
  },
  messageUser: {
    backgroundColor: '#DCF8C6', // Verde clássico do usuário
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: theme.typography.body,
    color: theme.colors.text.main,
    lineHeight: 22,
  },
  messageTextUser: {
    color: '#1A1A1A',
  },
  messageTime: {
    fontSize: moderateScale(10),
    color: theme.colors.text.light,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  messageTimeUser: {
    color: '#6B8E5C', // Cinza esverdeado para contrastar no fundo verde
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: theme.spacing.small,
    backgroundColor: theme.colors.background,
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.white,
    borderRadius: moderateScale(24),
    marginRight: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    paddingVertical: Platform.OS === 'ios' ? verticalScale(12) : verticalScale(8),
    minHeight: verticalScale(48),
    maxHeight: verticalScale(120), // Permite crescer se digitar muito
  },
  textInput: {
    flex: 1,
    fontSize: theme.typography.body,
    color: theme.colors.text.main,
    paddingTop: 0,
    paddingBottom: 0,
  },
  attachButton: {
    paddingLeft: moderateScale(10),
    paddingBottom: moderateScale(2),
  },
  actionButton: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(2),
  },
  micButton: {
    backgroundColor: theme.colors.primary, // Verde agro
  },
  sendButton: {
    backgroundColor: '#0084FF', // Azul para indicar envio de texto
  },
});