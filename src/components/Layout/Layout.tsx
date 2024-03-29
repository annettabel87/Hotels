import { Outlet } from 'react-router-dom';
import { Layout, Flex } from 'antd';
import { HeaderComponent } from '../Header/HeaderComponent';
import { FooterComponent } from '../Footer/FooterComponent';
const { Content } = Layout;
import styles from './Layout.module.css';
import { SearchPanel } from '../SearchPanel/SearchPanel';

const LayoutComponent = () => {
  return (
    <Flex vertical justify="center">
      <Layout className={styles.layoutStyle}>
        <HeaderComponent />
        <Content className={styles.content}>
          <SearchPanel />
          <Outlet />
        </Content>
        <FooterComponent />
      </Layout>
    </Flex>
  );
};

export default LayoutComponent;
