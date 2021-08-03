import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

export async function getStaticProps() {
    const res = await fetch(`http://localhost:5000/api/product/products`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return {
        props: {
            products: data.data,
        }
    }
}

export default function Product({ products }) {
    const [show, setShow] = useState(false);
    const [p, setProducts] = useState(products);
    const [product, setProduct] = useState({
        name:"",
        pricing:0,
        weight:0,
        color:""
    });

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        const {target: { name, value} } = event;
        setProduct({
            ...product,
            [name]: value
        })
    };

    const onSubmit = async (e) => {
        const res = await fetch(`http://localhost:5000/api/product/new_product`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
            method:'POST'
        });
        const data = await res.json();
        if(data) listProducts();
    }

    const listProducts = async () => {
        const res = await fetch(`http://localhost:5000/api/product/products`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        setProducts(data.data);
    }

    const deleteProduct = async (id) => {
        const res = await fetch(`http://localhost:5000/api/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method:"DELETE"
        });
        const data = await res.json();
        if(data) listProducts()
    }

    return (
        <Container>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmit();
                }}>
                    <Modal.Header>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name="name" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="number" placeholder="Price" name="pricing" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="weight">
                            <Form.Label>Product Weight</Form.Label>
                            <Form.Control type="number" placeholder="Weight" name="weight" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="color">
                            <Form.Label>Product Color</Form.Label>
                            <Form.Control type="text" placeholder="Color"  name="color" onChange={handleChange}/>
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
                <Col>
                    <Button variant="primary" onClick={handleShow} style={{marginBottom:"20px", marginTop:"10px" }}>
                        Create Product
                    </Button>
                </Col>
            </Row>
            <Row >
                {
                    p && p.map((product, index) => {
                        return <Col md={4} key={index} style={{marginBottom:"20px", marginTop:"10px" }}>
                            <Card>
                                <Card.Img variant="top" src="http://carniceriadearte.cl/web/wp-content/uploads/2015/01/shop-placeholder.png" />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        <ul>
                                            <li>
                                                Color : {product.color}
                                            </li>
                                            <li>
                                                Weight : {product.weight}
                                            </li>
                                        </ul>
                                    </Card.Text>
                                    <Button variant="primary">${product.pricing || 1000}</Button>
                                    <Button variant="secondary" style={{ marginLeft: "5px" }} onClick={()=> deleteProduct(product.id)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    })
                }
            </Row>
        </Container>
    )
};


