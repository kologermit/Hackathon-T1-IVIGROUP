import os

file = open("/entrypoint/doc.yml", "r")
txt = file.read()
file.close()

variables = []
for i, s in enumerate(txt):
    if s != "$" \
        or i+1 == len(txt)\
        or txt[i+1] != "{"\
        or not txt.find("}", i)+1:
        continue
    res = txt.find("}", i)+1
    template = txt[i:res]
    var = template.replace("${", "").replace("}", "")
    if ":-" in var:
        split_data = var.split(":-")
        variables.append({
            "name": split_data[0],
            "default": split_data[1],
            "template": template
        })
    else:
        variables.append({
            "name": var,
            "template": template
        })    
print(variables)

output = open("/usr/share/nginx/html/swagger/res.yml", "w")
for var in variables:
    env = os.getenv(var["name"])
    s = ("" if "default" not in var else var["default"])
    if env:
        s = env
    txt = txt.replace(var["template"], s)

output.write(txt)
output.close()