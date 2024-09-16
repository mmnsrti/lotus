from fastapi import FastAPI, Body, Depends
import uvicorn
from pydantic import BaseModel
from typing import Annotated

app = FastAPI()


class Create_post(BaseModel):
    title: str
    content: str
    id: int


async def parametrs(name: str, age: int, post: str):
    print('Hello')
    return {name, post}



@app.get("/depend")
async def depend(params: Annotated[dict, Depends(parametrs)]):
    print("GoodBye")
    return {}


@app.get("/name/{username}")
async def root(username: int):
    return {"username": username}



@app.post("/create")
async def create_post(post: Create_post = Body()):
    return post



if __name__ == "__main__" :
    uvicorn.run(app)
