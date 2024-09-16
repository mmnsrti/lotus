from sqlalchemy.ext.asyncio import AsyncSession
import sqlalchemy as sa
from db.models import User
import exeptions
from utils.secrets import password_manager
from schema.output import RegisterOutput
from sqlalchemy.exc import IntegrityError
from utils.jwt import JWTHandler
from schema.jwt import JWTResponsePayload


class UserOpration:
    def __init__(self, db_session: AsyncSession) -> None:
        self.db_session = db_session

    async def create(self, firstname: str, password: str, lastname: str, email: str) -> dict:
        user_pw = password_manager.hash(password)
        user = User(lastname=lastname, password=user_pw, firstname=firstname, email=email)
        try:
            self.db_session.add(user)
            await self.db_session.commit()
        except IntegrityError:
            raise exeptions.UserAlreadyExists

        tk = JWTHandler.generate(user.password)
        user_out = {
        "result": {
            "name": user.firstname,
            "password": user.password,
            "id": user.id
        },
        "token": tk
    }

        return user_out


    async def get_user_by_username(self, username: str) -> User:
        query = sa.select(User).where(User.email == username)

        async with self.db_session as session:
            user_data = await session.scalar(query)

            if (user_data is None):
                raise exeptions.UserNotFound

            return user_data
        


    async def login(self, email: str, password: str) -> JWTResponsePayload:
        query = sa.select(User).where(User.email== email)

        async with self.db_session as session:
            user = await session.scalar(query)
            if user is None:
                raise exeptions.UsernameOrPasswordIncorrect
         
        if not password_manager.verify(password, user.password):
            raise exeptions.UsernameOrPasswordIncorrect
        
        return JWTHandler.generate(user.email)




    # async def update_username(self, old_username: str, new_username: str) -> User:
    #     query = sa.select(User).where(User.username == old_username)
    #     update_query = (
    #         sa.update(User).
    #         where(User.username == old_username)
    #         .values(username=new_username)
    #     )
    #     async with self.db_session as session:
    #         user_data = await session.scalar(query)

    #         if user_data is None:
    #             raise exeptions.UserNotFound

    #         await session.execute(update_query)
    #         await session.commit()
    #         user_data.username = new_username
    #         return user_data

    # async def user_delete_account(self, username: str) -> None:
    #     delete_query = sa.delete(User).where(
    #         User.username == username)
    #     async with self.db_session as session:
    #         await session.execute(delete_query)
    #         await session.commit()




