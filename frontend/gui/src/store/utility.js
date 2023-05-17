export const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    }
}

export const getToken = () => {
    return localStorage.getItem('token')
}