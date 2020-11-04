import React, { useState } from 'react';
import { View } from 'remax/wechat';
import styles from './index.css';
import { useSetRecoilState } from 'recoil';
import { editorAtom } from '../../atoms/editor';

const Creator = props => {

  const setEditor = useSetRecoilState(editorAtom);

  const handleClick = () => {
    setEditor({ show: true, type: 'ADD' });
  }

  return (
    <View className={styles.wrap} onClick={handleClick}>
      <View className={styles.plusFirst} />
      <View className={styles.plusSecond} />
    </View>
  );
}

export default Creator;