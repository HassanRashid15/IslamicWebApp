import requests
import json

api_key = "$2y$10$eXEGjayONqLhdcuSQ3SD11ei3FEyh2WF96c3I0AH05zgPb3h7Sjm"
url = f"https://hadithapi.com/api/books?apiKey={api_key}"

try:
    response = requests.get(url)
    data = response.json()
    print(json.dumps(data, indent=2)[:1000])
except Exception as e:
    print(f"Error: {e}")
