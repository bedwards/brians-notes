# Lambda middleware

## TODO: work in progress

AWS Lambda function with Middy middleware to push custom EventBridge events for
invocation status changes.

```
$ localstack start
```

```
$ nvm use
$ npm install
$ ./node_modules/.bin/sls deploy
```

```
$ aws --endpoint 'http://localhost:4566' \
      lambda invoke --function lambda-middleware-dev-source \
                    --payload `echo '{"foo": "bar"}' | openssl base64` \
                    /dev/stdout

{"foo":"bar"}
{
    "StatusCode": 200,
    "LogResult": "",
    "ExecutedVersion": "$LATEST"
}
```

```
$ aws --endpoint-url=http://localhost:4566 \
      logs describe-log-groups --log-group-name-prefix /aws/lambda

"logGroupName": "/aws/lambda/lambda-middleware-dev-target",


$ aws --endpoint-url=http://localhost:4566 \
      logs tail /aws/lambda/lambda-middleware-dev-target \
                --follow

INFO    hello event: { foo: 'bar' } context: {
```

```
aws --endpoint 'http://localhost:4566' events put-events --entries '{}'

aws events put-events \
--entries '[{"Time": "2016-01-14T01:02:03Z", "Source": "com.mycompany.myapp", "Resources": ["resource1", "resource2"], "DetailType": "myDetailType", "Detail": "{ \"key1\": \"value1\", \"key2\": \"value2\" }"}]'
```
