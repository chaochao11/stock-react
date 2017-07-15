import styles from './scan-box.less';

function ScanBox({ handleClick }) {
  return (
    <div className={styles.outside}>
      <div className={styles.scanbox}>
        <div style={{ textAlign: 'center', verticalAlign: 'center' }}>
          <span style={{ fontSize: '0.88rem' }}>二维码</span>
          <br />
          <span style={{ fontSize: '0.38rem' }}>扫描订单号</span>
        </div>
      </div>
    </div>
  );
}

export default ScanBox;
