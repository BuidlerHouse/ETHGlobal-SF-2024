# Check if the WASM file exists
if [ ! -f "out/core.wasm" ]; then
    echo "Error: out/core.wasm not found. Make sure you've built the contract."
    exit 1
fi
near deploy -f --wasmFile out/core.wasm --accountId daip.prelaunch.testnet
near call daip.prelaunch.testnet new --accountId prelaunch.testnet
