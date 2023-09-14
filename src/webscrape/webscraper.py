import requests
from bs4 import BeautifulSoup
import csv

url = "https://aonsrd.com/Classes.aspx?ItemName=Biohacker"
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    main_div = soup.find("div", {"class": "main", "id": "main"})
    table = main_div.find("table")
    tr = table.find("tr")
    td = tr.find("td")
    span = td.find("span")
    
    # Now, let's break down the content of the span tag:
    h1_tags = span.find_all('h1')
    h2_tags = span.find_all('h2')
    b_tags = span.find_all('b')
    
    # Create a CSV file
    with open('output.csv', 'w', newline='') as csvfile:
        fieldnames = ['Title', 'Subtitle', 'Sub-section', 'Content']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for h1 in h1_tags:
            title = h1.text
            content = h1.next_sibling
            # Check for content until we hit another tag or None
            while content and not hasattr(content, "name"):
                writer.writerow({'Title': title, 'Subtitle': '', 'Sub-section': '', 'Content': content})
                content = content.next_sibling

        for h2 in h2_tags:
            subtitle = h2.text
            content = h2.next_sibling
            while content and not hasattr(content, "name"):
                writer.writerow({'Title': '', 'Subtitle': subtitle, 'Sub-section': '', 'Content': content})
                content = content.next_sibling

        for b in b_tags:
            sub_section = b.text
            content = b.next_sibling
            while content and not hasattr(content, "name"):
                writer.writerow({'Title': '', 'Subtitle': '', 'Sub-section': sub_section, 'Content': content})
                content = content.next_sibling

else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
