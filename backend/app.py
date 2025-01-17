from fastapi import FastAPI, HTTPException, Query
from typing import Optional
import uvicorn

app = FastAPI()

# Define model-specific functions
def alpha(params: dict = None, query_string: str = ""):
    return {
        "model": "alpha",
        "output": 1,
        "query_used": query_string,
        "parameters": params or {}
    }

def beta(params: dict = None, query_string: str = ""):
    return {
        "model": "beta",
        "output": 2,
        "query_used": query_string,
        "parameters": params or {}
    }

# Dictionary mapping model names to their respective functions
model_handlers = {
    "alpha": alpha,
    "beta": beta
}

@app.get("/{model_name}/process")
async def process_data(
    model_name: str,
    query: Optional[str] = Query(None, description="Query string for processing"),
    param1: Optional[str] = Query(None, description="First parameter"),
    param2: Optional[int] = Query(None, description="Second parameter"),
    param3: Optional[float] = Query(None, description="Third parameter")
):
    handler = model_handlers.get(model_name)
    if not handler:
        raise HTTPException(status_code=404, detail="Model not supported")
    
    # Collect all provided parameters into a dictionary
    params = {}
    if param1 is not None:
        params["param1"] = param1
    if param2 is not None:
        params["param2"] = param2
    if param3 is not None:
        params["param3"] = param3
    
    # Call the appropriate model handler with the parameters and query string
    return handler(params, query or "")

def main():
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()