from fastapi import APIRouter, Body, Depends
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from db.engine import get_db
from oprations.posts import PostOpration
from schema._input import *
from schema.jwt import JWTPayload
from utils.jwt import JWTHandler
from uuid import UUID




router = APIRouter()


@router.post("/posts")
async def create_post(
    db_session: Annotated[AsyncSession, Depends(get_db)],
    data: PostInput = Body(),
):
    post = await PostOpration(db_session).create(title=data.title, message=data.message, name=data.name, creator=data.creator, selectedFile=data.selectedFile, slug=data.slug)
    
    return post


@router.delete("/posts/{slug}")
async def delete_post(
    db_session: Annotated[AsyncSession, Depends(get_db)],
    slug: str,
):
    await PostOpration(db_session).post_delete(slug=slug)




@router.patch("/posts")
async def update_post(
    db_session: Annotated[AsyncSession, Depends(get_db)],
    data: PostUpdateInput = Body(),
):
    post = await PostOpration(db_session).update_post(title=data.title, new_massege=data.message, name=data.name, slug=data.slug)
    
    return post


@router.patch("/posts/{id}/likePost")
async def like_post(
    id: str,
    db_session: Annotated[AsyncSession, Depends(get_db)],
    token_data: JWTPayload = Depends(JWTHandler.verify_token)
):
    post = await PostOpration(db_session).like_post(slug=id, email=token_data.email)

    
    return post


@router.get("/{slug}")
async def get_post(
    db_session: Annotated[AsyncSession, Depends(get_db)],
    slug: str,
):
    post_det = await PostOpration(db_session).get_post_by_slug(slug)

    return post_det