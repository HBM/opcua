
.PHONY: proxy
proxy:
	websockify localhost:1234 localhost:4840
