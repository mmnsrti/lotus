from fastapi import APIRouter, Body, Depends
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from db.engine import get_db
from schema._input import UserInput, UpdateProfileInput, SingUpInput, SignInInput
from oprations.users import UserOpration
from schema.jwt import JWTPayload
from utils.jwt import JWTHandler


router = APIRouter()


@router.post("/login")
async def login(db_session: Annotated[AsyncSession, Depends(get_db)],
    data: UserInput = Body(),
):
    token = await UserOpration(db_session).login(data.username, data.password)
    return token


@router.get("/{username}")
async def get_user_profile(
    db_session: Annotated[AsyncSession, Depends(get_db)],
    username: str,
):
    user_profile = await UserOpration(db_session).get_user_by_username(
        username
        )

    return user_profile


@router.put("/")
async def user_update_profile(
    db_session: Annotated[AsyncSession, Depends(get_db)],
    data: UpdateProfileInput = Body(),
    token_data: JWTPayload = Depends(JWTHandler.verify_token)
):
    user = await UserOpration(db_session).update_username(token_data.username,data.new_username)
    return user


@router.delete("/")
async def delete_account(
    db_session: Annotated[AsyncSession, Depends(get_db)],
    token_data: JWTPayload = Depends(JWTHandler.verify_token)
):
    await UserOpration(db_session).user_delete_account(token_data.username)


@router.post("/signup")
async def singup(
    db_session: Annotated[AsyncSession, Depends(get_db)],
    data: SingUpInput = Body(),
):
    print("**This is SignUp**") 
    user = await UserOpration(db_session).create(
        firstname=data.firstName, lastname=data.lastName, password=data.password, email=data.email
    )
    
    return user


@router.post("/signin")
async def signin(
    db_session: Annotated[AsyncSession, Depends(get_db)],
    data: SignInInput = Body(),
):
    print("**This is SignIn**") 
    user = await UserOpration(db_session).login(email=data.email,password=data.password)
    
    return user













