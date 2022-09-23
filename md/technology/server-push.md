# 服务器推送(server push) / 长连接(keep-alive connection)

## grpc

- rpc(remote procedure call) 是远程调用协议的意思，是一种架构概念，通过网络从远程计算机上请求服务，而不需要了解底层网络技术的协议；可以让服务的接口方法可以像本地方法一样调用，具体使用 http 或者 tcp 哪种协议则由框架决定
- grpc 是谷歌开发的一种 rpc 协议，grpc3 底层使用 HTTP2.0，连接服务需要了解 proto(协议缓存区)，一种类 json 的 IDL(接口描述语言)，需要在 xxx.proto 文件定义 service 和 method，以及 method 的 request 和 response，具体 method 的逻辑写在另外的方法文件
- grpc 主要用于内部服务之间调用，因 rpc 概念提出较早，所以有一定的使用量

## websocket / socket.io

- websocket 是全双工通信协议，服务端和客户端真正的平等，两端都通过事件来进行数据传递
- 实现很简单，更多的浏览器支持和更成熟的应用，被淘汰的可能性不大，可以发送 utf-8 和二进制
- websocket 更适用类似于多玩家游戏数据同步，但也可以用于其他场景

## HTTP2.0 + sse

- sse(server sent events) 是单向通道，只能通过客户端发送请求，服务端发送数据到客户端直到客户端或服务端主动结束，当客户端需要再发送信息，客户端需要再发送一条 http 请求
- HTTP2.0，http1.x 的扩展；是一种二进制协议，所以解析效率更高、支持多路复用，所以多个请求可以共用一个 tcp 连接、使用标头压缩来减少开销、支持主动响应发送到客户端，例如请求 html，可以一同返回 js 和 css
- 实现更简单，同样受到广泛支持，能够自动重新连接、事件 ID 和发送任意事件；只能发送 utf-8，可能会需要自己踩坑，不使用 HTTP2.0 会有 http 连接数限制
- sse 更适用更新状态、推送通知、新闻通讯等
