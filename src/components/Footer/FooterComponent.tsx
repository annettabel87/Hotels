import { Footer } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import styles from './FooterComponent.module.css';
import { Divider } from 'antd';

export const FooterComponent = () => {
  return (
    <Footer className={styles.footer}>
      <Divider />
      <div className={styles.container}>
        <div>@ 2024</div>
        <div className={styles.github}>
          <Link to="https://github.com/annettabel87" className={styles.footerLink}>
            <img src="/githubIcon.svg" alt="github" className={styles.icon} />
          </Link>
        </div>
        <div>Анна Репешко</div>
      </div>
    </Footer>
  );
};
