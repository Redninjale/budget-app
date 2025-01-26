import json

def match_ids_to_names(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)
    
    id_name_map = {}
    seen_names = set()
    for item in data:
        if item['name'] not in seen_names:
            id_name_map[item['_id']] = item['name']
            seen_names.add(item['name'])
    
    return id_name_map

def save_to_json(data, output_file):
    with open(output_file, 'w') as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":
    json_file = '[.json'  # Replace with your actual input file name
    id_name_map = match_ids_to_names(json_file)
    save_to_json(id_name_map, 'output.json')  # Replace with your desired output file name
    print(id_name_map)