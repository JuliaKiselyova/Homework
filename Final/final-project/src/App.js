import { NavLink } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { menu } from './menu';
import Orders from './routes/Orders/Orders';
import NotFound from './routes/NotFound';
import Tables from './routes/Tables/Tables';
import Waiters from './routes/Waiters/Waiters';
import Dishes from './routes/Dishes/Dishes';
import Home from './routes/Home';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header className="header">
        <NavLink exact to="/" className="logo">
          Restaurant
        </NavLink>
        <Menu mode="horizontal" theme="light" items={menu} className="menu-container">
          {menu.map((item) => (
            <Menu.Item key={item.key} className={item.className}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/waiters" element={<Waiters />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
