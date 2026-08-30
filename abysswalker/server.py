import http.server
import json
import os
import sys

RANKING_FILE = 'ranking.json'

def load_ranking():
    if os.path.exists(RANKING_FILE):
        try:
            with open(RANKING_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []
    return []

def save_ranking(data):
    with open(RANKING_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

class RPGHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/ranking':
            ranking = load_ranking()
            # Sort descending by maxFloor
            ranking.sort(key=lambda x: x.get('maxFloor', 0), reverse=True)
            top10 = ranking[:10]
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            self.wfile.write(json.dumps(top10).encode('utf-8'))
        else:
            # Fallback to static files
            super().do_GET()

    def do_POST(self):
        if self.path == '/api/ranking':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                new_score = json.loads(post_data.decode('utf-8'))
                ranking = load_ranking()
                
                # Check if player already exists
                existing = next((item for item in ranking if item.get('name') == new_score.get('name')), None)
                if existing:
                    # Update only if new score is higher
                    if new_score.get('maxFloor', 0) > existing.get('maxFloor', 0):
                        print(f"[RANKING] {new_score.get('name')} reached new max floor B{new_score.get('maxFloor')}F (Lv {new_score.get('lvl')})", flush=True)
                        existing['maxFloor'] = new_score.get('maxFloor')
                        existing['lvl'] = new_score.get('lvl', 1)
                else:
                    print(f"[RANKING] New player registered: {new_score.get('name')} at B{new_score.get('maxFloor')}F", flush=True)
                    ranking.append(new_score)
                
                save_ranking(ranking)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
        elif self.path == '/api/log':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                log_data = json.loads(post_data.decode('utf-8'))
                name = log_data.get('name', '名無し')
                action = log_data.get('action', 'Unknown')
                details = log_data.get('details', '')
                
                ip = self.headers.get('X-Forwarded-For', self.client_address[0]).split(',')[0]
                print(f"[PLAYER LOG] [{ip}] {name} | Action: {action} | {details}", flush=True)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error"}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    port = 8084
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    server_address = ('', port)
    httpd = http.server.HTTPServer(server_address, RPGHandler)
    print(f'Starting RPG server on port {port}...')
    httpd.serve_forever()
