def locateElement(xpath):
    try:
        element = wait.until(EC.presence_of_all_elements_located((By.XPATH, xpath)))
        element = element[0].get_attribute('innerHTML')
        element = BeautifulSoup(element, features="lxml")
        element = element.text
        return element
    except Exception: 
        print("\nCould not locate element\n")
        return False

def json_checker():
    try: 
        f = open("./frontend/env.json", "r")
        f.close()
    except IOError as e: 
        print(e)
        print("\nCreating file 'env.json' in ./frontend/ directory")
        if os.name == "nt":
            os.system("type nul > ./frontend/env.json") 
        else:
            os.system("touch ./frontend/env.json")
        print("'env.json' successfully created\n")
    
    isEmptyFile = False
    with open("./frontend/env.json", "r") as f:
        if f.read() == "": 
            print("Formatting 'env.json'")
            isEmptyFile = True
        f.close()
    if isEmptyFile:
        with open("./frontend/env.json", "w") as f:
            json.dump(json.loads("""{"NgrokURL": ""}"""), f, indent=4) 
            print("Succesfully formatted 'env.json'\n")
            f.close()

def save_to_json(URL: str):
    with open("./frontend/env.json", "r") as f:
        print("\nSaving to 'env.json'")
        data = json.loads(f.read())
        data["NgrokURL"] = URL
        f.close()

    with open("./frontend/env.json", "w") as f:
        json.dump(data, f, indent=4)
        print("Succesfully saved NgrokURL to 'env.json'\n")
        f.close()

if __name__ == '__main__':
    print("Importing OS...")
    import os
    if os.name == 'nt':
        os.system('cls')
    else:
        os.system('clear')

    print("Importing dependencies...")
    import json
    import time
    import requests
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from selenium.webdriver.common.keys import Keys
    from webdriver_manager.chrome import ChromeDriverManager
    from bs4 import BeautifulSoup

    print("Setting up ChromeDriver...")
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-blink-features")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    wait = WebDriverWait(driver, 20)

    print("Starting Ngrok.io Server - port: 5000", end="\r")
    os.system("start cmd /k ngrok http 5000 --host-header='localhost:5000")

    for i in range(1, 11):
        time.sleep(0.3)
        print(f"Starting Ngrok.io Server - port: 5000{'.'*i}", end="\r")
    print("")

    print("Retriving Ngrok.io Forwarding URL...")
    driver.get("http://127.0.0.1:4040/inspect/http")
    URL = False
    while not URL:
        URL = locateElement("/html/body/div/div/div/div/div/ul/li/a")
    print(URL)

    json_checker()
    save_to_json(URL)

    print("Starting frontend - expo")
    os.system('start cmd /k "cd frontend & npx expo start"')

    print("Starting backend - server.js")
    os.system('start cmd /k "cd backend & npm start"')

