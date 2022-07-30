
#!/usr/bin/env bash
echo "Begin: Setup AWS"
aws --version
aws configure set default.aws_access_key_id "$AWS_ACCESS_KEY_ID"
aws configure set default.aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"
echo "Finish: Setup AWS"