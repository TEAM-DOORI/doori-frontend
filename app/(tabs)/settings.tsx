import { View } from 'react-native';
import { Text } from '../../components/typography';
import { styles } from './settings.styles';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정</Text>
    </View>
  );
}

