from pydantic import BaseModel


class UserInput(BaseModel):
    username: str
    password: str


class UpdateProfileInput(BaseModel):
    new_username: str


class DeleteAccountInput(BaseModel):
    username: str


class SingUpInput(BaseModel):
    confirmPassword: str
    password: str
    firstName: str
    lastName: str
    email: str


class SignInInput(BaseModel):
    password: str
    email: str



class PostInput(BaseModel):
    title: str
    message: str
    name: str
    tags: str
    selectedFile: str
    creator: str
    slug: str


class PostUpdateInput(BaseModel):
    title: str
    message: str
    name: str
    slug: str


class PostLike(BaseModel):
    email: str
    slug: str