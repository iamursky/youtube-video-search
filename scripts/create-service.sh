#!/bin/sh

cd scripts
cp ./youtube-video-search.service /etc/systemd/system/youtube-video-search.service
systemctl daemon-reload
systemctl enable youtube-video-search
systemctl start youtube-video-search --no-block
