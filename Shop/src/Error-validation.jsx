import React from 'react'
import validator from 'validator'

const Validator=(data)=>{
    const error={}
    if (validator.isEmpty(data.Name)) {
        error.name = `name field required`
        return <p>{error.name}</p>
    }
    if (!validator.isLength(data.Name, { min: 2, max: 30 })) {
        error.name = `value must be within 2 to 30 characters`
        return <p>{error.name}</p>
    }
    if (validator.isEmpty(data.email)) {
        error.email = `Email field required`
        return <p>{error.email}</p>
    }

    if (!validator.isEmail(data.email)) {
        error.email = `Email must include @ character`
        return <p>{error.email}</p>
    }

    if (validator.isEmpty(data.password)) {
        error.password = `password field required`
        return <p>{error.password}</p>
    }

    if (!validator.isLength(data.password, { min: 4, max: 15 })) {
        error.password = `password must be between 4 to 15 characters`
        return <p>{error.password}</p>
    }
    if (validator.isEmpty(data.confirm_password)) {
        error.password = `confirm_password field required`
        return <p>{error.confirm_password}</p>
    }
    if (!validator.equals(data.password, data.confirm_password)) {
        error.confirm_password = `password must match`
        return <p>{error.confirm_password}</p>
    }
}
export default Validator
