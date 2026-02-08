import requests
from urllib.parse import urlencode, urljoin

class BaseEvolutionAPI:

    def __init__(self):
        self.BASE_URL = 'https://evolution-api-production-ca5f.up.railway.app'
        self._API_KEY = {
            'Arcane3': 'yi9151g6j2so4nm14ioti'
        }

    def _send_request(
            self,
            path,
            method='GET',
            body=None,
            headers={},
            params_url={}
    ):
        method.upper()
        url = self._mount_url(path, params_url)

        if not isinstance(headers, dict):
            headers = {}

        headers.setdefault('Content-Type', 'application/json')
        headers['apikey'] = self._API_KEY.get('Arcane3')

        request = {
            'GET': requests.get,
            'POST': requests.post,
            'PUT': requests.put,
            'DELETE': requests.delete
        }
        return request(url, headers=headers, json=body)
    
    def _mount_url(self, path, params_url):

        if isinstance(params_url, dict):
            parameters = urlencode(params_url)

        url = urljoin(self.BASE_URL, path)

        if parameters:
            url = url + '?' + parameters
        return url
    

class SendMessage(BaseEvolutionAPI):
    
    def send_message(self, instance, body):
        path = f'/message/sendText/{instance}/'
        return self._send_request(path, method='POST', body=body)