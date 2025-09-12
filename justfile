set dotenv-load

release-patch:
    release-it -i patch

release-minor:
    release-it -i minor

release-major:
    release-it -i major

stat:
    tokei

deploy:
    scp -r ./* ${HOST}:${DEPLOY_PATH}