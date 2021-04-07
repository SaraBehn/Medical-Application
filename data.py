import os

os.system("curl -O ftp://public.nlm.nih.gov/nlmdata/.dailymed/dm_spl_zip_files_meta_data.zip")
os.system("unzip -u dm_spl_zip_files_meta_data.zip")

old = open("old/assets/dm_spl_zip_files_meta_data.txt", "r")
# old = open("sample.txt", "r")
text = old.read().replace("`", "'")
f = open("old/assets/dm_spl_zip_files_meta_data.js", "w")
# f = open("sample.js", "w")
f.write("const data = `")
f.write(text)
f.write("`\nexport default data;")
