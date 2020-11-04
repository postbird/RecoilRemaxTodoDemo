import React, { useState, useEffect } from 'react';
import { View, Input, Text } from 'remax/wechat';
import styles from './index.css';
import { useRecoilState } from 'recoil';
import { showToast } from 'remax/wechat';
import { todoListAtom } from '../../atoms';
import { editorAtom } from '../../atoms/editor';


const CreatorPanel = ({ }) => {
  const [hidden, setHidden] = useState(false);
  const [editor, setEditor] = useRecoilState(editorAtom);
  const [list, setTodoList] = useRecoilState(todoListAtom);
  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    setTodoText(editor.type === 'ADD' ? '' : editor.data.text);
  }, []);

  const handleClosePanel = () => {
    setHidden(true);
    setTimeout(() => {
      setEditor({ show: false });
    }, 300);
  }

  const handleInput = ev => {
    const value = ev.detail.value;
    setTodoText(value);
  }

  const handleOkClick = () => {
    if (!todoText || todoText.length === 0) {
      return showToast({ title: 'Failed: empty text', icon: 'none' });
    }
    const newList = editor.type === 'ADD'
      ? buildNewTodoItem(list, todoText)
      : buildModifyTodoItem(list, { ...editor.data, text: todoText });
    setTodoList(newList);
    handleClosePanel();
  }

  const handleCancelClick = () => {
    handleClosePanel();
  }

  const handleInputComfirm = () => {
    handleOkClick();
  }

  const handleTouchMove = (ev) => {
    ev.stopPropagation();
  }

  return (
    <View className={styles.wrap} >
      <View className={resolvePanelClass('mask', hidden)} onTouchStart={handleTouchMove} onTouchMove={handleTouchMove} />
      <View className={resolvePanelClass('panel', hidden)} >
        <View className={styles.inputWrap}>
          <Input
            onInput={handleInput}
            value={todoText}
            className={styles.input}
            showConfirmBar={true}
            adjustPosition={true}
            autoFocus={false}
            maxlength={100}
            placeholder={'Maximum length 100 characters...'}
            placeholderClassName={styles.inputPlaceHolder}
            onConfirm={handleInputComfirm}
          />
        </View>
        <View className={styles.actionWrap}>
          <View className={`${styles.actionBtn} ${styles.actionOk}`} onClick={handleOkClick}>
            <Text className={styles.actionTextOk}>{editor.type === 'ADD' ? 'Add' : 'Modify'}</Text>
          </View>
          <View className={`${styles.actionBtn} ${styles.actionCancel}`} onClick={handleCancelClick}>
            <Text className={styles.actionTextCancel}>Cancel</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const resolvePanelClass = (base, hidden) => {
  const inClass = `${base}In`;
  const outClass = `${base}Out`
  return hidden
    ? `${styles[base]} ${styles[outClass]}`
    : `${styles[base]} ${styles[inClass]}`;
}

const buildNewTodoItem = (todoList, text) => {
  return [
    ...todoList,
    {
      id: +new Date(),
      text,
      completed: false
    }
  ]
}

const buildModifyTodoItem = (todoList, newItem) => {
  return todoList.map(item => {
    return item.id === newItem.id ? newItem : item;
  });
}

export default CreatorPanel;