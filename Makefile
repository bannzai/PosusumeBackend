.PHONY: secret
secret:
	echo $(POSUSUME_FIREBASE_RUN_COMMAND_FILE) | base64 -d > packages/functions/.firebaserc
