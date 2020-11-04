import { getStorage, setStorage } from "remax/wechat";

const STORAGE_KEY = 'STORAGE_TOAST_KEY';

export const checkShowToastPanel = () => {
  return new Promise((resolve, reject) => {
    getStorage({
      key: STORAGE_KEY,
      fail: () => {
        resolve(true);
      },
      success: (res) => {
        if (!res || !res.data) {
          return resolve(true);
        }
        return reject(false);
      }
    }).catch(() => {
      return reject(false);
    })
  });
}

export const setShowToastPanelStorage = () => {
  return new Promise((resolve, reject) => {
    setStorage({
      key: STORAGE_KEY,
      data: +new Date()
    }).then().catch();
  });
}