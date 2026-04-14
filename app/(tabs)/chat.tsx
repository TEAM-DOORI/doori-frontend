import { View } from 'react-native';
import { Text } from '../../components/typography';
import { styles } from './chat.styles';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>채팅</Text>
    </View>
  );
}

