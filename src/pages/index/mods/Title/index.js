import React from 'react';
import { View, Image } from 'remax/wechat';
import styles from './index.css';
import logo from '../../../../../public/icon.png';

const Title = props => {
  return (
    <View className={styles.wrap}>
      <Image src={logo} className={styles.logo} />
    </View>
  );
}

export default Title;