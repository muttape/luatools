import json
import os
import glob

locales_dir = r"c:\Users\Bernardo\Documents\git\ltsteamplugin\backend\locales"

en_strings = {
    "settings.fastDownload.label": "Fast Download",
    "settings.fastDownload.description": "Automatically choose the first available source when adding a game."
}

pt_strings = {
    "settings.fastDownload.label": "Download Rápido",
    "settings.fastDownload.description": "Escolher automaticamente a primeira fonte disponível ao adicionar um jogo."
}

def update_locales():
    for filename in glob.glob(os.path.join(locales_dir, "*.json")):
        with open(filename, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        meta_code = data.get("_meta", {}).get("code", "")
        
        if "strings" not in data:
            data["strings"] = {}
            
        if meta_code == "en":
            data["strings"].update(en_strings)
        elif meta_code.startswith("pt"):
            data["strings"].update(pt_strings)
        else:
            data["strings"]["settings.fastDownload.label"] = "translation missing"
            data["strings"]["settings.fastDownload.description"] = "translation missing"
            
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")

if __name__ == "__main__":
    update_locales()
    print("Locales updated.")
