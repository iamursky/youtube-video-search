#!/bin/sh

cd scripts
cp ./pawxy-test-assignment.service /etc/systemd/system/pawxy-test-assignment.service
systemctl daemon-reload
systemctl enable pawxy-test-assignment
systemctl start pawxy-test-assignment --no-block
