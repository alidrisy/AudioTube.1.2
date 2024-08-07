#!/usr/bin/python3
""" API to download Video/audio """
from api.v1.views import app_audio
from flask import Response, jsonify
import subprocess
from youtube_dl import YoutubeDL


@app_audio.route(
    "/download/video/<video_id>/<format_id>", methods=["GET"], strict_slashes=False
)
def download_video(video_id, format_id):
    """function to download videos"""
    video_url = ""
    audio_url = ""

    try:
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
        if not video_url or not audio_url:
            return (
                jsonify(
                    {"error": "video_url and audio_url query parameters are required"}
                ),
                400,
            )

        def generate():
            with subprocess.Popen(
                [
                    "ffmpeg",
                    "-loglevel",
                    "8",
                    "-hide_banner",
                    "-i",
                    f"async:{audio_url}",
                    "-i",
                    f"async:{video_url}",
                    "-map",
                    "0:a",
                    "-map",
                    "1:v",
                    "-c",
                    "copy",
                    "-f",
                    "matroska",
                    "-",
                ],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            ) as process:
                while True:
                    print(dir(process.stdout))
                    chunk = process.stdout.read(1024)
                    if not chunk:
                        break
                    yield chunk

        return Response(generate(), mimetype="video/mp4")

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
