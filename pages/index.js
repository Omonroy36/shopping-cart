import { Container, Row, Col } from "react-bootstrap";
export default function Home() {
  return (
    <Container>
      <div className="jumbotron bg-secondary rounded p-4">
        <h1 className="display-4">Welcome to the Shopping Cart App</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-4" />
        <p>Currently in development</p>
        <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </div>
    </Container>
  )
};
