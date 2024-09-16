from uuid import UUID, uuid4

from sqlalchemy.orm import Mapped, mapped_column

from .engine import Base


class User(Base):
    __tablename__ = "users"
    password: Mapped[str] = mapped_column()
    firstname: Mapped[str] = mapped_column()
    lastname: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    id: Mapped[UUID] = mapped_column(primary_key=True, default_factory=uuid4)


class Post(Base):
    __tablename__ = "posts"
    title: Mapped[str] = mapped_column()
    message: Mapped[str] = mapped_column()
    name: Mapped[str] = mapped_column()
    creator: Mapped[str] = mapped_column()
    comments: Mapped[str] = mapped_column()
    tags: Mapped[str] = mapped_column()
    selectedFile: Mapped[str] = mapped_column()
    likes: Mapped[str] = mapped_column()
    createdAt: Mapped[str] = mapped_column()
    slug: Mapped[str] = mapped_column()
    id: Mapped[UUID] = mapped_column(primary_key=True, default_factory=uuid4)

