set dotenv-load

release-patch:
    release-it -i patch

release-minor:
    release-it -i minor

release-major:
    release-it -i major

deploy:
    scp -r ./* ${HOST}:${DEPLOY_PATH}