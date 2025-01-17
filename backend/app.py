from fastapi import FastAPI, HTTPException
import uvicorn

app = FastAPI()

# Define version-specific functions
def handle_v1(data: dict):
    return {"version": "v1", "message": "Processed data", "data": data}

def handle_v2(data: dict):
    return {"version": "v2", "message": "Processed data", "data": data}

def handle_v3(data: dict):
    return {"version": "v3", "message": "Processed data", "data": data}

# Dictionary mapping version_name to their respective functions
version_handlers = {
    "v1": handle_v1,
    "v2": handle_v2,
    "v3": handle_v3,
}

@app.post("/{version_name}/process")
async def process_data(version_name: str, payload: dict):
    handler = version_handlers.get(version_name)
    if not handler:
        raise HTTPException(status_code=404, detail="Version not supported")
    # Call the appropriate version handler
    return handler(payload)

# Add the main function to start the app
def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    main()
