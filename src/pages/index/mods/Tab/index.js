import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';
import styles from './index.css';
import { useRecoilValue, useRecoilState } from 'recoil';
import { todoStatsSelector, todoFilterAtom } from '../../atoms/index';

const Tab = () => {

  const tabStats = useRecoilValue(todoStatsSelector);
  const [filter, setFilter] = useRecoilState(todoFilterAtom);

  const handleClick = (filter) => {
    return () => {
      setFilter(filter);
    }
  }

  return (
    <View className={styles.wrap}>
      {
        tabStats.map(tab => (
          <View className={resolveTabItemClassName(filter, tab.filter)} key={tab.filter} onClick={handleClick(tab.filter)}>
            <Text className={styles.tabName}>{tab.name}</Text>
            <Text className={styles.tabCount}>({tab.count})</Text>
          </View>
        ))
      }
    </View>
  );
}

const resolveTabItemClassName = (filter, tabFilter) => {
  return `${styles.tabItem} ${filter === tabFilter ? styles.tabItemActive : ''}`;
}

export default Tab;