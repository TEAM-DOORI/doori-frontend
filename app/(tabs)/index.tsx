import { View } from 'react-native';
import { Text } from '../../components/typography';
import { styles } from './index.styles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DOORI</Text>
      <Text style={styles.description}>스타터 예제 코드를 정리한 기본 홈 화면입니다.</Text>
    </View>
  );
}

