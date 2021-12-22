import React from 'react';
import { FormGroup, FormControl, FormLabel, Form, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './TodoEdit.css';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { updateTodoSocket } from '../../actions/todo'

const renderField = ({ input, label, type, meta: { touched, error }, placeholder }) => {
    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            <FormControl {...input} placeholder={placeholder} type={type} />
            {touched && error && <span className={'errorColor'} >{error}</span>}
        </FormGroup>
    )
}

let TodoEdit = (props) => {
    const dispatch = useDispatch();
    const { handleSubmit, show, handleClose, socket } = props;

    const handleUpdate = async (values) => {
        dispatch(updateTodoSocket(socket, values.todoId, values.todoName))
        handleClose();
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} >
                <Form
                // onSubmit={handleSubmit(submit)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Todo title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Field
                            name="todoName"
                            type='text'
                            component={renderField}
                            placeholder={'Todo Name'}
                            label={'Todo Name'}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type='submit' onClick={handleSubmit(handleUpdate)}>Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

TodoEdit = reduxForm({
    form: 'todoEdit',
    validate
})(TodoEdit);

export default TodoEdit;