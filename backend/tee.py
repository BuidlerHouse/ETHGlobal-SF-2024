
from dstack_sdk import AsyncTappdClient, DeriveKeyResponse
import asyncio

async def async_get():
    endpoint = 'http://0.0.0.0:8090'
    client = AsyncTappdClient(endpoint)
    try:
        derive_key = await client.derive_key('/', 'test')
        assert isinstance(derive_key, DeriveKeyResponse)
        as_bytes = derive_key.toBytes()
        assert isinstance(as_bytes, bytes)
        limited_size = derive_key.toBytes(32)
        tdx_quote = await client.tdx_quote('test')

        return {
            "deriveKey": as_bytes.hex(),
            "derive_32bytes": limited_size.hex(),
            "tdxQuote": tdx_quote
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    print(asyncio.run(async_get()))
