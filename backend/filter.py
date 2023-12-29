import os 
import shutil 
path = "C:\\Users\\kenni\\OneDrive\\Documents\\GitHub\\drafting\\backend\\assets\\champion\\centered" 
destination = "C:\\Users\\kenni\\OneDrive\\Documents\\GitHub\\drafting\\frontend\\public\\champions\\wide"
dir_list = os.listdir(path)
def contain0 (string): 
    return "_0" in string
dir_list = list(filter(contain0, dir_list))
for file in dir_list: 
    destFile = file.replace("_0","")
    shutil.copy(path+"\\"+file, destination+"\\"+destFile)
print(dir_list)
