from sqlalchemy.ext.asyncio import AsyncSession
import sqlalchemy as sa
from db.models import Post
import exeptions
import datetime
from sqlalchemy.exc import IntegrityError
from uuid import UUID




class PostOpration:
    def __init__(self, db_session: AsyncSession) -> None:
        self.db_session = db_session


    async def create(self, title: str, message: str, name: str, creator: str, selectedFile: str, slug: str) -> str:
        now = datetime.datetime.now()
        format_now = f"{now}"
        post = Post(title=title, message=message, name=name, creator=creator, selectedFile=selectedFile,createdAt=format_now, comments="",likes="",tags="", slug=slug)
        try:
            self.db_session.add(post)
            await self.db_session.commit()
        except IntegrityError:
            raise exeptions.PostCanNotCreated

        return "Post created"

    async def post_delete(self, slug: str) -> str:
        
        delete_query = sa.delete(Post).where(Post.slug==slug)
        async with self.db_session as session:
            await session.execute(delete_query)
            await session.commit()

        return "Post Deleted"
    

    async def update_post(self, slug: str, new_massege: str, title: str, name: str) -> str:
        query = sa.select(Post).where(Post.slug == slug)
        update_query = (
            sa.update(Post).
            where(Post.slug == slug)
            .values(message=new_massege, title=title, name=name)
        )
        async with self.db_session as session:
            post_data = await session.scalar(query)

            if post_data is None:
                raise exeptions.PostCanNotUpdate

            await session.execute(update_query)
            await session.commit()

            return 'Post Updated'


    async def like_post(self, slug: str, email) -> str:
        query = sa.select(Post).where(Post.slug == slug)
        update_query = (
            sa.update(Post).
            where(Post.slug == slug)
            .values(likes=email)
        )
        async with self.db_session as session:
            post_data = await session.scalar(query)

            if post_data is None:
                raise exeptions.PostCanNotUpdate

            await session.execute(update_query)
            await session.commit()

            return 'Post Liked'
    

    async def get_post_by_slug(self, slug: str) -> Post:
        query = sa.select(Post).where(Post.slug == slug)

        async with self.db_session as session:
            post_data = await session.scalar(query)

            if (post_data is None):
                raise exeptions.UserNotFound

            return post_data