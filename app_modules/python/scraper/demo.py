from __future__ import print_function

import codecs
import glob
import sys
from sys import argv
import os
import datetime
from os import walk
from os import path
#
import json
import yaml
import random
import re
import shutil
import ast
import stat
#
import time
from datetime import date, timedelta
from datetime import datetime
#
from collections import Counter
#
####################################################################
def stopwatch(seconds):
	start = time.time()
	time.clock()    
	elapsed = 0
	while elapsed < seconds:
		elapsed = time.time() - start
		#print ("loop cycle time: %f, seconds count: %02d" % (time.clock() , elapsed)) 
		#
		# pass percentage to loaded or total which is 100%
		#if you got 20 pages you are parsing passs that as percentage
		print('["progress",{"loaded":'+str(elapsed)+',"total":'+str(100)+'}]')
		#
		time.sleep(0.1)  

####################################################################
def do_run(exec_type, call_type, gather_option):
	
	print('["message","success_'+exec_type+'_'+call_type+'_'+gather_option+'"]')
	#
	responce_array = []
	#
	time.sleep(2)
	#
	# FAKE LOADING
	stopwatch(100)
	#
	if exec_type == 'argumental':
		if gather_option == 'option_a':
			#	
			gathered = {'details':[ 'A', 'B', 'C', 'D' ]}
			#
		else:	
			#
			gathered = {'details':[ '1', '2', '3', '4' ]}
			#
	else:
		
		gathered = {'details':[ 'A1', 'A2', 'A3', 'A4' ]}
		
	#
	return gathered
	#
##
def init():
	#
	print('["message", "success_initiating_applicator"]')
	#
	#
	try:
		#
		exec_type = str(sys.argv[1])
		call_type = str(sys.argv[2])
		gather_option = str(sys.argv[3])
		#
	except Exception:
		#
		pass
	#
	data_gathered = do_run( exec_type, call_type, gather_option )
	#
	js = json.dumps( data_gathered )
	#
	print('["results",'+ js +']')
	#
	
init()
