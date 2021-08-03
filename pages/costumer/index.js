import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

export async function getStaticProps(context) {
    const res = await fetch(`http://localhost:5000/api/costumer/costumers`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return {
        props: {
            costumers: data.data,
        }
    }
}

export default function Costumer({ costumers }) {
    const [show, setShow] = useState(false);
    const [c, setCostumers] = useState(costumers);
    const [costumer, setCostumer] = useState({
        firstName:"",
        lastName:"",
        email:"",
        address:""
    });
    const [type, setType] = useState('');

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        const {target: { name, value} } = event;
        setCostumer({
            ...costumer,
            [name]: value
        })
    };

    const onSubmit = () => {
        if(type === 'edit') onUpdate();
        else if ( type === 'create') onCreate();
    }

    const onCreate = async () => {
        const res = await fetch(`http://localhost:5000/api/costumer/new_costumer`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(costumer),
            method:'POST'
        });
        const data = await res.json();
        if(data){ 
            listCostumers();
            setShow(false);
        };
        setCostumer({
            firstName:"",
            lastName:"",
            email:"",
            address:""
        });
    }

    const onUpdate = async () => {
        const {id, ...rest } = costumer;
        const res = await fetch(`http://localhost:5000/api/costumer/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method:"PUT",
            body:JSON.stringify(rest)
        });

        const data = await res.json();

        if(data){ 
            listCostumers();
            setShow(false);
        }

        setCostumer({
            firstName:"",
            lastName:"",
            email:"",
            address:""
        });
    };

    const listCostumers = async () => {
        const res = await fetch(`http://localhost:5000/api/costumer/costumers`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        setCostumers(data.data);
    }

    const deleteCostumer = async (id) => {
        const res = await fetch(`http://localhost:5000/api/costumer/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method:"DELETE"
        });
        const data = await res.json();
        if(data) listCostumers()
    }

    return (
        <Container>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmit();
                    setType('');
                }}>
                    <Modal.Header>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" name="firstName" onChange={handleChange} value={costumer.firstName}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" name="lastName" onChange={handleChange} value={costumer.lastName}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" name="email" onChange={handleChange} value={costumer.email}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address"  name="address" onChange={handleChange} value={costumer.address}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Row>
                <Col md={12}>
                    <h1>
                        Costumers Profile
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={()=>{ handleShow(); setType('create')} } style={{marginBottom:"20px", marginTop:"10px" }}>
                        Create Costumer
                    </Button>
                </Col>
            </Row>
            <Row>
                {
                  c &&  c.map(costumer => {
                        return <Col md={12} key={costumer.id} style={{marginBottom:"20px", marginTop:"10px" }}>
                        <Card>
                            <Card.Header>Costumer Data</Card.Header>
                            <Card.Body>
                                <Card.Title>{costumer.firstName} {costumer.lastName}</Card.Title>
                                <Card.Text>
                                   Email: {costumer.email} Address: {costumer.address}
                                </Card.Text>
                                <Button variant="warning" onClick={()=> deleteCostumer(costumer.id)}>Delete</Button>
                                <Button variant="primary" style={{ marginLeft: "5px" }} onClick={()=>{
                                    handleShow(); 
                                    setType('edit'); 
                                    setCostumer(costumer);
                                    }}>Edit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    })
                }
            </Row>
        </Container>
    )
};