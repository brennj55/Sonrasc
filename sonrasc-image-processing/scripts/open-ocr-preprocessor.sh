#!/bin/sh
echo "Waiting on RabbitMQ"
sleep 30
echo "30 seconds up"
open-ocr-preprocessor $*
