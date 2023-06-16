import { Route, Routes } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { menu } from './menu';
import Orders from './routes/Orders/Orders';
import NotFound from './routes/NotFound';
import Tables from './routes/Tables/Tables';
import Waiters from './routes/Waiters/Waiters';
import Dishes from './routes/Dishes/Dishes';
import './App.css';

function App() {
  return (
    <Layout>
      <Layout.Header className="header">
        <Menu mode="horizontal" theme="light" items={menu} />
      </Layout.Header>
      <Layout.Content>
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/waiters" element={<Waiters />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout.Content>
    </Layout>
  );
}

export default App;
