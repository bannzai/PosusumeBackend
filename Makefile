.PHONY: secret
secret:
	echo $(FIREBASE_FUNCTIONS_SERVICE_ACCOUNT_JSON) | base64 -d > functions/src/config/firebase-service-account.json
