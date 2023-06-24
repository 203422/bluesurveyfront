const AuthResponse = {
    body: {
        user: null,
        accesToken: "",
        refreshToken: "",
    }
};

const AuthResponseError = {
    body: {
        error: ""
    }
}

export { AuthResponse, AuthResponseError }