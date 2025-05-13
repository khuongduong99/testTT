import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllAlbums } from '../service/Albumservice';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import PhotoModal from './PhotoModal'; // import component modal

const TableAlbums = () => {
    const [listAlbums, setListAlbums] = useState([]);
    const [usersMap, setUsersMap] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [photos, setPhotos] = useState([]);
    const itemsPerPage = 10;

    useEffect(() => {
        getAlbums();
        getUsers();
    }, []);

    const getAlbums = async () => {
        let res = await fetchAllAlbums();
        if (res && res.data) {
            setListAlbums(res.data);
        }
    };

    const getUsers = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            if (res && res.data) {
                const map = {};
                res.data.forEach(user => {
                    map[user.id] = user.name;
                });
                setUsersMap(map);
            }
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleShowPhotos = async (albumId) => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
            if (res && res.data) {
                setPhotos(res.data);
                setShowModal(true);
            }
        } catch (err) {
            console.error("Error fetching photos:", err);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAlbums = listAlbums.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(listAlbums.length / itemsPerPage);

    return (
        <>
            <Table striped bordered hover className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAlbums.map((item, index) => (
                        <tr key={`albums-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{usersMap[item.userId] || 'Unknown'}</td>
                            <td>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleShowPhotos(item.id)}
                                >
                                    Show
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="pagination d-flex justify-content-center mt-3">
                <button
                    className="btn btn-secondary mx-1"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className="align-self-center mx-2">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-secondary mx-1"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {/* Gọi modal */}
            <PhotoModal
                show={showModal}
                onHide={() => setShowModal(false)}
                photos={photos}
            />
        </>
    );
};

export default TableAlbums;
