
# demo

The demo client uses https://github.com/open62541/open62541 as the server.

## Usage

1. Copy `server.c` into `open62541/examples`
1. Add `add_example(server server.c)` to `examples/CMakeLists.txt`
1. Create a build directory for the examples `mkdir build`
1. Step into the build directory `cd build`
1. Run `cmake ..`
1. Compile `make -j`
1. Start the server `./bin/examples/server`

## What's included?

- Hello
- Open Secure Channel
- Create Session
- Activate Session
- Browse
- Create Subscription
- Create Monitored Item
- Call Method
- Events (coming soon)
