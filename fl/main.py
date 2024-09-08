from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
from fastapi import FastAPI, Request, Depends, HTTPException, Form, Cookie
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="build/static"), name="static")
app.mount("/imgs", StaticFiles(directory="build/static/media"), name="imgs")

class ExampleData(BaseModel):
    title: str
    message: str
    name: str
    creator: str
    comments: list[str]
    tags: list[str]
    selectedFile: str
    likes: list[str] 
    createdAt: str  # می‌توانید از datetime برای این فیلد استفاده کنید

@app.post("/send-data")
async def send_data(data: ExampleData):
    target_url = "http://localhost:8000/posts"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(target_url, json=data.dict())
            response.raise_for_status()
        except httpx.RequestError as e:
            # برای خطاهای درخواست، پیغام خطا را برگردانید
            raise HTTPException(status_code=400, detail=f"Request error: {str(e)}")
        except httpx.HTTPStatusError as e:
            # برای خطاهای وضعیت HTTP، پیغام خطا را برگردانید
            raise HTTPException(status_code=response.status_code, detail=f"HTTP error: {str(e)}")
        except Exception as e:
            # برای خطاهای غیرمنتظره، پیغام خطای عمومی برگردانید
            raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

    return {"status_code": response.status_code, "response": response.json()}



@app.get("/")
async def index():
    return FileResponse("build/index.html")