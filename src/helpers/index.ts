const handleResponse = (promise: any) => {
    return promise
        .then((data: any) => (data))
        .catch((error: any) => Promise.resolve(error.response));
}

export { handleResponse }