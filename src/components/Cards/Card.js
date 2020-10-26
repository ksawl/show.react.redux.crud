import './Card.scss';

import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Card,
    Col,
    Collapse,
    Form,
} from 'react-bootstrap';
import React, { useState } from 'react';
import { idItemDelete, showModalDelete, updatePost } from '../../redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const OneCard = ({ post, updatePost, showModalDelete, idItemDelete }) => {
    const [isEdit, setIsEdit] = useState(false);
    /** let [item, setItem] = useState(
        {
            postId: post,
            postImg: `/images/${post}.jpg`,
            postTitle: `Recipe Number-${post}`,
            postPrice: post,
            postDescription: `Some quick example text to build on the card title and make up the bulk of the card's content.${post}`,
        },
    ); */
    let [item, setItem] = useState(post);
    // console.log('post: ', post);
    // console.log('item: ', item);

    const handleShowEdit = (event) => {
        setIsEdit(true);
    };
    const handleShowView = () => {
        setItem({ ...post });
        setIsEdit(false);
    };
    const handleShowDelete = (event) => {
        event.preventDefault();

        idItemDelete(item.postId);
        showModalDelete(true);
    };

    const handlerChangeInput = (event) => {
        setItem({ ...item, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        updatePost(item);
        setIsEdit(false);
    };

    return (
        <Col xs={12} md={6} lg={4} className="mt-3">
            <Card border="info">
                <Form onSubmit={handleSubmit}>
                    <Card.Img variant="top" src={item.postImg} />

                    <Card.Body>
                        <Collapse in={isEdit}>
                            <Form.Group controlId="postImg">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image url"
                                    name="postImg"
                                    value={item.postImg}
                                    onChange={handlerChangeInput}
                                />
                            </Form.Group>
                        </Collapse>

                        <Collapse in={!isEdit}>
                            <Card.Title>{item.postTitle}</Card.Title>
                        </Collapse>
                        <Collapse in={isEdit}>
                            <Form.Group controlId="postTitle">
                                <Form.Control
                                    type="text"
                                    placeholder="Title"
                                    name="postTitle"
                                    value={item.postTitle}
                                    onChange={handlerChangeInput}
                                />
                            </Form.Group>
                        </Collapse>

                        <Collapse in={!isEdit}>
                            <Card.Subtitle>
                                Price: ${item.postPrice}
                            </Card.Subtitle>
                        </Collapse>
                        <Collapse in={isEdit}>
                            <Form.Group controlId="postPrice">
                                <Form.Control
                                    type="number"
                                    placeholder="Price"
                                    name="postPrice"
                                    value={item.postPrice}
                                    onChange={handlerChangeInput}
                                />
                            </Form.Group>
                        </Collapse>

                        <Collapse in={!isEdit}>
                            <Card.Text>{item.postDescription}</Card.Text>
                        </Collapse>
                        <Collapse in={isEdit}>
                            <Form.Group controlId="postDescription">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Description"
                                    name="postDescription"
                                    value={item.postDescription}
                                    onChange={handlerChangeInput}
                                />
                            </Form.Group>
                        </Collapse>
                    </Card.Body>

                    <Card.Footer>
                        <ButtonToolbar
                            className="flex-column"
                            aria-label="Toolbar with Button groups"
                        >
                            <Collapse in={!isEdit}>
                                <ButtonGroup
                                    className="justify-content-between"
                                    aria-label="View page Button group"
                                >
                                    <Button
                                        onClick={handleShowEdit}
                                        variant="light"
                                        size="lg"
                                        aria-label="Edit"
                                        block
                                    >
                                        Edit
                                    </Button>
                                </ButtonGroup>
                            </Collapse>

                            <Collapse in={isEdit}>
                                <ButtonGroup
                                    className="justify-content-between"
                                    aria-label="Edit page Button group"
                                >
                                    <Button
                                        onClick={handleShowDelete}
                                        variant="danger"
                                        size="lg"
                                        aria-label="Delete"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        type="submit"
                                        size="lg"
                                        aria-label="Upgrate"
                                    >
                                        Upgrate
                                    </Button>
                                    <Button
                                        onClick={handleShowView}
                                        variant="light"
                                        className="close btn-close"
                                        size="lg"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </Button>
                                </ButtonGroup>
                            </Collapse>
                        </ButtonToolbar>
                    </Card.Footer>
                </Form>
            </Card>
        </Col>
    );
};
/* 
const mapStateToProps = (state) => ({
    showModalDelete: state.cards.showModalDelete,
}); */

const mapDispatchToProps = {
    updatePost,
    idItemDelete,
    showModalDelete,
};

export default connect(null, mapDispatchToProps)(OneCard);
