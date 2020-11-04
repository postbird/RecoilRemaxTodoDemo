import React, { useEffect, useState } from 'react';
import { View, Text, } from 'remax/wechat';
import styles from './index.css';
import { checkShowToastPanel, setShowToastPanelStorage } from './utils';

const CN_TEXT = '本应用仅用于展示由 Recoil 和 Remax 框架开发的 Todo 应用程序, 不会进行网络数据传输与分享，且不会进行本地数据存储。';
const EN_TEXT = 'This application is only used to showcase the Todo application developed by the Recoil and Remax frameworks. It will not perform network data transmission and sharing, and will not perform local data storage.';


const ToastPanel = () => {

  const [show, setShow] = useState(false);

  useEffect(() => {
    checkShowToastPanel().then(() => {
      setShow(true);
    }).catch(() => {
      setShow(false);
    })
  }, []);

  const handleTouchStart = (ev) => {
    ev.stopPropagation();
  }

  const handleClick = () => {
    setShow(false);
    setShowToastPanelStorage();
  }

  if (!show) {
    return null;
  }

  return (
    <View className={styles.wrap} onTouchStart={handleTouchStart} onTouchMove={handleTouchStart}>
      <View className={styles.container}>
        <Text className={styles.text}>{CN_TEXT}</Text>
        <Text className={styles.text}>{EN_TEXT}</Text>
        <Text className={styles.close} onClick={handleClick}>OK</Text>
      </View>
    </View>
  )
}

export default ToastPanel;