# notes

`docker run --rm -it -e AWS_PROFILE=rtl-use1dev -v ~/.aws:/root/.aws amazon/aws-cli sqs create-queue --queue-name=brents-test-queue`

`docker run --rm -it -e AWS_PROFILE=rtl-use1dev -v ~/.aws:/root/.aws amazon/aws-cli iam create-role --role-name lambda-ex --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}'`


- make a role that allows lambda SQS exections
  - `arn:aws:iam::034919568016:role/lambda-sqs-role`
	- attach role `AWSLambdaSQSQueueExecutionRole`

```

AWS_PROFILE=rtl-use1dev aws lambda create-function --function-name ProcessSQSRecord \
--zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x \
--role arn:aws:iam::034919568016:role/lambda-sqs-role
```

`aws lambda create-event-source-mapping --function-name ProcessSQSRecord  --batch-size 10 \
--event-source-arn `

Get queue arn
`QUEUE_ARN=$(aws sqs get-queue-attributes --queue-url=https://sqs.us-east-1.amazonaws.com/034919568016/brents-test-queue --attribute-names=QueueArn | jq -r .Attributes.QueueArn)`

# create a mapping
`aws lambda create-event-source-mapping --function-name ProcessSQSRecord  --batch-size 10 --event-source-arn=$QUEUE_ARN`

# list maps
`aws lambda list-event-source-mappings --function-name ProcessSQSRecord --event-source-arn $QUEUE_ARN`
