from fastapi import HTTPException


class UserNotFound(HTTPException):
    def __init__(self) -> None:
        self.status_code = 404
        self.detail = "User not found"


class UserAlreadyExists(HTTPException):
    def __init__(self) -> None:
        self.status_code = 400
        self.detail = "User already exists"


class UsernameOrPasswordIncorrect(HTTPException):
    def __init__(self) -> None:
        self.status_code = 400
        self.detail = "Username or password is incorrect"


class PostCanNotCreated(HTTPException):
    def __init__(self) -> None:
        self.status_code = 400
        self.detail = "Post can\'t create"


class PostCanNotUpdate(HTTPException):
    def __init__(self) -> None:
        self.status_code = 400
        self.detail = "Post can\'t update"

