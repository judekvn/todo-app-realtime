import { getUser } from '../../actions/user';
import * as api from '../..//api/index.js';

const submit = async (values, dispatch, props) => {
    try {

        const { data } = await api.userSignup(values);
        const { history } = props;

        if (data.success) {
            localStorage.setItem('auth-token', data.token)
            dispatch(getUser(data.data))

            history.push('/todo')
        }

    } catch (err) {
        console.log(err);
    }

}

export default submit;