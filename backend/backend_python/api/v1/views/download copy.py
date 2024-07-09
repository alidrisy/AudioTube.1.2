#!/usr/bin/python3
""" API to download Video/audio """
import os
import subprocess
import typing
from urllib.parse import urlparse
from api.v1.views import app_audio
import requests
from flask import Response, jsonify
from youtube_dl import YoutubeDL

# Set the paths to the ffmpeg and youtube-dl executables
FFMPEG_PATH = os.environ.get("FFMPEG_PATH", "/usr/bin/ffmpeg")
YOUTUBE_DL_PATH = os.environ.get("YOUTUBE_DL_PATH", "/usr/bin/youtube-dl")


@app_audio.route(
    "/download/video/<video_id>/<format_id>", methods=["GET"], strict_slashes=False
)
def download_video(
    video_id: str, format_id: str
) -> typing.Union[Response, typing.Tuple[typing.Dict[str, str], int]]:
    """Function to download videos"""
    video_url = ""
    audio_url = ""

    try:
        # Parse the video ID

        with YoutubeDL({"quiet": True, "format": "best"}) as yt:
            info = yt.extract_info(video_id, download=False)
            for i in info["formats"]:
                if (
                    i["ext"] == "mp4"
                    and i["filesize"] != 0
                    and format_id == i["format_id"]
                ):
                    video_url = i["url"]
                if "audio" in i["format"] and i["ext"] == "m4a":
                    audio_url = i["url"]

        # Check if the video and audio URLs are valid
        if not video_url or not audio_url:
            return (
                jsonify(
                    {"error": "video_url and audio_url query parameters are required"}
                ),
                400,
            )

        # Download the video and audio files
        video_response = requests.get(video_url, stream=True)
        audio_response = requests.get(audio_url, stream=True)

        # Combine the video and audio files using ffmpeg
        def generate():
            with subprocess.Popen(
                [
                    "ffmpeg",
                    "-loglevel",
                    "8",
                    "-hide_banner",
                    "-i",
                    "-",
                    "-i",
                    "-",
                    "-map",
                    "0:a",
                    "-map",
                    "1:v",
                    "-b:a 128k",
                    "-c",
                    "copy",
                    "-f",
                    "matroska",
                    "-",
                ],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                bufsize=1024,
            ) as process:
                while True:
                    video_chunk = video_response.raw.read(1024)
                    audio_chunk = audio_response.raw.read(1024)
                    if not video_chunk and not audio_chunk:
                        break
                    process.stdin.write(video_chunk)
                    process.stdin.write(audio_chunk)
                    # process.stdin.flush()
                    yield process.stdout.read(1024)

        return Response(generate(), mimetype="video/mp4")

    except subprocess.CalledProcessError as e:
        error_message = f"FFmpeg command execution failed: {e.stderr.decode()}"
        return jsonify({"error": error_message}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    except subprocess.CalledProcessError as e:
        error_message = f"FFmpeg command execution failed: {e.stderr.decode()}"
        return jsonify({"error": error_message}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app_audio.route(
    "/download/audio/<audio_id>/<format>", methods=["GET"], strict_slashes=False
)
def download_audio(audio_id, format):
    """function to download audio"""
    video_url = ""
    audio_url = ""

    try:

        def generate():
            with subprocess.Popen(
                ["youtube-dl", "-f", "bestaudio", "-o", "-", audio_id],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            ) as process:
                while True:
                    chunk = process.stdout.read(1024)
                    if not chunk:
                        break
                    yield chunk

        return Response(generate(), mimetype=f"audio/{format}")

    except subprocess.CalledProcessError as e:
        error_message = f"FFmpeg command execution failed: {e.stderr.decode()}"
        return jsonify({"error": error_message}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
