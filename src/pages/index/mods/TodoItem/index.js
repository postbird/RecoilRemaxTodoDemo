import React from 'react';
import { View, Text, Checkbox, CheckboxGroup, Icon, showModal } from 'remax/wechat';
import styles from './index.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { todoListAtom } from '../../atoms';
import { editorAtom } from '../../atoms/editor';

const TodoItem = ({ todo }) => {
  const [list, setList] = useRecoilState(todoListAtom);
  const setEditor = useSetRecoilState(editorAtom);

  if (!todo) {
    return null;
  }

  const handleCheckboxClick = () => {
    const newList = resolveReplaceTodoList(list, { ...todo, completed: !todo.completed });
    setList(newList);
  }

  const handleTextClick = () => {
    setEditor({ show: true, type: 'MODIFY', data: todo });
  }

  const handleDeleteClick = () => {
    return showModal({
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      confirmColor: '#FF5000',
      content: 'Delete?',
      success: ({ confirm }) => {
        if (confirm) {
          const newList = resolveRemoveTodoList(list, todo);
          setList(newList);
        }
      },
      fail: () => { }
    });
  }

  return (
    <>
      <View className={styles.wrap}>
        <View className={styles.itemWrapLeft}>
          <CheckboxGroup onChange={handleCheckboxClick} >
            <Checkbox checked={todo.completed} className={styles.checkbox} />
          </CheckboxGroup>
          <Text className={resolveTextClass(todo.completed)} onClick={handleTextClick}>{todo.text}</Text>
        </View>
        <View onClick={handleDeleteClick} >
          <Icon type="cancel" className={styles.deleteIcon} color="#CCC" />
        </View>
      </View>
      <View className={styles.line} />
    </>
  );
};

const resolveTextClass = (completed) => {
  return `${styles.text} ${completed ? styles.textCompleted : ''}`;
}

const resolveReplaceTodoList = (list, newItem) => {
  return list.map(item => {
    return item.id === newItem.id ? newItem : item;
  });
}

const resolveRemoveTodoList = (list, deleteItem) => {
  return list.filter(item => item.id !== deleteItem.id)
}

export default TodoItem;