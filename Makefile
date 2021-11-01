.PHONY: secret
secret:
	echo $(FIREBASE_FUNCTIONS_TEST_SERVICE_ACCOUNT) | base64 -d > functions/src/config/firebase-service-account.json
