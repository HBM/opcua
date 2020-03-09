
.PHONY: proxy
proxy:
	websockify localhost:1234 localhost:4840

.PHONY: server
server:
	python3 -m http.server 8888
