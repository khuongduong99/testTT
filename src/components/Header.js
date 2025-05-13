import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const Header = (props) => {
    return (
        <Navbar className="bg-body-tertiary header">
            <Navbar.Brand href="#home"><img src='https://tse3.mm.bing.net/th?id=OIP.60RWm2Rm72xsavyqRiJCxwHaEK&pid=Api&P=0&h=220' alt='logo' width={50}></img>Logo</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {/* <Navbar.Text>
                    Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text> */}
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Header;