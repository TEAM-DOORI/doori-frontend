import { View } from 'react-native';
import { Text } from '../../components/typography';
import { styles } from './community.styles';

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>커뮤니티</Text>
    </View>
  );
}

