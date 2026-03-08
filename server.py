#!/usr/bin/env python3
"""
Simple development server for admin.html with file save endpoints.
Serves static files and handles saving projects.js and repos.json.
"""

import json
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse

class AdminHandler(SimpleHTTPRequestHandler):
    """HTTP request handler with custom POST endpoints for saving files"""

    def do_POST(self):
        """Handle POST requests for saving files"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        # Get content length
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')

        if path == '/api/save-projects':
            self.handle_save_projects(body)
        elif path == '/api/save-repos':
            self.handle_save_repos(body)
        else:
            self.send_error(404, "Not found")

    def handle_save_projects(self, body):
        """Save projects.js file"""
        try:
            data = json.loads(body)
            content = data.get('content', '')

            projects_path = Path(__file__).parent / 'js' / 'projects.js'
            projects_path.write_text(content)

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = json.dumps({'status': 'success', 'message': 'projects.js saved'})
            self.wfile.write(response.encode())

            print(f"✓ Saved js/projects.js")
        except Exception as e:
            self.send_error(500, f"Error saving file: {str(e)}")
            print(f"✗ Error saving projects.js: {e}")

    def handle_save_repos(self, body):
        """Save repos.json file"""
        try:
            data = json.loads(body)
            repos = data.get('repos', [])

            repos_path = Path(__file__).parent / 'data' / 'repos.json'
            repos_path.write_text(json.dumps(repos, indent=2))

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = json.dumps({'status': 'success', 'message': 'repos.json saved'})
            self.wfile.write(response.encode())

            print(f"✓ Saved data/repos.json")
        except Exception as e:
            self.send_error(500, f"Error saving file: {str(e)}")
            print(f"✗ Error saving repos.json: {e}")

    def end_headers(self):
        """Add CORS headers to allow requests from different origins"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        """Custom logging"""
        if 'GET' in format or 'POST' in format:
            print(f"  {format % args}")

def run_server(port=8000):
    """Start the development server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, AdminHandler)
    print(f"🚀 Admin server running on http://localhost:{port}")
    print(f"📄 Open http://localhost:{port}/admin.html to manage repos")
    print(f"🏠 Open http://localhost:{port} to view portfolio")
    print("\nPress Ctrl+C to stop\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✓ Server stopped")
        httpd.shutdown()

if __name__ == '__main__':
    run_server()
