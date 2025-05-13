import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../service/Userservice';
import { Modal, Button } from 'react-bootstrap';
import TableAlbumsForUser from './TableAlbumsForUser'; // Import component TableAlbumsForUser

import './TableUsers.scss';

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [showModal, setShowModal] = useState(false); // Để điều khiển modal
    const [selectedUserId, setSelectedUserId] = useState(null); // Để lưu userId đã chọn

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchAllUser();
        if (res && res.data) {
            setListUsers(res.data);
        }
    };

    const handleShowModal = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true); // Hiển thị modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Đóng modal
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers.map((item, index) => (
                        <tr key={`users-${index}`}>
                            <td>{item.id}</td>
                            <td>
                                <img
                                    src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${item.name}`}
                                    alt={item.name}
                                    width="30"
                                />
                            </td>
                            <td>{item.name}</td>
                            <td><a href={`mailto:${item.email}`}>{item.email}</a></td>
                            <td><a href={`tel:${item.phone}`}>{item.phone}</a></td>
                            <td><a href={`https://${item.website}`}>{item.website}</a></td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={() => handleShowModal(item.id)}>
                                    Show
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal khi nhấn Show */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Albums</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Hiển thị bảng album của user đã chọn */}
                    {selectedUserId && <TableAlbumsForUser userId={selectedUserId} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TableUsers;
