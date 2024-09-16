from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from routers.users import router as user_routers
from routers.posts import router as post_routers
from db.engine import Base, engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    # کارهایی که باید در زمان راه‌اندازی انجام شود
    print("FastAPI is starting...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield  # نقطه‌ای که در آن درخواست‌ها پردازش می‌شوند

    # کارهایی که باید در زمان پایان برنامه انجام شود
    # (اختیاری)
    print("FastAPI is finishing...")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # یا به جای "*" لیست دامنه‌های خاصی را مجاز کنید
    allow_credentials=True,
    allow_methods=["*"],  # متدهای مجاز (مانند "GET", "POST", "OPTIONS")
    allow_headers=["*"],  # هدرهای مجاز
)

app.include_router(user_routers, prefix="/user")
app.include_router(post_routers)
