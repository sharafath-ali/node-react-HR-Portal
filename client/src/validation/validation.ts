import * as yup from 'yup'

export const userSchema=yup.object().shape({
    first_name: yup.string().required(),
    last_name:yup.string().required(),
    email: yup.string().email().required(),
    designation:yup.string().required()
    //password: yup.string().min(4).max(10).required()
})