#!/bin/bash
set -e

RUSTFLAGS='-C link-arg=-s' cargo build --target wasm32-unknown-unknown
cp target/wasm32-unknown-unknown/debug/daip.wasm ../out/core.wasm
