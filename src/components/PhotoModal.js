// components/PhotoModal.js
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PhotoModal = ({ show, onHide, photo }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Photo Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {photo ? (
                    <div className="text-center">
                        <img src={photo.url} alt={photo.title} className="img-fluid" />
                        <p className="mt-2">{photo.title}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PhotoModal;
