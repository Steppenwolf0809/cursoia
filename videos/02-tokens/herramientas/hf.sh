#!/usr/bin/env bash
# Corre la CLI de HyperFrames con el FFmpeg instalado dentro del proyecto.
cd "$(dirname "$0")/.."
export HYPERFRAMES_FFMPEG_PATH="$PWD/node_modules/ffmpeg-static/ffmpeg.exe"
export HYPERFRAMES_FFPROBE_PATH="$PWD/node_modules/ffprobe-static/bin/win32/x64/ffprobe.exe"
export HYPERFRAMES_SKIP_SKILLS=1
exec npx --yes hyperframes@0.8.78 "$@"
