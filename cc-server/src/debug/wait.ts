/** 待機時間（検証用） */
const WAIT_MSEC = 1000;

/**
 * 検証用機能です。
 * サーバー側処理にあえて遅延を含めることで、通信時間の遅延を再現します。
 */
export const wait = () =>
  new Promise((resolve) => {
    setTimeout(resolve, WAIT_MSEC);
  });
