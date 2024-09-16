from uuid import UUID
from schema.jwt import JWTResponsePayload
from pydantic import BaseModel


class RegisterOutput(BaseModel):
    name: str
    password: str
    id: UUID
    token: JWTResponsePayload


class PostsOutput(BaseModel):
    username: str
    id: UUID