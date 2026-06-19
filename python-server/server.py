from http.server import HTTPServer, SimpleHTTPRequestHandler

server = HTTPServer(("localhost", 8000), SimpleHTTPRequestHandler)

print("Frontend running at http://localhost:8000")
server.serve_forever()