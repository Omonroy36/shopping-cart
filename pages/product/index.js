import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Product(props) {
    const [products, setProducts] = useState([]);
    useEffect(()=> {
        console.log(props)
       
    }, [])
    return (
        <Container>
            <Row>

            </Row>
        </Container>
    )
};

export async function getInitialProps() {
    const res = await fetch(`http://localhost:3000/api/product/products`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log(res.json())
    const data = await res;

    return {
        props: {
            data: 'test',
        }
    }
}
