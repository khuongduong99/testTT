import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import TableAlbums from './components/TableAlbums';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [selectedTab, setSelectedTab] = useState('users'); // 'users' hoặc 'albums'

  return (
    <div className='app-container'>
      <Header />
      <Row className='conten'>
        {/* Sidebar bên trái */}
        <Col xs={2} className="sidebar bg-light p-3">
          <Button
            variant={selectedTab === 'albums' ? 'primary' : 'outline-primary'}
            className="mb-2 w-100"
            onClick={() => setSelectedTab('albums')}
          >
            Albums
          </Button>
          <Button
            variant={selectedTab === 'users' ? 'primary' : 'outline-primary'}
            className="mb-2 w-100"
            onClick={() => setSelectedTab('users')}
          >
            Users
          </Button>

        </Col>

        {/* Nội dung bên phải */}
        <Col xs={10} className="content-area p-3">
          {selectedTab === 'users' && <TableUsers />}
          {selectedTab === 'albums' && <TableAlbums />}
        </Col>
      </Row>
    </div>
  );
}

export default App;
