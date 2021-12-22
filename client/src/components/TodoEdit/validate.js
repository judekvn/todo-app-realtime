const validate = values => {

    const errors = {}

    if (!values.taskName) {
      errors.taskName = '*Required'
    }

    return errors
}

export default validate;