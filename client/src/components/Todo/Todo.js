import React, { useEffect, useState } from 'react';
import { Jumbotron, Row, Col, FormGroup, FormLabel, Button, InputGroup, FormControl, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './Todo.css';
import { Link } from 'react-router-dom';
import { change } from 'redux-form';
import {
    getAllTodo, addTodoSocket, addTodo, deleteTodoSocket, deleteTodo, changeStatusTodoSocket,
    changeStatusTodo, updateTodo
} from '../../actions/todo'
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import TodoEdit from '../TodoEdit/TodoEdit'
import { getUserData, userLogout } from '../../actions/user'

const socket = io('http://localhost:4000',
    {
        upgrade: false,
        transports: ['websocket'],
        reconnection: true,
        forceNew: false
    });

const renderField = ({ input, label, type, meta: { touched, error }, placeholder }) => {
    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            <FormControl {...input} placeholder={placeholder} type={type} />
            {touched && error && <span className={'errorColor'} >{error}</span>}
        </FormGroup>
    )
}

let Todo = (props) => {
    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todo.todoList)
    const user = useSelector(state => state.user.user)
    const { history } = props;

    const [show, setShow] = useState(false);
    const [taskName, setTaskName] = useState('');

    useEffect(() => {
        dispatch(getUserData(history))
        dispatch(getAllTodo(history))
    }, [])


    useEffect(() => {
        socket.on('todoAdded', (data) => {
            dispatch(addTodo(data));
        })

        socket.on('todoDelete', (data) => {
            dispatch(deleteTodo(data));
        })

        socket.on('todoStatusChange', (data) => {
            dispatch(changeStatusTodo(data));
        })

        socket.on('todoUpdate', (data) => {
            dispatch(updateTodo(data));
        })
    }, [])


    const handleAddTodo = () => {
        if (!taskName || !user) {
            return;
        }

        dispatch(addTodoSocket(socket, taskName, user.name, user._id))
        setTaskName('')
    }

    const handleUpdateTodo = (todo) => {
        dispatch(change('todoEdit', 'todoName', todo.name))
        dispatch(change('todoEdit', 'todoId', todo._id))
        setShow(true);
    }

    const handleDeleteTodo = (todoId) => {
        dispatch(deleteTodoSocket(socket, todoId))
    }

    const handleStatusChange = (todoStatus, todoId) => {
        const selectedVal = todoStatus == 'inprogress' ? 'done' : 'inprogress';
        dispatch(changeStatusTodoSocket(socket, todoId, selectedVal))

    }

    const handleLogout = () => {
        dispatch(userLogout())
        history.push('/')
    }

    const handleClose = () => setShow(false)

    return (
        <div className='bg-info'>
            <div className='todo-cont'>
                <div className='todo-box'>
                    <TodoEdit show={show} handleClose={handleClose} socket={socket} />
                    <div className='todo-heading'>
                        <h1>Todo List</h1>
                    </div>
                    <div className='input-cont'>
                        <InputGroup size="lg" className="mb-3">
                            <FormControl
                                placeholder="Add your Todo tasks"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setTaskName(e.target.value)}
                                value={taskName}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={handleAddTodo}>Add +</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                    <div>
                        {
                            todoList && todoList.length === 0 &&
                            <div className='empty-data'>
                                <h3>No data found...</h3>
                            </div>
                        }
                        {todoList && todoList.length > 0 && todoList.map((todo, index) => {
                            return (
                                <div key={todo && todo._id}>
                                    <Jumbotron fluid className='jumbo-box'>
                                        <Container>
                                            <Row className='row-pos'>
                                                <Col xs={6} sm={6} md={9} lg={9} >
                                                    <Row>
                                                        <Col>{todo.name}</Col>
                                                        <Col>Created by: {todo.userName}</Col>
                                                        <Col>Date: {todo && todo.createdAt && todo.createdAt.slice(0, 10)}</Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={6} sm={6} md={3} lg={3}>
                                                    <Row>
                                                        <Col className='input-check'>
                                                            <InputGroup.Checkbox
                                                                checked={todo.status === 'done' ? true : false}
                                                                onClick={() => handleStatusChange(todo.status, todo._id)}
                                                                onChange={() => { }}
                                                            />
                                                        </Col>
                                                        <Col>
                                                            {
                                                                todo.userId === user._id &&
                                                                <Link to={'#'} className='link-clr'>
                                                                    <FontAwesomeIcon icon={faEdit} size="sm" onClick={() => handleUpdateTodo(todo)} />
                                                                </Link>
                                                            }
                                                        </Col>
                                                        <Col>
                                                            {
                                                                todo.userId === user._id &&
                                                                <Link to={'#'} className='link-clr'>
                                                                    <FontAwesomeIcon icon={faTrash} size="sm" onClick={() => handleDeleteTodo(todo._id)} />
                                                                </Link>
                                                            }
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Jumbotron>
                                </div>
                            )
                        })}
                    </div>
                    <div className='logout'>
                        <Link to={'#'} className='link-clr' onClick={() => handleLogout()} >
                            <h4>Logout</h4>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Todo = reduxForm({
//     form: 'todo',
//     validate
// })(Todo);

export default Todo;