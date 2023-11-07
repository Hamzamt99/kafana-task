import Card from 'react-bootstrap/Card';
import deals from '../../../assets/deals.jpg'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeDeal, getClaim, getDeals, updateDeal } from '../../../store/reducers/deals.reducer';
import Button from 'react-bootstrap/Button';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import './style.scss'

function Home() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.deals)
    const updaeDeal = useSelector(state => state.deals.updatedDeal)
    const [show, setShow] = useState(false);
    const [data, setData] = useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [refresh, setRefresh] = useState()
    const handleClick = (deal) => {
        setData(deal)
        handleShow()
    }

    const handleSubmit = (e) => {
        try {
            e.preventDefault()
            const obj = {
                name: e.target.name.value,
                Amount: e.target.Amount.value,
                Currency: e.target.Currency.value,
                Status: e.target.Status.value,
            }
            dispatch(updateDeal(data.id, obj))
        } catch (e) {
            console.log(e.message);
        }
    }

    const removeOneDeal = () => {
        try {
            dispatch(removeDeal(data.id))
            setRefresh(!refresh)
            handleClose()
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        dispatch(getDeals())
        dispatch(getClaim())
    }, [updaeDeal, refresh])

    return (
        <>
            <Row xs={1} md={2} lg={4} className="g-4 grid" >
                {state.allDeals.map((deal) => (
                    <Col key={deal.id}>
                        <Card className='grid-item'>
                            <Card.Img variant="top" src={deals} />
                            <Card.Body>
                                <Card.Title> {deal.name}</Card.Title>
                                <Card.Text>  <span style={{ fontWeight: 'bold' }}>Description: </span> {deal.Description}</Card.Text>
                                <Card.Text> <span style={{ fontWeight: 'bold' }}>Amount: </span> {deal.Amount}$</Card.Text>
                                <Card.Text> <span style={{ fontWeight: 'bold' }}>Currency: </span> {deal.Currency}</Card.Text>
                                <Card.Text>
                                    <span style={{ fontWeight: 'bold' }}>Status: </span>
                                    <span style={{ color: deal.Status === 'Active' ? 'green' : 'red' }}>
                                        {deal.Status}
                                    </span>
                                </Card.Text>
                                <Row className="justify-content-end">
                                    <Col xs="auto" >
                                        <Button onClick={() => handleClick(deal)}>Edit</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                {(() => {
                                    const timestamp = new Date(deal.createdAt);
                                    const date = timestamp.toISOString().split('T')[0];
                                    return (
                                        <small className="text-muted">
                                            <span style={{ fontWeight: 'bold' }}>posted at</span> {date}
                                        </small>
                                    );
                                })()}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            {
                data &&
                <Modal show={show} onHide={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>{data.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='modal-body'><span style={{ fontWeight: 'bold' }}>Description: </span>
                            <Editable defaultValue={data.name} style={{ borderBottom: '1px solid #000', padding: '1%', width: '50%' }}>
                                <EditablePreview />
                                <EditableInput name='name' />
                            </Editable>
                        </Modal.Body >
                        <Modal.Body className='modal-body'><span style={{ fontWeight: 'bold' }}>Amount: </span>
                            <Editable defaultValue={data.Amount} style={{ borderBottom: '1px solid #000', padding: '1%', width: '50%' }}>
                                <EditablePreview />
                                <EditableInput name='Amount' />
                            </Editable>
                        </Modal.Body>
                        <Modal.Body className='modal-body'><span style={{ fontWeight: 'bold' }}>Currency: </span>
                            <Editable defaultValue={data.Currency} style={{ borderBottom: '1px solid #000', padding: '1%', width: '50%' }}>
                                <EditablePreview />
                                <EditableInput name='Currency' />
                            </Editable>
                        </Modal.Body>
                        <Modal.Body className='modal-body'><span style={{ fontWeight: 'bold' }}>Status: </span>
                            <Form.Select id='Status' style={{ width: '50%' }}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Deleted">Deleted</option>
                                <option value="Expired">Expired</option>
                            </Form.Select>
                        </Modal.Body>
                        <Modal.Body className='modal-body'><span style={{ fontWeight: 'bold' }}>Delete Deal ?  </span>
                            <Button color='red' onClick={removeOneDeal}>Delete</Button>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} >
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose} type='submit'>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal >
            }
        </>
    );
}
export default Home;
