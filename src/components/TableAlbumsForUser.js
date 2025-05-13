import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import PhotoModal from './PhotoModal';

const TableAlbumsForUser = ({ userId }) => {
    const [listAlbums, setListAlbums] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if (userId) {
            fetchAlbumsForUser(userId);
        }
    }, [userId]);

    const fetchAlbumsForUser = async (userId) => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
            if (res && res.data) {
                setListAlbums(res.data);
            }
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    };

    const handleShowPhoto = async (albumId) => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/photos/${albumId}`);
            if (res && res.data) {
                setPhoto(res.data);
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error fetching photo:", error);
        }
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listAlbums.length > 0 ? (
                        listAlbums.map((album, index) => (
                            <tr key={index}>
                                <td>{album.id}</td>
                                <td>{album.title}</td>
                                <td>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => handleShowPhoto(album.id)}
                                    >
                                        Show
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No albums found for this user.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Gọi component Modal đã tách */}
            <PhotoModal
                show={showModal}
                onHide={() => setShowModal(false)}
                photo={photo}
            />
        </>
    );
};

export default TableAlbumsForUser;
