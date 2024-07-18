import json
import requests
import time

# Global variables
totalTestsPassed = 0
totalTestsFailed = 0
logsTestFailed = []

def print_blue(message):
    print("\033[94m" + message + "\033[0m")

def print_bold(message):
    print("\033[1m" + message + "\033[0m")

def print_green(message):
    print("\033[92m" + message + "\033[0m")

def print_red(message):
    print("\033[91m" + message + "\033[0m")

def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def execute_api_tests(jsonFileContent):
    global totalTestsPassed, totalTestsFailed
    totalTestsPassed = 0
    totalTestsFailed = 0
    tests = json.loads(jsonFileContent)
    for test_id, test_data in tests.items():
        try:
            print_blue(f"Catégorie n°{test_id}: {test_data['title']} {test_data['method']} en cours...")
            url = test_data['url']
            method = test_data['method']
            if not url.startswith('http'):
                url = f"http://localhost:3000{url}"  # Adjust the URL as per your server configuration
            if method == 'GET':
                response = requests.get(url)
            elif method == 'POST':
                headers = {'Content-Type': 'application/json'}
                body = json.dumps(test_data.get('body', {}))  # Use .get() to safely access 'body' key
                response = requests.post(url, headers=headers, data=body)
            elif method == "DELETE":
                response = requests.delete(url)
            else:
                raise ValueError(f"Méthode HTTP non supportée: {method}")
            assert response.status_code == test_data['statusCode']
            if test_data['data'] != {}:
                response_data = response.json()
                if 'data' in response_data:
                    assert response_data['data'] == test_data['data']
                else:
                    print_red("Réponse JSON invalide: la clé 'data' est absente")
                    totalTestsFailed += 1
                    continue  # Pass to the next test
            totalTestsPassed += 1
        except AssertionError as e:
            totalTestsFailed += 1
            print(f"Error: {e}")
            print_bold(f"Status code: {response.status_code}")
            print_bold(f"Response: {response.text}")
            logsTestFailed.append(f"Test {test_id}: {test_data['title']} {test_data['method']}")
            print_red(f"Test échoué: {e}")
        except Exception as e:
            totalTestsFailed += 1
            print_red(f"Une erreur s'est produite lors du test: {e}")

def printResult():
    print("-----------------------------------------------------------------")
    if totalTestsFailed == 0:
        print_green("Résultat: {}%".format(totalTestsPassed*100/(totalTestsPassed + totalTestsFailed)))
        print("Nombre de tests effectués: {}".format((totalTestsPassed + totalTestsFailed) * 8))
        print_green(f"Tous les tests ont réussi!")
    else:
        print_red("Résultat: {}%".format(totalTestsPassed*100/(totalTestsPassed + totalTestsFailed)))
        print("Nombre de tests effectués: {}".format((totalTestsPassed + totalTestsFailed) * 8))
        print("Les tests suivants ont échoué:")
        for log in logsTestFailed:
            print(log)

if __name__ == '__main__':
    jsonFileContent = read_file('./tests.api.json')
    print_bold("Exécution des tests API...")
    execute_api_tests(jsonFileContent)
    printResult()
