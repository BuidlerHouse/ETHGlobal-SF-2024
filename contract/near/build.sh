#!/bin/bash
set -e

RUSTFLAGS='-C link-arg=-s' cargo build --target wasm32-unknown-unknown
cp target/wasm32-unknown-unknown/release/daip.wasm ../out/main.wasm
