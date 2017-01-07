#!/usr/bin/python3
import subprocess
subprocess.call(["echo -n \"#include <stdio.h>\nint main(void)\" > test.c"], shell=True)
subprocess.call(["echo -n \"{\nprintf(\\\"#pythoniscool\\\");\nreturn(0);\n}\n\" >> test.c"], shell=True)
subprocess.call(["gcc", "test.c"])
subprocess.call(["./a.out"])
print("")
subprocess.call(["rm", "a.out"])
subprocess.call(["rm", "test.c"])
#import subprocess
#subprocess.call(["echo", "#pythoniscool"])
