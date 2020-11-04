import * as React from 'react';
import { View, ScrollView } from 'remax/wechat';
import Title from './mods/Title';
import Tab from './mods/Tab';
import Creator from './mods/Creator';
import TodoItem from './mods/TodoItem';
import TodoCreatorPanel from './mods/CreatorPanel';
import ToastPanel from './mods/ToastPanel';
import styles from './index.css';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { todoFilterSelector, todoFilterAtom } from './atoms';
import { editorAtom } from './atoms/editor';

const HomePage = () => {

  const todoList = useRecoilValue(todoFilterSelector);
  const editor = useRecoilValue(editorAtom);

  return (
    <View className={styles.app}>
      <ScrollView className={styles.app}>
        <Title />
        <Tab />
        {/* <Tab /> */}
        {
          todoList.map(item => <TodoItem key={item.id} todo={item} />)
        }
      </ScrollView>
      <Creator />
      {
        editor.show ? <TodoCreatorPanel /> : null
      }
      <ToastPanel />
    </View>
  )
}

export default () => {
  return (
    <RecoilRoot>
      <HomePage />
    </RecoilRoot>
  );
};
