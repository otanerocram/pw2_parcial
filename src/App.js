import { useState, useEffect } from "react";
import { Row, Col, Card, Table, Container, Pagination, Spinner } from "react-bootstrap";

function App() {
    const endpoint_url = process.env.REACT_APP_API_URL;
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState({
        number: 0,
        size: 10,
    });

    const getPersons = async (number, size) => {
        const response = await fetch(`${endpoint_url}?page=${number + 1}&results=${size}`);
        const data = await response.json();
        setPersons(data.results);
        setIsLoading(false);
    };

    const handlePageChange = (action) => {
        let plus = 0;
        plus = action === "next" ? 1 : -1;
        setIsLoading(true);

        setTimeout(() => {
            setPage((prev) => ({
                number: prev.number + plus,
                size: prev.size,
            }));
        }, 1000);
    };

    useEffect(() => {
        getPersons(page.number, page.size);
    }, [page]);

    return (
        <Container>
            <Row>
                <Col>
                    <Card className="m-4 full-height">
                        <h1 className="text-center m-4">Examen Parcial Programacion Web II</h1>
                        <Card.Body>
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <Table striped bordered hover style={isLoading ? { opacity: "0.5" } : { opacity: 1 }}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                            <th>City</th>
                                            <th>Photo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {typeof persons !== "undefined" &&
                                            persons.map((el, idx) => (
                                                <tr key={idx}>
                                                    <td>{page.number * page.size + idx + 1}</td>
                                                    <td>{el.name.first}</td>
                                                    <td>{el.name.last}</td>
                                                    <td>{el.login.username}</td>
                                                    <td>{el.location.city}</td>
                                                    <td>
                                                        <img
                                                            className="profile-pic"
                                                            src={el.picture.thumbnail}
                                                            alt="thumbnail"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            )}

                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => handlePageChange("prev")}
                                    disabled={page.number === 0 ? true : false}
                                />
                                <Pagination.Item>{page.number + 1}</Pagination.Item>
                                <Pagination.Next onClick={() => handlePageChange("next")} />
                            </Pagination>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

const Loading = () => {
    return (
        <div className="loading-container d-flex justify-content-center">
            <div className="loading-cuota text-danger m-2">
                Loading... <Spinner animation="border" variant="danger" />
            </div>
        </div>
    );
};

export default App;
